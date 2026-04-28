import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og"

export const alt = "Automatizaciones LATAM"
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return createOgImage({
    eyebrow: "Automatizaciones LATAM",
    title: "CRM, WhatsApp y procesos comerciales.",
    description: "Automatizaciones para equipos que venden en LATAM.",
  })
}
