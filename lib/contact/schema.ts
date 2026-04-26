import { z } from "zod"
import { validatePhoneForCountry } from "@/lib/contact/phone"

const contactServiceValues = ["web", "ecommerce", "automations", "unsure"] as const

function optionalTrimmedString(maxLength: number, tooLongMessage: string) {
  return z
    .string()
    .trim()
    .max(maxLength, tooLongMessage)
    .optional()
    .transform((value) => (value ? value : undefined))
}

const whatsappValidator = z
  .string()
  .trim()
  .max(40, "El WhatsApp es demasiado largo")
  .optional()
  .refine(validatePhoneForCountry, "El numero de WhatsApp no es valido para el pais indicado")
  .transform((value) => (value ? value : undefined))

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre").max(120, "El nombre es demasiado largo"),
  email: z
    .string()
    .trim()
    .email("Email invalido")
    .max(160, "El email es demasiado largo"),
  whatsapp: whatsappValidator,
  service: z.enum(contactServiceValues, {
    message: "Selecciona un servicio",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Cuéntanos un poco más sobre tu proyecto")
    .max(2000, "El mensaje es demasiado largo"),
  website: optionalTrimmedString(255, "Campo invalido"),
  turnstileToken: optionalTrimmedString(2048, "Captcha invalido"),
  sourcePath: z
    .string()
    .trim()
    .min(1, "No pudimos identificar la pagina actual")
    .max(200, "La pagina de origen es invalida"),
  utmSource: optionalTrimmedString(160, "utm_source es demasiado largo"),
  utmMedium: optionalTrimmedString(160, "utm_medium es demasiado largo"),
  utmCampaign: optionalTrimmedString(160, "utm_campaign es demasiado largo"),
  utmTerm: optionalTrimmedString(160, "utm_term es demasiado largo"),
  utmContent: optionalTrimmedString(160, "utm_content es demasiado largo"),
  referrer: optionalTrimmedString(500, "El referrer es demasiado largo"),
})

export interface ContactSearchParamsLike {
  get(name: string): string | null
}

export function buildContactMetadataDefaults(
  pathname: string,
  searchParams: ContactSearchParamsLike,
  referrer?: string
) {
  return {
    sourcePath: pathname || "/",
    utmSource: searchParams.get("utm_source") ?? undefined,
    utmMedium: searchParams.get("utm_medium") ?? undefined,
    utmCampaign: searchParams.get("utm_campaign") ?? undefined,
    utmTerm: searchParams.get("utm_term") ?? undefined,
    utmContent: searchParams.get("utm_content") ?? undefined,
    referrer: referrer || undefined,
    website: undefined,
    turnstileToken: "",
  }
}

export type ContactService = (typeof contactServiceValues)[number]
export type ContactFormValues = z.input<typeof contactSchema>
export type ContactFormData = z.output<typeof contactSchema>
export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string[]>>
