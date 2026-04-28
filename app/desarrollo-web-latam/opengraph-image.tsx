import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og"

export const alt = "Desarrollo Web LATAM"
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return createOgImage({
    eyebrow: "Desarrollo Web LATAM",
    title: "Sitios rápidos para vender mejor.",
    description: "Desarrollo web con SEO técnico y performance para pymes regionales.",
  })
}
