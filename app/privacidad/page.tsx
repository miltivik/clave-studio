import type { Metadata } from "next"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Politica de Privacidad",
  description:
    "Conoce como Clave Studio Digital recopila, usa y protege la informacion compartida a traves de su sitio web y formularios de contacto.",
  alternates: { canonical: `${siteConfig.url}${siteConfig.routes.privacy}` },
  openGraph: {
    title: "Politica de Privacidad | Clave Studio Digital",
    description:
      "Informacion sobre el tratamiento de datos personales y consultas enviadas a Clave Studio Digital.",
    url: `${siteConfig.url}${siteConfig.routes.privacy}`,
  },
  twitter: {
    title: "Politica de Privacidad | Clave Studio Digital",
    description:
      "Informacion sobre el tratamiento de datos personales y consultas enviadas a Clave Studio Digital.",
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-negro-clave">
      <Navbar />
      <main className="container-clave pt-32 pb-20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-oro-clave">
            Legal
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.25rem)] font-light text-crema">
            Politica de privacidad
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-grafito">
            Esta politica describe como recopilamos, usamos y protegemos la
            informacion compartida a traves de clave.studio.
          </p>

          <div className="mt-12 space-y-10 text-sm leading-7 text-crema/80">
            <section>
              <h2 className="mb-3 font-display text-2xl text-crema">
                Datos que recopilamos
              </h2>
              <p>
                Podemos recopilar nombre, email, telefono o WhatsApp, tipo de
                servicio solicitado y cualquier informacion incluida en el
                formulario de contacto.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-2xl text-crema">
                Como usamos la informacion
              </h2>
              <p>
                Utilizamos estos datos para responder consultas, preparar
                propuestas comerciales, mejorar el servicio y dar seguimiento a
                solicitudes relacionadas con desarrollo web, e-commerce y
                automatizaciones.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-2xl text-crema">
                Conservacion y seguridad
              </h2>
              <p>
                Aplicamos medidas razonables de seguridad para proteger la
                informacion compartida. Conservamos los datos durante el tiempo
                necesario para responder consultas o cumplir obligaciones
                operativas y legales.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-2xl text-crema">
                Contacto
              </h2>
              <p>
                Si quieres solicitar acceso, correccion o eliminacion de tus
                datos, puedes escribir a{" "}
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
