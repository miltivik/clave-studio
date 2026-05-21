import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Sobre Nosotros | Clave Studio Digital",
  description:
    "Conocé al equipo detrás de Clave Studio Digital. Especialistas en desarrollo web, e-commerce y automatizaciones para pymes en Uruguay y LATAM.",
  alternates: { canonical: `${siteConfig.url}/sobre-nosotros` },
  openGraph: {
    title: "Sobre Nosotros | Clave Studio Digital",
    description:
      "Equipo especializado en desarrollo web, e-commerce y automatizaciones para pymes en Uruguay y LATAM.",
    url: `${siteConfig.url}/sobre-nosotros`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sobre Clave Studio Digital",
      },
    ],
  },
  twitter: {
    title: "Sobre Nosotros | Clave Studio Digital",
    description:
      "Equipo especializado en desarrollo web, e-commerce y automatizaciones para pymes en Uruguay y LATAM.",
    images: ["/opengraph-image"],
  },
}

export default function SobreNosotrosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Sobre Nosotros | Clave Studio Digital",
    description:
      "Conocé al equipo detrás de Clave Studio Digital. Especialistas en desarrollo web, e-commerce y automatizaciones.",
    url: `${siteConfig.url}/sobre-nosotros`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo-3d.svg`,
      description: siteConfig.defaultDescription,
      areaServed: ["Uruguay", "LATAM"],
      sameAs: [siteConfig.instagramUrl, siteConfig.whatsappUrl],
    },
  }

  return (
    <div className="min-h-screen bg-negro-clave">
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding pb-20">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-oro-clave/10 border border-oro-clave/20 text-oro-clave text-sm font-body mb-6">
                El equipo
              </span>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-light tracking-tight mb-4">
                Quiénes <span className="italic text-oro-clave">somos.</span>
              </h1>
              <p className="text-grafito text-lg lg:text-xl max-w-[640px] leading-relaxed font-light">
                Un estudio digital especializado en desarrollo web, e-commerce y automatizaciones
                para pymes que necesitan crecer con una presencia online seria.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-negro-mid py-20">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-crema font-light mb-12">
                Nuestra filosofía y origen
              </h2>
              <div className="space-y-6 text-grafito leading-relaxed">
                <p>
                  Clave Studio Digital nace como una propuesta fresca y honesta en el panorama digital regional.
                  Surgimos en Uruguay con la convicción de que las pymes y profesionales merecen una presencia web construida bajo estándares rigurosos de diseño y velocidad, sin las complicaciones habituales ni rodeos innecesarios.
                </p>
                <p>
                  Como estudio de reciente creación, entendemos que la mejor forma de presentar nuestro estándar es con hechos concretos.
                  Por eso, hemos desarrollado tres demostraciones en vivo que representan el nivel de detalle y velocidad que aplicamos en cada trabajo. Creemos firmemente que la mejor carta de presentación es el trabajo visible y la transparencia absoluta.
                </p>
                <p>
                  Establecemos relaciones directas, fluidas y sin intermediarios. Nos enfocamos en entender a fondo las metas comerciales y operativas de cada proyecto antes de estructurar el código, asegurando que la tecnología sea una herramienta ágil y al servicio del crecimiento de tu negocio.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-crema py-20">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-negro-clave font-light mb-12">
                Cómo trabajamos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-xl text-negro-clave mb-2">Diagnóstico primero</h3>
                  <p className="text-negro-clave/70 leading-relaxed">
                    Antes de proponer cualquier solución, entendemos tu negocio, tu competencia y
                    el punto más importante para vender mejor.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-negro-clave mb-2">Propuesta cerrada</h3>
                  <p className="text-negro-clave/70 leading-relaxed">
                    Definimos alcance, tiempos, entregables y presupuesto por escrito. Sin letra
                    chica, sin sorpresas.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-negro-clave mb-2">Diseño con foco</h3>
                  <p className="text-negro-clave/70 leading-relaxed">
                    Cada decisión de diseño responde a un objetivo comercial. No hacemos
                    decoración, hacemos interfaces que convierten.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl text-negro-clave mb-2">Desarrollo sólido</h3>
                  <p className="text-negro-clave/70 leading-relaxed">
                    Código limpio, optimizado y estructurado bajo los estándares más modernos para asegurar máxima velocidad y posicionamiento web desde el primer día.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-negro-mid py-20">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-crema font-light mb-12">
                Nuestras especialidades
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "Diseño de Interfaces",
                  "Tiendas Online",
                  "Automatización de Procesos",
                  "Optimización para Buscadores",
                  "Integración de Sistemas",
                  "Diseño Adaptable para Celulares",
                  "Gestión de Contenidos",
                  "Asesoría Tecnológica",
                ].map((spec) => (
                  <span
                    key={spec}
                    className="px-4 py-2 rounded-full border border-oro-clave/20 text-oro-clave/80 text-sm font-mono"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-negro-clave py-20 border-y border-grafito/10">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-crema font-light mb-6">
                ¿Trabajamos juntos?
              </h2>
              <p className="text-grafito text-lg mb-8 max-w-[600px] mx-auto">
                Si tenés un proyecto en mente o querés saber cómo podemos ayudar a tu negocio,
                escribinos.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/" className="btn-primary">
                  Volver al inicio
                </Link>
                <Link href="/#contacto" className="btn-secondary">
                  Solicitar propuesta
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
