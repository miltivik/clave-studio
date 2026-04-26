import { NextResponse } from "next/server"
import {
  CONTACT_CAPTCHA_STATUS,
  CONTACT_ERROR_MESSAGES,
  CONTACT_NOTIFICATION_STATUS,
  CONTACT_RATE_LIMIT,
  CONTACT_SUBMISSION_STATUS,
} from "@/lib/contact/constants"
import { getContactServerConfig } from "@/lib/contact/config"
import { sendContactAutoReply, sendContactNotification } from "@/lib/contact/mail"
import { getContactRequestMetadata } from "@/lib/contact/request"
import { contactSchema, type ContactFieldErrors } from "@/lib/contact/schema"
import { hashIpAddress, verifyTurnstileToken } from "@/lib/contact/security"
import {
  countRecentLeadAttempts,
  insertContactLead,
  updateContactLeadNotification,
} from "@/lib/contact/store"

export const runtime = "nodejs"

function errorResponse(
  status: number,
  error: string,
  message: string,
  fieldErrors?: ContactFieldErrors
) {
  return NextResponse.json({ error, message, fieldErrors }, { status })
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return errorResponse(400, "validation_error", CONTACT_ERROR_MESSAGES.validation)
  }

  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return errorResponse(
      400,
      "validation_error",
      CONTACT_ERROR_MESSAGES.validation,
      parsed.error.flatten().fieldErrors as ContactFieldErrors
    )
  }

  const { config, missing } = getContactServerConfig()

  if (!config) {
    console.error("Contact form error: missing required env vars", missing)
    return errorResponse(500, "internal_error", CONTACT_ERROR_MESSAGES.configuration)
  }

  const contactConfig = config

  const requestMetadata = getContactRequestMetadata(request, parsed.data)
  const ipHash = hashIpAddress(requestMetadata.ipAddress, contactConfig.securitySalt)

  const baseLeadInput = {
    name: parsed.data.name,
    email: parsed.data.email,
    whatsapp: parsed.data.whatsapp,
    service: parsed.data.service,
    message: parsed.data.message,
    sourcePath: parsed.data.sourcePath,
    utmSource: parsed.data.utmSource,
    utmMedium: parsed.data.utmMedium,
    utmCampaign: parsed.data.utmCampaign,
    utmTerm: parsed.data.utmTerm,
    utmContent: parsed.data.utmContent,
    referrer: requestMetadata.referrer,
    userAgent: requestMetadata.userAgent,
    ipHash,
  }

  async function persistBlockedAttempt(
    blockedReason: string,
    captchaStatus: typeof CONTACT_CAPTCHA_STATUS[keyof typeof CONTACT_CAPTCHA_STATUS]
  ) {
    try {
      return await insertContactLead(contactConfig, {
        ...baseLeadInput,
        captchaStatus,
        submissionStatus: CONTACT_SUBMISSION_STATUS.blocked,
        notificationStatus: CONTACT_NOTIFICATION_STATUS.skipped,
        blockedReason,
      })
    } catch (error) {
      console.error("Contact form error: failed to persist blocked attempt", error)
      return null
    }
  }

  if (parsed.data.website) {
    const blockedLead = await persistBlockedAttempt("honeypot", CONTACT_CAPTCHA_STATUS.skipped)

    return NextResponse.json({
      success: true,
      leadId: blockedLead?.id ?? null,
      notificationStatus: CONTACT_NOTIFICATION_STATUS.skipped,
    })
  }

  if (!parsed.data.turnstileToken) {
    return errorResponse(400, "captcha_invalid", CONTACT_ERROR_MESSAGES.captcha, {
      turnstileToken: [CONTACT_ERROR_MESSAGES.captcha],
    } satisfies ContactFieldErrors)
  }

  const captchaVerification = await verifyTurnstileToken({
    token: parsed.data.turnstileToken,
    secretKey: contactConfig.turnstileSecretKey,
    ipAddress: requestMetadata.ipAddress,
  })

  if (captchaVerification.isServiceError) {
    console.error("Contact form error: captcha verification unavailable", captchaVerification.errorCodes)
    return errorResponse(500, "internal_error", CONTACT_ERROR_MESSAGES.captchaUnavailable)
  }

  if (!captchaVerification.isValid) {
    await persistBlockedAttempt("captcha_invalid", CONTACT_CAPTCHA_STATUS.failed)

    return errorResponse(403, "captcha_invalid", CONTACT_ERROR_MESSAGES.captcha, {
      turnstileToken: [CONTACT_ERROR_MESSAGES.captcha],
    } satisfies ContactFieldErrors)
  }

  try {
    const recentAttemptCount = await countRecentLeadAttempts(
      contactConfig,
      ipHash,
      new Date(Date.now() - CONTACT_RATE_LIMIT.windowMinutes * 60_000).toISOString()
    )

    if (recentAttemptCount >= CONTACT_RATE_LIMIT.maxAttempts) {
      await persistBlockedAttempt("rate_limited", CONTACT_CAPTCHA_STATUS.passed)

      return errorResponse(429, "rate_limited", CONTACT_ERROR_MESSAGES.rateLimited)
    }
  } catch (error) {
    console.error("Contact form error: failed to evaluate rate limit", error)
    return errorResponse(500, "internal_error", CONTACT_ERROR_MESSAGES.internal)
  }

  let leadRecord

  try {
    leadRecord = await insertContactLead(contactConfig, {
      ...baseLeadInput,
      captchaStatus: CONTACT_CAPTCHA_STATUS.passed,
      submissionStatus: CONTACT_SUBMISSION_STATUS.accepted,
      notificationStatus: CONTACT_NOTIFICATION_STATUS.pending,
    })
  } catch (error) {
    console.error("Contact form error: failed to persist lead", error)
    return errorResponse(500, "internal_error", CONTACT_ERROR_MESSAGES.internal)
  }

  let notificationResult: { notificationStatus: typeof CONTACT_NOTIFICATION_STATUS[keyof typeof CONTACT_NOTIFICATION_STATUS]; notificationId?: string } = {
    notificationStatus: CONTACT_NOTIFICATION_STATUS.failed,
  }

  try {
    const notification = await sendContactNotification(contactConfig, leadRecord)
    notificationResult = {
      notificationStatus: notification.notificationStatus === "sent" ? CONTACT_NOTIFICATION_STATUS.sent : CONTACT_NOTIFICATION_STATUS.failed,
      notificationId: notification.notificationId,
    }

    await updateContactLeadNotification(contactConfig, leadRecord.id, {
      notificationStatus: notificationResult.notificationStatus,
      notificationId: notificationResult.notificationId,
    })
  } catch (error) {
    console.error("Contact form error: notification failed", error)

    try {
      await updateContactLeadNotification(contactConfig, leadRecord.id, {
        notificationStatus: CONTACT_NOTIFICATION_STATUS.failed,
      })
    } catch (updateError) {
      console.error("Contact form error: failed to update notification status", updateError)
    }
  }

  // Autorespuesta al cliente: aislada, nunca debe romper la respuesta principal
  let autoReplyStatus: "sent" | "failed" | "skipped" = "skipped"
  try {
    const autoReply = await sendContactAutoReply(contactConfig, {
      name: leadRecord.name,
      email: leadRecord.email,
      service: leadRecord.service,
      message: leadRecord.message,
    })
    autoReplyStatus = autoReply.autoReplyStatus
  } catch (error) {
    console.error("Contact form error: auto-reply threw unexpectedly", error)
    autoReplyStatus = "failed"
  }

  return NextResponse.json({
    success: true,
    leadId: leadRecord.id,
    notificationStatus: notificationResult.notificationStatus,
    autoReplyStatus,
  })
}
