import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Cuánto cuesta una página web en Uruguay en 2026 | Clave Studio",
  description:
    "Desglosamos los costos reales de desarrollar un sitio web en Uruguay en 2026: landing pages, sitios corporativos, tiendas online y presupuestos por etapa.",
  alternates: { canonical: `${siteConfig.url}/blog/cuanto-cuesta-pagina-web-uruguay-2026` },
  openGraph: {
    title: "Cuánto cuesta una página web en Uruguay en 2026",
    description:
      "Costos reales de desarrollar un sitio web en Uruguay: landing pages, corporativos y e-commerce.",
    url: `${siteConfig.url}/blog/cuanto-cuesta-pagina-web-uruguay-2026`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Costo página web Uruguay 2026" }],
  },
  twitter: {
    title: "Cuánto cuesta una página web en Uruguay en 2026",
    description:
      "Costos reales de desarrollar un sitio web en Uruguay: landing pages, corporativos y e-commerce.",
    images: ["/opengraph-image"],
  },
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-negro-clave">
      <Navbar />
      <main className="pt-[72px]">
        <article className="container-clave pt-20 pb-20">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-oro-clave/10 text-oro-clave text-xs font-medium">
                Desarrollo Web
              </span>
              <time className="text-xs text-grafito" dateTime="2026-05-05">
                5 de mayo de 2026
              </time>
            </div>

            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light text-crema leading-tight mb-6">
              Cuánto cuesta una página web en Uruguay en 2026
            </h1>

            <p className="text-lg text-grafito leading-relaxed mb-10">
              Si estás pensando en crear un sitio web para tu negocio en Uruguay, probablemente te
              hagas esta pregunta. La respuesta corta: depende de lo que necesites. La respuesta
              larga: la desglosamos en este artículo con cifras reales y transparentes.
            </p>

            <div className="prose prose-invert max-w-none">
              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                Factores que definen el costo
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                El precio de una página web en Uruguay no es arbitrario. Se define por cuatro
                variables principales: complejidad del diseño, cantidad de páginas, funcionalidades
                específicas y si incluye e-commerce o no.
              </p>
              <p className="text-grafito leading-relaxed mb-4">
                Un sitio de una sola página (landing page) no cuesta lo mismo que una tienda online
                con catálogo de 200 productos, pasarela de pagos y envíos integrados. Tampoco cuesta
                lo mismo un sitio corporativo informativo que una plataforma web con usuarios,
                dashboards y lógica de negocio personalizada.
              </p>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                Rango de precios por tipo de proyecto
              </h2>

              <h3 className="font-display text-xl text-oro-clave font-light mt-8 mb-3">
                Landing page (página única)
              </h3>
              <p className="text-grafito leading-relaxed mb-4">
                Ideal para campañas específicas, lanzamientos de producto o servicios profesionales
                que no necesitan múltiples secciones. Incluye diseño responsive, formulario de
                contacto, integración con WhatsApp y velocidad optimizada.
              </p>
              <p className="text-crema font-medium mb-2">Inversión estimada: USD 900 - 1.500</p>
              <p className="text-grafito text-sm mb-6">
                Plazo: 1 a 2 semanas.
              </p>

              <h3 className="font-display text-xl text-oro-clave font-light mt-8 mb-3">
                Sitio corporativo (3 a 8 páginas)
              </h3>
              <p className="text-grafito leading-relaxed mb-4">
                La opción más común para pymes uruguayas. Incluye inicio, servicios, nosotros,
                portfolio, contacto y páginas legales. Con SEO técnico base, blog integrado y panel
                de administración para que puedas editar contenido sin depender de nadie.
              </p>
              <p className="text-crema font-medium mb-2">Inversión estimada: USD 1.500 - 3.000</p>
              <p className="text-grafito text-sm mb-6">
                Plazo: 2 a 4 semanas.
              </p>

              <h3 className="font-display text-xl text-oro-clave font-light mt-8 mb-3">
                Tienda online (e-commerce)
              </h3>
              <p className="text-grafito leading-relaxed mb-4">
                Shopify, WooCommerce o desarrollo a medida. Incluye catálogo administrable,
                carrito de compras, checkout optimizado, integración con Mercado Pago o Stripe,
                envíos y emails transaccionales automatizados.
              </p>
              <p className="text-crema font-medium mb-2">Inversión estimada: USD 2.500 - 6.000</p>
              <p className="text-grafito text-sm mb-6">
                Plazo: 3 a 6 semanas.
              </p>

              <h3 className="font-display text-xl text-oro-clave font-light mt-8 mb-3">
                Plataforma web a medida
              </h3>
              <p className="text-grafito leading-relaxed mb-4">
                Sistemas con lógica de negocio propia: marketplaces, SaaS, plataformas de reservas,
                dashboards con roles de usuario y reportes en tiempo real. Se desarrollan con
                Next.js, bases de datos y APIs propias.
              </p>
              <p className="text-crema font-medium mb-2">Inversión estimada: USD 5.000 - 15.000+</p>
              <p className="text-grafito text-sm mb-6">
                Plazo: 1 a 3 meses.
              </p>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                Qué incluye el desarrollo web profesional
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                Cuando contratás un desarrollo web profesional en Uruguay, no estás pagando solo
                por &ldquo;una página&rdquo;. Estás pagando por:
              </p>
              <ul className="space-y-2 text-grafito mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-oro-clave mt-1">✓</span>
                  Diseño UI/UX personalizado (no templates genéricos)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-oro-clave mt-1">✓</span>
                  Desarrollo con tecnología moderna (Next.js, React, TypeScript)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-oro-clave mt-1">✓</span>
                  SEO técnico desde el inicio: metadata, velocidad, estructura
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-oro-clave mt-1">✓</span>
                  Responsive design (se ve bien en celular, tablet y desktop)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-oro-clave mt-1">✓</span>
                  Panel de administración o CMS para editar contenido
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-oro-clave mt-1">✓</span>
                  Hosting, dominio y certificado SSL configurados
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-oro-clave mt-1">✓</span>
                  Soporte post-lanzamiento para ajustes iniciales
                </li>
              </ul>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                Costos ocultos que nadie te menciona
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                Además del desarrollo inicial, tené en cuenta estos gastos recurrentes:
              </p>
              <ul className="space-y-2 text-grafito mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-oro-clave mt-1">•</span>
                  <strong className="text-crema/80">Hosting:</strong> USD 10 - 50/mes dependiendo del tráfico
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-oro-clave mt-1">•</span>
                  <strong className="text-crema/80">Dominio:</strong> USD 10 - 20/año
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-oro-clave mt-1">•</span>
                  <strong className="text-crema/80">Plugins premium:</strong> USD 0 - 100/mes (si aplica)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-oro-clave mt-1">•</span>
                  <strong className="text-crema/80">Mantenimiento:</strong> USD 100 - 300/mes (opcional pero recomendado)
                </li>
              </ul>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                ¿Por qué invertir en desarrollo web profesional?
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                Un sitio web bien hecho no es un gasto, es una inversión. Las pymes uruguayas con
                presencia digital profesional reportan hasta un 40% más de consultas comparado con
                quienes solo tienen redes sociales. Google prioriza sitios rápidos, seguros y con
                buena estructura. Un desarrollo amateur te puede costar posiciones orgánicas y
                conversiones.
              </p>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                Próximos pasos
              </h2>
              <p className="text-grafito leading-relaxed mb-6">
                Si querés una cotización personalizada para tu proyecto, podemos armar una propuesta
                cerrada sin compromiso. Analizamos tu negocio, definimos el alcance y te damos un
                precio y plazo claros.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/#contacto" className="btn-primary">
                Solicitar presupuesto →
              </Link>
              <Link href="/blog" className="btn-secondary">
                Ver más artículos
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
