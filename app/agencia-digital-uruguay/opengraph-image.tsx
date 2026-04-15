import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og"

export const alt = "Agencia Digital Uruguay"
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return createOgImage({
    eyebrow: "Agencia Digital Uruguay",
    title: "Tu socio digital en Uruguay.",
    description: "Creamos sitios web, tiendas online y automatizaciones para pymes uruguayas.",
  })
}
