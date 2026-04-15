import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og"

export const alt = "E-commerce Uruguay"
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return createOgImage({
    eyebrow: "E-commerce Uruguay",
    title: "Tu tienda online, lista para vender.",
    description: "Armamos tu e-commerce con catalogo, pagos, envios y un checkout orientado a conversion.",
  })
}
