import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og"

export const alt = "Automatizaciones Uruguay"
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return createOgImage({
    eyebrow: "Automatizaciones Uruguay",
    title: "Menos tareas manuales, mas tiempo para crecer.",
    description: "Conectamos CRM, WhatsApp y email para que los procesos repetitivos fluyan mejor.",
  })
}
