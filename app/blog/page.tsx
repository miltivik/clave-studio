import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Blog | Clave Studio Digital",
  description:
    "Artículos sobre desarrollo web, e-commerce y automatizaciones para pymes en Uruguay y LATAM.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: "Blog | Clave Studio Digital",
    description:
      "Guías y artículos sobre desarrollo web, e-commerce y automatizaciones para pymes.",
    url: `${siteConfig.url}/blog`,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Blog de Clave Studio Digital",
      },
    ],
  },
  twitter: {
    title: "Blog | Clave Studio Digital",
    description:
      "Guías y artículos sobre desarrollo web, e-commerce y automatizaciones para pymes.",
    images: ["/opengraph-image"],
  },
}

const POSTS = [
  {
    slug: "cuanto-cuesta-pagina-web-uruguay-2026",
    title: "Cuánto cuesta una página web en Uruguay en 2026",
    excerpt:
      "Desglosamos los costos reales de desarrollar un sitio web en Uruguay: desde landing pages hasta e-commerce complejos, con rangos de inversión y qué incluye cada etapa.",
    category: "Desarrollo Web",
    date: "2026-05-05",
  },
  {
    slug: "shopify-vs-woocommerce-latam",
    title: "Shopify vs WooCommerce: qué elegir en LATAM",
    excerpt:
      "Comparativa técnica y comercial de las dos plataformas de e-commerce más usadas en la región. Medios de pago, envíos, escalabilidad y costos ocultos.",
    category: "E-commerce",
    date: "2026-05-05",
  },
  {
    slug: "automatizaciones-pyme-uruguay",
    title: "5 automatizaciones que toda pyme uruguaya necesita",
    excerpt:
      "Desde respuestas automáticas en WhatsApp hasta reportes semanales sin tocar una planilla. Automatizaciones accesibles que ahorran horas de trabajo manual.",
    category: "Automatizaciones",
    date: "2026-05-05",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-negro-clave">
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding pb-20">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-oro-clave/10 border border-oro-clave/20 text-oro-clave text-sm font-body mb-6">
                Recursos
              </span>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-light tracking-tight mb-4">
                Blog <span className="italic text-oro-clave">Clave.</span>
              </h1>
              <p className="text-grafito text-lg lg:text-xl max-w-[640px] leading-relaxed font-light">
                Guías prácticas sobre desarrollo web, e-commerce y automatizaciones para pymes en
                Uruguay y LATAM.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-negro-mid py-20">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {POSTS.map((post) => (
                  <article
                    key={post.slug}
                    className="group rounded-xl border border-grafito/10 bg-negro-clave/50 p-6 lg:p-8 transition-all hover:border-oro-clave/30"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-oro-clave/10 text-oro-clave text-xs font-medium">
                        {post.category}
                      </span>
                      <time className="text-xs text-grafito" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("es-UY", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl text-crema font-light mb-3 transition-colors group-hover:text-oro-clave">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-grafito leading-relaxed mb-4">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-oro-clave transition-colors hover:text-miel"
                    >
                      Leer artículo →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
