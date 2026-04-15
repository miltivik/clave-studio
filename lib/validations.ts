import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Ingresá tu nombre"),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().optional(),
  service: z.enum(["web", "ecommerce", "automations", "unsure"], {
    message: "Seleccioná un servicio",
  }),
  message: z.string().min(20, "Contanos un poco más sobre tu proyecto"),
})

export type ContactFormData = z.output<typeof contactSchema>
