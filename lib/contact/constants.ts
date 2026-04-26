export const CONTACT_SERVICE_LABELS = {
  web: "Sitio web",
  ecommerce: "E-commerce",
  automations: "Automatizaciones",
  unsure: "No lo tengo claro aún",
} as const

export const CONTACT_RATE_LIMIT = {
  maxAttempts: 3,
  windowMinutes: 15,
} as const

export const CONTACT_ERROR_MESSAGES = {
  validation: "Revisa los datos del formulario e intenta de nuevo.",
  captcha: "Completa el captcha antes de enviar.",
  captchaUnavailable: "No pudimos validar el captcha. Intenta de nuevo en unos minutos.",
  rateLimited:
    "Recibimos demasiados intentos desde esta conexion. Espera unos minutos e intenta de nuevo.",
  internal: "No pudimos procesar tu mensaje. Intenta de nuevo en unos minutos.",
  configuration: "La configuración del formulario no está completa.",
} as const

export const CONTACT_CAPTCHA_STATUS = {
  passed: "passed",
  failed: "failed",
  skipped: "skipped",
} as const

export const CONTACT_SUBMISSION_STATUS = {
  accepted: "accepted",
  blocked: "blocked",
} as const

export const CONTACT_NOTIFICATION_STATUS = {
  pending: "pending",
  sent: "sent",
  failed: "failed",
  skipped: "skipped",
} as const

export type ContactCaptchaStatus =
  (typeof CONTACT_CAPTCHA_STATUS)[keyof typeof CONTACT_CAPTCHA_STATUS]
export type ContactSubmissionStatus =
  (typeof CONTACT_SUBMISSION_STATUS)[keyof typeof CONTACT_SUBMISSION_STATUS]
export type ContactNotificationStatus =
  (typeof CONTACT_NOTIFICATION_STATUS)[keyof typeof CONTACT_NOTIFICATION_STATUS]
