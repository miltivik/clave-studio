import {
  createOgImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/og"

export const alt = "Servicios de Clave Studio Digital"
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return createOgImage({
    eyebrow: "Servicios",
    title: "Soluciones web, e-commerce y automatizaciones para crecer.",
    description:
      "Landing pages, tiendas online y flujos automatizados para pymes y emprendedores en LATAM.",
  })
}
