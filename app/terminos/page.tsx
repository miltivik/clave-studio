import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Términos de Uso",
  description:
    "Condiciones generales de uso del sitio web de Clave Studio Digital, incluyendo alcance informativo, propiedad intelectual y contacto.",
  alternates: { canonical: `${siteConfig.url}${siteConfig.routes.terms}` },
  openGraph: {
    title: "Términos de Uso | Clave Studio Digital",
    description: "Condiciones generales de uso del sitio web de Clave Studio Digital.",
    url: `${siteConfig.url}${siteConfig.routes.terms}`,
  },
  twitter: {
    title: "Términos de Uso | Clave Studio Digital",
    description: "Condiciones generales de uso del sitio web de Clave Studio Digital.",
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-negro-clave">
      <Navbar />
      <main className="container-clave pt-32 pb-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-oro-clave">
            Legal
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.25rem)] font-light text-crema">
            Términos de uso
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-grafito">
            Al navegar este sitio aceptás estas condiciones de uso y el carácter informativo del
            contenido publicado por Clave Studio Digital.
          </p>

          <div className="mt-12 space-y-10 text-sm leading-7 text-crema/80">
            <section>
              <h2 className="mb-3 font-display text-2xl text-crema">Uso del sitio</h2>
              <p>
                El contenido de este sitio tiene fines informativos y comerciales. No garantiza
                resultados específicos sin un análisis previo del proyecto y no reemplaza una
                propuesta formal.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-2xl text-crema">Propiedad intelectual</h2>
              <p>
                Los textos, marcas, gráficos, componentes visuales y materiales publicados en
                clave.studio pertenecen a Clave Studio Digital o se utilizan con autorización. No
                pueden reutilizarse sin consentimiento previo.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-2xl text-crema">Enlaces externos</h2>
              <p>
                El sitio puede incluir enlaces a herramientas, portafolios o servicios de terceros.
                No controlamos su disponibilidad ni sus políticas de privacidad.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-2xl text-crema">Contacto</h2>
              <p>
                Para cualquier consulta legal o comercial podés escribir a{" "}
                <a
                  className="text-oro-clave transition-colors hover:text-miel"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
