import { Resend } from "resend"
import { createElement } from "react"
import { ContactLeadAutoReply } from "@/emails/ContactLeadAutoReply"
import { ContactLeadNotification } from "@/emails/ContactLeadNotification"
import { CONTACT_SERVICE_LABELS } from "@/lib/contact/constants"
import type { ContactServerConfig } from "@/lib/contact/config"
import type { ContactLeadRecord } from "@/lib/contact/store"

export interface ContactNotificationResult {
  notificationStatus: "sent" | "failed"
  notificationId?: string
}

export interface ContactAutoReplyResult {
  autoReplyStatus: "sent" | "failed" | "skipped"
  autoReplyId?: string
}

function optionalTextRow(label: string, value?: string) {
  if (!value) return ""
  return `${label}: ${value}`
}

function buildContactEmailText(lead: ContactLeadRecord) {
  return [
    "Nueva consulta desde clavestudio.dev",
    "",
    `Nombre: ${lead.name}`,
    `Email: ${lead.email}`,
    optionalTextRow("WhatsApp", lead.whatsapp),
    `Servicio: ${CONTACT_SERVICE_LABELS[lead.service]}`,
    "",
    "Mensaje:",
    lead.message,
    "",
    `Lead ID: ${lead.id}`,
    `Pagina: ${lead.sourcePath}`,
    optionalTextRow("Referrer", lead.referrer),
    optionalTextRow("utm_source", lead.utmSource),
    optionalTextRow("utm_medium", lead.utmMedium),
    optionalTextRow("utm_campaign", lead.utmCampaign),
    optionalTextRow("utm_term", lead.utmTerm),
    optionalTextRow("utm_content", lead.utmContent),
  ]
    .filter(Boolean)
    .join("\n")
}

export async function sendContactNotification(
  config: ContactServerConfig,
  lead: ContactLeadRecord
): Promise<ContactNotificationResult> {
  if (!config.resendApiKey) {
    return { notificationStatus: "failed" }
  }

  const resend = new Resend(config.resendApiKey)
  const { data, error } = await resend.emails.send({
    from: `${config.emailFromName} <${config.emailFrom}>`,
    to: [config.emailTo],
    subject: `Nueva consulta de ${lead.name} - ${CONTACT_SERVICE_LABELS[lead.service]}`,
    replyTo: lead.email,
    react: createElement(ContactLeadNotification, { lead }),
    text: buildContactEmailText(lead),
  })

  if (error) throw new Error(error.message)

  return {
    notificationStatus: "sent",
    notificationId: data?.id,
  }
}

export async function sendContactAutoReply(
  config: ContactServerConfig,
  lead: Pick<ContactLeadRecord, "name" | "email" | "service" | "message">
): Promise<ContactAutoReplyResult> {
  if (!config.resendApiKey) {
    return { autoReplyStatus: "skipped" }
  }

  const resend = new Resend(config.resendApiKey)
  const { data, error } = await resend.emails.send({
    from: `${config.emailFromName} <${config.emailFrom}>`,
    to: [lead.email],
    subject: `Recibimos tu consulta — ${CONTACT_SERVICE_LABELS[lead.service]}`,
    react: createElement(ContactLeadAutoReply, { lead }),
    text: [
      `Hola ${lead.name.split(" ")[0]},`,
      "",
      "Recibimos tu consulta y te respondemos en menos de 24 horas.",
      "",
      `Servicio: ${CONTACT_SERVICE_LABELS[lead.service]}`,
      "",
      "Mensaje:",
      lead.message,
      "",
      "Clave Studio",
      "hola@clavestudio.dev",
      "WhatsApp: +598 92 395 129",
    ].join("\n"),
  })

  if (error) {
    console.error("Contact form error: auto-reply failed", error)
    return { autoReplyStatus: "failed" }
  }

  return {
    autoReplyStatus: "sent",
    autoReplyId: data?.id,
  }
}
