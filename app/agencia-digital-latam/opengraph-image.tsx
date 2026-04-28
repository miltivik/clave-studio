import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og"

export const alt = "Agencia Digital LATAM"
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return createOgImage({
    eyebrow: "Agencia Digital LATAM",
    title: "Desarrollo web, e-commerce y automatizaciones.",
    description: "Presencia digital para pymes que venden en la región.",
  })
}
