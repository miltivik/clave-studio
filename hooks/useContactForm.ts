"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch, type Path } from "react-hook-form"
import { CONTACT_ERROR_MESSAGES } from "@/lib/contact/constants"
import { getContactClientConfig } from "@/lib/contact/config"
import {
  buildContactMetadataDefaults,
  contactSchema,
  type ContactFieldErrors,
  type ContactFormData,
  type ContactFormValues,
} from "@/lib/contact/schema"
import { useHasMounted } from "@/hooks/useHasMounted"

type ContactSubmissionStatus = "idle" | "submitting" | "success" | "error"

interface ContactSubmissionState {
  status: ContactSubmissionStatus
  message?: string
  notificationStatus?: "sent" | "failed" | "skipped"
}

interface ContactApiSuccessResponse {
  success: true
  leadId: string | null
  notificationStatus: "sent" | "failed" | "skipped"
  autoReplyStatus?: "sent" | "failed" | "skipped"
}

interface ContactApiErrorResponse {
  error: string
  message?: string
  fieldErrors?: ContactFieldErrors
}

function getMetadataDefaults(
  pathname: string,
  searchParams: { get(name: string): string | null }
) {
  return buildContactMetadataDefaults(
    pathname || "/",
    searchParams,
    typeof document === "undefined" ? undefined : document.referrer || undefined
  )
}

function getInitialFormValues(pathname: string, searchParams: { get(name: string): string | null }) {
  return {
    ...getMetadataDefaults(pathname, searchParams),
    name: "",
    email: "",
    whatsapp: undefined,
    service: undefined,
    message: "",
  }
}

export function useContactForm() {
  const hasMounted = useHasMounted()
  const pathname = hasMounted ? window.location.pathname || "/" : "/"
  const searchString = hasMounted ? window.location.search || "" : ""
  const [submissionState, setSubmissionState] = useState<ContactSubmissionState>({
    status: "idle",
  })
  const [turnstileRenderKey, setTurnstileRenderKey] = useState(0)
  const { turnstileSiteKey } = getContactClientConfig()

  const form = useForm<ContactFormValues, undefined, ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: getInitialFormValues(pathname, new URLSearchParams(searchString)),
    shouldFocusError: true,
  })

  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
  } = form
  const turnstileToken = useWatch({
    control,
    name: "turnstileToken",
  })

  useEffect(() => {
    const defaults = getMetadataDefaults(pathname, new URLSearchParams(searchString))

    setValue("sourcePath", defaults.sourcePath, { shouldDirty: false })
    setValue("utmSource", defaults.utmSource, { shouldDirty: false })
    setValue("utmMedium", defaults.utmMedium, { shouldDirty: false })
    setValue("utmCampaign", defaults.utmCampaign, { shouldDirty: false })
    setValue("utmTerm", defaults.utmTerm, { shouldDirty: false })
    setValue("utmContent", defaults.utmContent, { shouldDirty: false })
    setValue("referrer", defaults.referrer, { shouldDirty: false })
  }, [pathname, searchString, setValue])

  function resetTurnstile() {
    setValue("turnstileToken", "", { shouldDirty: false, shouldValidate: true })
    setTurnstileRenderKey((currentValue) => currentValue + 1)
  }

  function applyServerFieldErrors(fieldErrors?: ContactFieldErrors) {
    if (!fieldErrors) return

    for (const [fieldName, messages] of Object.entries(fieldErrors)) {
      if (!messages || messages.length === 0) continue

      setError(fieldName as Path<ContactFormValues>, {
        type: "server",
        message: messages[0],
      })
    }
  }

  const submitContactForm = handleSubmit(async (data) => {
    clearErrors()

    if (!turnstileSiteKey) {
      setError("turnstileToken", {
        type: "manual",
        message: CONTACT_ERROR_MESSAGES.captchaUnavailable,
      })
      setSubmissionState({
        status: "error",
        message: CONTACT_ERROR_MESSAGES.captchaUnavailable,
      })
      return
    }

    if (!data.turnstileToken) {
      setError("turnstileToken", {
        type: "manual",
        message: CONTACT_ERROR_MESSAGES.captcha,
      })
      setSubmissionState({
        status: "error",
        message: CONTACT_ERROR_MESSAGES.captcha,
      })
      return
    }

    setSubmissionState({ status: "submitting" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const payload = (await response.json().catch(() => null)) as
        | ContactApiSuccessResponse
        | ContactApiErrorResponse
        | null

      if (response.ok && payload && "success" in payload && payload.success) {
        setSubmissionState({
          status: "success",
          notificationStatus: payload.notificationStatus,
        })

        reset(getInitialFormValues(pathname, new URLSearchParams(searchString)))
        resetTurnstile()
        return
      }

      const errorPayload = payload && "error" in payload ? payload : null

      if (errorPayload?.fieldErrors) applyServerFieldErrors(errorPayload.fieldErrors)

      if (response.status === 429) {
        setSubmissionState({
          status: "error",
          message: CONTACT_ERROR_MESSAGES.rateLimited,
        })
        resetTurnstile()
        return
      }

      if (errorPayload?.error === "captcha_invalid") {
        setSubmissionState({
          status: "error",
          message: errorPayload.message || CONTACT_ERROR_MESSAGES.captcha,
        })
        resetTurnstile()
        return
      }

      if (errorPayload?.error === "captcha_unavailable") {
        setSubmissionState({
          status: "error",
          message: errorPayload.message || CONTACT_ERROR_MESSAGES.captchaUnavailable,
        })
        resetTurnstile()
        return
      }

      if (errorPayload?.fieldErrors?.turnstileToken) resetTurnstile()

      setSubmissionState({
        status: "error",
        message: errorPayload?.message || CONTACT_ERROR_MESSAGES.internal,
      })
    } catch {
      resetTurnstile()
      setSubmissionState({
        status: "error",
        message: CONTACT_ERROR_MESSAGES.internal,
      })
    }
  })

  function handleTurnstileVerify(token: string) {
    setValue("turnstileToken", token, { shouldDirty: true, shouldValidate: true })
    clearErrors("turnstileToken")
  }

  function handleTurnstileExpire() {
    setValue("turnstileToken", "", { shouldDirty: false, shouldValidate: true })
  }

  function handleTurnstileError() {
    setError("turnstileToken", {
      type: "manual",
      message: CONTACT_ERROR_MESSAGES.captchaUnavailable,
    })
    handleTurnstileExpire()
  }

  return {
    errors,
    formMessage: submissionState.status === "error" ? submissionState.message : undefined,
    isSubmitDisabled: submissionState.status === "submitting",
    register,
    status: submissionState.status,
    submitContactForm,
    turnstileRenderKey,
    turnstileSiteKey,
    turnstileToken,
    handleTurnstileError,
    handleTurnstileExpire,
    handleTurnstileVerify,
  }
}
