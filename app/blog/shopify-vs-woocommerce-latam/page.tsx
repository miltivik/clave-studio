import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Shopify vs WooCommerce en LATAM 2026 | Clave Studio",
  description:
    "Comparativa completa de Shopify vs WooCommerce para vender online en LATAM: medios de pago, envíos, costos, escalabilidad y cuál elegir según tu negocio.",
  alternates: { canonical: `${siteConfig.url}/blog/shopify-vs-woocommerce-latam` },
  openGraph: {
    title: "Shopify vs WooCommerce: qué elegir en LATAM",
    description:
      "Comparativa técnica y comercial de Shopify vs WooCommerce para vender online en LATAM.",
    url: `${siteConfig.url}/blog/shopify-vs-woocommerce-latam`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Shopify vs WooCommerce LATAM" }],
  },
  twitter: {
    title: "Shopify vs WooCommerce: qué elegir en LATAM",
    description:
      "Comparativa técnica y comercial de Shopify vs WooCommerce para vender online en LATAM.",
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
                E-commerce
              </span>
              <time className="text-xs text-grafito" dateTime="2026-05-05">
                5 de mayo de 2026
              </time>
            </div>

            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light text-crema leading-tight mb-6">
              Shopify vs WooCommerce: qué elegir en LATAM
            </h1>

            <p className="text-lg text-grafito leading-relaxed mb-10">
              Si querés vender online en Uruguay o cualquier país de LATAM, esta es probablemente
              la decisión más importante que vas a tomar. Shopify y WooCommerce dominan el mercado,
              pero no son la misma herramienta. Elegir mal puede costarte tiempo, dinero y ventas.
            </p>

            <div className="prose prose-invert max-w-none">
              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                Shopify: la opción para salir rápido
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                Shopify es una plataforma todo-en-uno. Te da hosting, seguridad, actualizaciones y
                un ecosistema de apps gigante. En LATAM funciona especialmente bien si querés
                integrar Mercado Pago, Stripe o pagos locales sin tocar código.
              </p>
              <h3 className="font-display text-xl text-oro-clave font-light mt-8 mb-3">
                Ventajas de Shopify
              </h3>
              <ul className="space-y-2 text-grafito mb-6">
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✓</span>Setup en días, no semanas</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✓</span>Hosting y SSL incluidos</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✓</span>Soporte 24/7</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✓</span>Apps para casi todo (email marketing, chat, reviews)</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✓</span>Checkout optimizado y mobile-first</li>
              </ul>
              <h3 className="font-display text-xl text-oro-clave font-light mt-8 mb-3">
                Desventajas de Shopify
              </h3>
              <ul className="space-y-2 text-grafito mb-6">
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✗</span>Costo mensual fijo (USD 39 - 399/mes)</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✗</span>Comisiones por transacción si no usás Shopify Payments</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✗</span>Menos flexibilidad de diseño sin desarrollador</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✗</span>Costos de apps se acumulan rápido</li>
              </ul>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                WooCommerce: la opción para control total
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                WooCommerce es un plugin de WordPress que convierte cualquier sitio en una tienda
                online. Es open source, gratuito y te da control absoluto sobre cada aspecto de tu
                e-commerce. En Uruguay funciona bien si ya tenés un sitio en WordPress o si
                necesitás funcionalidades muy específicas.
              </p>
              <h3 className="font-display text-xl text-oro-clave font-light mt-8 mb-3">
                Ventajas de WooCommerce
              </h3>
              <ul className="space-y-2 text-grafito mb-6">
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✓</span>Gratuito (solo pagás hosting)</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✓</span>Control total del código y diseño</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✓</span>Miles de plugins gratuitos</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✓</span>Ideal para SEO avanzado</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✓</span>Sin comisiones por transacción de la plataforma</li>
              </ul>
              <h3 className="font-display text-xl text-oro-clave font-light mt-8 mb-3">
                Desventajas de WooCommerce
              </h3>
              <ul className="space-y-2 text-grafito mb-6">
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✗</span>Requiere más mantenimiento técnico</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✗</span>Seguridad y updates son responsabilidad tuya</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✗</span>Curva de aprendizaje más pronunciada</li>
                <li className="flex items-start gap-3"><span className="text-oro-clave mt-1">✗</span>Checkout menos optimizado por defecto</li>
              </ul>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                Comparativa directa para LATAM
              </h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-grafito/20">
                      <th className="pb-3 text-crema font-medium">Característica</th>
                      <th className="pb-3 text-oro-clave font-medium">Shopify</th>
                      <th className="pb-3 text-oro-clave font-medium">WooCommerce</th>
                    </tr>
                  </thead>
                  <tbody className="text-grafito">
                    <tr className="border-b border-grafito/10">
                      <td className="py-3">Costo inicial</td>
                      <td className="py-3">USD 39/mes</td>
                      <td className="py-3">Gratis (hosting aparte)</td>
                    </tr>
                    <tr className="border-b border-grafito/10">
                      <td className="py-3">Mercado Pago</td>
                      <td className="py-3">App nativa</td>
                      <td className="py-3">Plugin oficial</td>
                    </tr>
                    <tr className="border-b border-grafito/10">
                      <td className="py-3">Stripe</td>
                      <td className="py-3">Integrado</td>
                      <td className="py-3">Plugin gratuito</td>
                    </tr>
                    <tr className="border-b border-grafito/10">
                      <td className="py-3">Velocidad</td>
                      <td className="py-3">Muy buena (CDN global)</td>
                      <td className="py-3">Depende del hosting</td>
                    </tr>
                    <tr className="border-b border-grafito/10">
                      <td className="py-3">SEO</td>
                      <td className="py-3">Bueno</td>
                      <td className="py-3">Excelente</td>
                    </tr>
                    <tr className="border-b border-grafito/10">
                      <td className="py-3">Escalabilidad</td>
                      <td className="py-3">Ilimitada (plan Plus)</td>
                      <td className="py-3">Depende de la infraestructura</td>
                    </tr>
                    <tr>
                      <td className="py-3">Soporte</td>
                      <td className="py-3">24/7 oficial</td>
                      <td className="py-3">Comunidad y freelancers</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                Nuestra recomendación
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                <strong className="text-crema/80">Elegí Shopify si:</strong> querés salir rápido,
                no tenés equipo técnico interno, tu catálogo es mediano (menos de 500 productos) y
                priorizás estabilidad sobre personalización extrema.
              </p>
              <p className="text-grafito leading-relaxed mb-4">
                <strong className="text-crema/80">Elegí WooCommerce si:</strong> ya tenés un sitio
                en WordPress, necesitás control total del diseño y funcionalidades, tenés un
                presupuesto ajustado para la plataforma o contás con alguien que mantenga el sitio.
              </p>
              <p className="text-grafito leading-relaxed mb-6">
                En Clave Studio trabajamos con ambas plataformas. La elección siempre depende de tu
                operación, tu equipo y tus objetivos de crecimiento. No existe una respuesta única.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/#contacto" className="btn-primary">
                Asesoramiento gratuito →
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
