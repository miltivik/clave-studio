import { createOgImage, ogImageContentType, ogImageSize } from "@/lib/og"

export const alt = "Desarrollo Web Uruguay"
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return createOgImage({
    eyebrow: "Desarrollo Web Uruguay",
    title: "Sitios web que trabajan por vos.",
    description: "Diseñamos y desarrollamos tu presencia digital en Uruguay: rápida y visible en Google.",
  })
}
