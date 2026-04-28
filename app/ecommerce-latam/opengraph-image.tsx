import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og"

export const alt = "E-commerce LATAM"
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return createOgImage({
    eyebrow: "E-commerce LATAM",
    title: "Tiendas online para vender en la región.",
    description: "Catálogo, pagos, envíos y automatizaciones para crecer online.",
  })
}
