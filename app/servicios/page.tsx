import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SmartLink } from "@/components/ui/SmartLink"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Servicios Digitales para LATAM y Uruguay",
  description:
    "Servicios de desarrollo web, e-commerce y automatizaciones para pymes en LATAM, con páginas específicas para Uruguay.",
  alternates: { canonical: `${siteConfig.url}${siteConfig.routes.services}` },
  openGraph: {
    title: "Servicios Digitales para LATAM y Uruguay",
    description:
      "Landing pages, tiendas online y automatizaciones para negocios que necesitan crecer con una presencia digital seria en la región.",
    url: `${siteConfig.url}${siteConfig.routes.services}`,
    images: [
      {
        url: "/servicios/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Servicios de Clave Studio Digital",
      },
    ],
  },
  twitter: {
    title: "Servicios Digitales para LATAM y Uruguay",
    description:
      "Landing pages, tiendas online y automatizaciones para negocios que necesitan crecer con una presencia digital seria en la región.",
    images: ["/servicios/opengraph-image"],
  },
}

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-negro-clave">
      <Navbar />
      <main className="pt-[72px]">
        <div className="py-20 text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light text-crema">
            Nuestros <span className="italic text-oro-clave">Servicios</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-grafito">
            Soluciones digitales para negocios que necesitan vender mejor, verse bien y operar con
            más claridad.
          </p>
        </div>

        <section className="bg-negro-mid py-16">
          <div className="container-clave">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-light text-crema">
                  Páginas de servicio para LATAM y Uruguay
                </h2>
                <p className="text-grafito">
                  Entrá al servicio que mejor coincide con tu necesidad para ver el detalle
                  completo por mercado.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="mb-4 font-display text-2xl text-crema">
                  LATAM
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Link
                    href="/agencia-digital-latam"
                    className="group rounded-xl border border-grafito/10 bg-negro-clave/50 p-6 text-center transition-all hover:border-oro-clave/30"
                  >
                    <h4 className="mb-2 font-display text-xl text-crema transition-colors group-hover:text-oro-clave">
                      Agencia Digital LATAM
                    </h4>
                    <p className="text-sm text-grafito">Hub regional</p>
                  </Link>
                  <Link
                    href="/desarrollo-web-latam"
                    className="group rounded-xl border border-grafito/10 bg-negro-clave/50 p-6 text-center transition-all hover:border-oro-clave/30"
                  >
                    <h4 className="mb-2 font-display text-xl text-crema transition-colors group-hover:text-oro-clave">
                      Desarrollo Web LATAM
                    </h4>
                    <p className="text-sm text-grafito">Sitios y landing pages</p>
                  </Link>
                  <Link
                    href="/ecommerce-latam"
                    className="group rounded-xl border border-grafito/10 bg-negro-clave/50 p-6 text-center transition-all hover:border-oro-clave/30"
                  >
                    <h4 className="mb-2 font-display text-xl text-crema transition-colors group-hover:text-oro-clave">
                      E-commerce LATAM
                    </h4>
                    <p className="text-sm text-grafito">Tiendas online</p>
                  </Link>
                  <Link
                    href="/automatizaciones-latam"
                    className="group rounded-xl border border-grafito/10 bg-negro-clave/50 p-6 text-center transition-all hover:border-oro-clave/30"
                  >
                    <h4 className="mb-2 font-display text-xl text-crema transition-colors group-hover:text-oro-clave">
                      Automatizaciones LATAM
                    </h4>
                    <p className="text-sm text-grafito">CRM, WhatsApp y más</p>
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-display text-2xl text-crema">
                  Uruguay
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link
                  href="/agencia-digital-uruguay"
                  className="group rounded-xl border border-grafito/10 bg-negro-clave/50 p-6 text-center transition-all hover:border-oro-clave/30"
                >
                  <h4 className="mb-2 font-display text-xl text-crema transition-colors group-hover:text-oro-clave">
                    Agencia Digital Uruguay
                  </h4>
                  <p className="text-sm text-grafito">Hub principal</p>
                </Link>
                <Link
                  href="/desarrollo-web-uruguay"
                  className="group rounded-xl border border-grafito/10 bg-negro-clave/50 p-6 text-center transition-all hover:border-oro-clave/30"
                >
                  <h4 className="mb-2 font-display text-xl text-crema transition-colors group-hover:text-oro-clave">
                    Desarrollo Web Uruguay
                  </h4>
                  <p className="text-sm text-grafito">Sitios y landing pages</p>
                </Link>
                <Link
                  href="/ecommerce-uruguay"
                  className="group rounded-xl border border-grafito/10 bg-negro-clave/50 p-6 text-center transition-all hover:border-oro-clave/30"
                >
                  <h4 className="mb-2 font-display text-xl text-crema transition-colors group-hover:text-oro-clave">
                    E-commerce Uruguay
                  </h4>
                  <p className="text-sm text-grafito">Tiendas online</p>
                </Link>
                <Link
                  href="/automatizaciones-uruguay"
                  className="group rounded-xl border border-grafito/10 bg-negro-clave/50 p-6 text-center transition-all hover:border-oro-clave/30"
                >
                  <h4 className="mb-2 font-display text-xl text-crema transition-colors group-hover:text-oro-clave">
                    Automatizaciones Uruguay
                  </h4>
                  <p className="text-sm text-grafito">CRM, WhatsApp y más</p>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-clave">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-6 font-display text-[clamp(1.5rem,3vw,2rem)] font-light text-crema">
                ¿Necesitás algo más específico?
              </h2>
              <p className="mb-8 text-grafito">
                Si no encontrás el camino exacto, escribinos y definimos juntos la mejor solución.
              </p>
              <SmartLink sectionId="contacto" className="btn-primary">
                Hablemos
              </SmartLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
