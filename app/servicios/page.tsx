import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Servicios de Desarrollo Web, E-commerce y Automatizaciones",
  description:
    "Descubre nuestros servicios de desarrollo web, e-commerce y automatizaciones para pymes en Uruguay y equipos de la region.",
  alternates: { canonical: `${siteConfig.url}${siteConfig.routes.services}` },
  openGraph: {
    title: "Servicios de Desarrollo Web, E-commerce y Automatizaciones",
    description:
      "Landing pages, tiendas online y automatizaciones para negocios que necesitan crecer con una presencia digital seria.",
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
    title: "Servicios de Desarrollo Web, E-commerce y Automatizaciones",
    description:
      "Landing pages, tiendas online y automatizaciones para negocios que necesitan crecer con una presencia digital seria.",
    images: ["/servicios/opengraph-image"],
  },
}

export default function ServiciosPage() {
  return (
    <div className="bg-negro-clave min-h-screen">
      <Navbar />
      <main className="pt-[72px]">
        <div className="py-20 text-center">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] text-crema font-light">
            Nuestros <span className="text-oro-clave italic">Servicios</span>
          </h1>
          <p className="text-grafito text-lg max-w-2xl mx-auto mt-6">
            Soluciones digitales para negocios que necesitan vender mejor, verse bien y operar con mas claridad.
          </p>
        </div>

        <section className="bg-negro-mid py-16">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-crema font-light mb-4">
                  Paginas de servicio para Uruguay
                </h2>
                <p className="text-grafito">
                  Entra al servicio que mejor coincide con tu necesidad para ver el detalle completo.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/agencia-digital-uruguay"
                  className="group bg-negro-clave/50 border border-grafito/10 rounded-xl p-6 hover:border-oro-clave/30 transition-all text-center"
                >
                  <h3 className="font-display text-xl text-crema mb-2 group-hover:text-oro-clave transition-colors">
                    Agencia Digital Uruguay
                  </h3>
                  <p className="text-grafito text-sm">Hub principal</p>
                </Link>
                <Link
                  href="/desarrollo-web-uruguay"
                  className="group bg-negro-clave/50 border border-grafito/10 rounded-xl p-6 hover:border-oro-clave/30 transition-all text-center"
                >
                  <h3 className="font-display text-xl text-crema mb-2 group-hover:text-oro-clave transition-colors">
                    Desarrollo Web Uruguay
                  </h3>
                  <p className="text-grafito text-sm">Sitios y landing pages</p>
                </Link>
                <Link
                  href="/ecommerce-uruguay"
                  className="group bg-negro-clave/50 border border-grafito/10 rounded-xl p-6 hover:border-oro-clave/30 transition-all text-center"
                >
                  <h3 className="font-display text-xl text-crema mb-2 group-hover:text-oro-clave transition-colors">
                    E-commerce Uruguay
                  </h3>
                  <p className="text-grafito text-sm">Tiendas online</p>
                </Link>
                <Link
                  href="/automatizaciones-uruguay"
                  className="group bg-negro-clave/50 border border-grafito/10 rounded-xl p-6 hover:border-oro-clave/30 transition-all text-center"
                >
                  <h3 className="font-display text-xl text-crema mb-2 group-hover:text-oro-clave transition-colors">
                    Automatizaciones Uruguay
                  </h3>
                  <p className="text-grafito text-sm">CRM, WhatsApp y mas</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] text-crema font-light mb-6">
                Necesitas algo mas especifico?
              </h2>
              <p className="text-grafito mb-8">
                Si no encuentras el camino exacto, escribinos y definimos juntos la mejor solucion.
              </p>
              <Link href="/#contacto" className="btn-primary">
                Hablemos
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
