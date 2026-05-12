import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "5 automatizaciones que toda pyme uruguaya necesita | Clave Studio",
  description:
    "Descubrí 5 automatizaciones prácticas para pymes en Uruguay: WhatsApp, CRM, email automático, reportes y seguimiento de clientes sin trabajo manual.",
  alternates: { canonical: `${siteConfig.url}/blog/automatizaciones-pyme-uruguay` },
  openGraph: {
    title: "5 automatizaciones que toda pyme uruguaya necesita",
    description:
      "Automatizaciones prácticas para pymes en Uruguay: WhatsApp, CRM, email y reportes automáticos.",
    url: `${siteConfig.url}/blog/automatizaciones-pyme-uruguay`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Automatizaciones pymes Uruguay" }],
  },
  twitter: {
    title: "5 automatizaciones que toda pyme uruguaya necesita",
    description:
      "Automatizaciones prácticas para pymes en Uruguay: WhatsApp, CRM, email y reportes automáticos.",
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
                Automatizaciones
              </span>
              <time className="text-xs text-grafito" dateTime="2026-05-05">
                5 de mayo de 2026
              </time>
            </div>

            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-light text-crema leading-tight mb-6">
              5 automatizaciones que toda pyme uruguaya necesita
            </h1>

            <p className="text-lg text-grafito leading-relaxed mb-10">
              Las pymes uruguayas pierden horas cada semana en tareas repetitivas que podrían
              estar automatizadas. No hace falta un presupuesto de empresa grande ni un equipo de
              TI. Con las herramientas correctas, cualquier negocio puede ahorrar tiempo y
              convertir más clientes.
            </p>

            <div className="prose prose-invert max-w-none">
              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                1. Respuesta automática en WhatsApp Business
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                El 80% de los clientes en Uruguay prefieren contactar por WhatsApp antes que por
                email o teléfono. Si alguien te escribe fuera de horario o con una consulta
                frecuente, una respuesta automática puede mantener la conversación viva hasta que
                podás atender personalmente.
              </p>
              <p className="text-grafito leading-relaxed mb-4">
                <strong className="text-crema/80">Qué automatizar:</strong> mensaje de bienvenida
                con horarios de atención, respuesta a consultas frecuentes (precios, dirección,
                formas de pago) y confirmación de pedidos.
              </p>
              <p className="text-grafito leading-relaxed mb-6">
                <strong className="text-crema/80">Herramientas:</strong> WhatsApp Business API,
                Wati, Treble o integraciones con Make/Zapier.
              </p>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                2. Seguimiento de leads sin tocar una planilla
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                Cuando alguien completa un formulario en tu web, ese lead debería entrar
                automáticamente a tu CRM con una etiqueta, un responsable asignado y un recordatorio
                de seguimiento. Lo que pasa en muchas pymes: el lead llega por email, se pierde en
                la bandeja de entrada y nunca se contacta.
              </p>
              <p className="text-grafito leading-relaxed mb-4">
                <strong className="text-crema/80">Qué automatizar:</strong> envío de leads desde
                formularios web a CRM, asignación automática por tipo de servicio, alertas de
                seguimiento si no hay actividad en 24 horas.
              </p>
              <p className="text-grafito leading-relaxed mb-6">
                <strong className="text-crema/80">Herramientas:</strong> HubSpot, Pipedrive,
                Make, Zapier, n8n.
              </p>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                3. Emails transaccionales y de bienvenida
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                Cada cliente nuevo debería recibir una secuencia de emails automáticos que le
                expliquen cómo trabajás, qué puede esperar y cómo contactarte. Después de una
                compra, un email de agradecimiento con recomendaciones de productos puede aumentar
                el ticket promedio en un 15-20%.
              </p>
              <p className="text-grafito leading-relaxed mb-4">
                <strong className="text-crema/80">Qué automatizar:</strong> email de bienvenida
                post-registro, confirmación de compra con datos de envío, email de recuperación de
                carrito abandonado, encuesta de satisfacción post-entrega.
              </p>
              <p className="text-grafito leading-relaxed mb-6">
                <strong className="text-crema/80">Herramientas:</strong> Klaviyo, Mailchimp,
                Brevo, HubSpot Marketing.
              </p>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                4. Reportes automáticos semanales
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                En lugar de armar reportes manuales cada lunes, configurá un flujo que una vez por
                semana recopile datos de ventas, consultas web, tráfico y estado del pipeline, y
                te los envíe por email o Slack en formato legible.
              </p>
              <p className="text-grafito leading-relaxed mb-4">
                <strong className="text-crema/80">Qué automatizar:</strong> consolidación de
                métricas de Google Analytics, CRM y tienda online; envío de resumen semanal al
                equipo; alertas si una métrica cae por debajo de un umbral.
              </p>
              <p className="text-grafito leading-relaxed mb-6">
                <strong className="text-crema/80">Herramientas:</strong> Google Looker Studio,
                Make, Zapier, n8n, Slack.
              </p>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                5. Sincronización de stock y pedidos
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                Si vendés por múltiples canales (web, Mercado Libre, tienda física), mantener el
                stock actualizado manualmente es una receta para errores. Un cliente puede comprar
                un producto que en realidad no tenés, generando devoluciones y mala experiencia.
              </p>
              <p className="text-grafito leading-relaxed mb-4">
                <strong className="text-crema/80">Qué automatizar:</strong> sincronización de
                stock entre plataformas, actualización automática de precios, notificación de
                reorden cuando el stock baja de un mínimo.
              </p>
              <p className="text-grafito leading-relaxed mb-6">
                <strong className="text-crema/80">Herramientas:</strong> StockSync, Multi-Store
                Sync (Shopify), integraciones custom con APIs.
              </p>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                Cuánto cuesta automatizar una pyme en Uruguay
              </h2>
              <p className="text-grafito leading-relaxed mb-4">
                No hace falta automatizar todo de una. Lo más efectivo es empezar por el flujo que
                más tiempo te roba hoy. Una automatización puntual puede costar entre USD 300 y
                800. Un sistema completo que integre CRM, WhatsApp, email y reportes puede ir de
                USD 1.500 a 3.000 según la complejidad.
              </p>
              <p className="text-grafito leading-relaxed mb-4">
                El retorno de inversión suele ser rápido: si una automatización te ahorra 5 horas
                semanales de trabajo manual, en 3 meses ya se pagó sola.
              </p>

              <h2 className="font-display text-2xl text-crema font-light mt-12 mb-4">
                Por dónde empezar
              </h2>
              <p className="text-grafito leading-relaxed mb-6">
                Nuestra recomendación: hacé una lista de las 5 tareas repetitivas que más tiempo te
                consumen esta semana. Probablemente al menos 3 de ellas se pueden automatizar con
                herramientas existentes. Empezá por una, medí el resultado, y después sumá la
                siguiente.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link href="/#contacto" className="btn-primary">
                Quiero automatizar mi negocio →
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
