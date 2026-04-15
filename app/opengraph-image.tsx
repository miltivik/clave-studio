import {
  createOgImage,
  ogImageContentType,
  ogImageSize,
} from "@/lib/og"

export const alt = "Clave Studio Digital - Desarrollo Web y E-commerce para Pymes"
export const size = ogImageSize
export const contentType = ogImageContentType

export default function OpenGraphImage() {
  return createOgImage({
    eyebrow: "Agencia digital para pymes",
    title: "Web, e-commerce y automatizaciones que convierten.",
    description:
      "Desarrollo web premium para negocios de LATAM que necesitan verse mejor, vender mas y crecer con una base tecnica solida.",
  })
}
