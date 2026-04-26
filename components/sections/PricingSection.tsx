import { SectionHeader } from "@/components/ui/SectionHeader"
import { SmartLink } from "@/components/ui/SmartLink"

const PLANS = [
  {
    name: "Presencia",
    target: "Para emprendedores que arrancan",
    features: [
      "Sitio web de 5 páginas",
      "SEO básico",
      "Formulario de contacto",
      "Panel de administración",
      "1 mes de soporte",
    ],
    price: "800",
    cta: "Lanzar mi web →",
    featured: false,
  },
  {
    name: "Crecimiento",
    target: "Para pymes que quieren vender online",
    features: [
      "Todo lo de Presencia",
      "E-commerce completo",
      "Integración de pagos LATAM",
      "Email automático",
      "3 meses de soporte prioritario",
    ],
    price: "2.200",
    cta: "Empezar a vender →",
    featured: true,
    badge: "Más elegido",
  },
  {
    name: "Sistema",
    target: "Para negocios que quieren automatizarse",
    features: [
      "Todo lo de Crecimiento",
      "3 automatizaciones clave",
      "CRM básico",
      "Reportes automáticos",
      "Soporte 6 meses",
    ],
    price: "3.800",
    cta: "Automatizar todo →",
    featured: false,
  },
]

export function PricingSection() {
  return (
    <section
      id="precios"
      className="section-padding flex min-h-screen flex-col justify-center bg-negro-clave"
    >
      <div className="container-clave w-full">
        <SectionHeader
          badge="Precios"
          title={
            <>
              Inversión clara,
              <br />
              <span className="italic text-oro-clave">sin sorpresas.</span>
            </>
          }
          className="mb-20 text-center"
        />

        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-8 lg:p-10 ${
                plan.featured
                  ? "z-10 border-2 border-oro-clave bg-negro-mid shadow-[0_0_60px_rgba(201,137,10,0.1)] lg:scale-105"
                  : "border border-grafito/15 bg-negro-mid/60"
              }`}
            >
              {plan.badge && (
                <div className="absolute left-1/2 top-[-12px] -translate-x-1/2">
                  <span className="whitespace-nowrap rounded-full bg-oro-clave px-4 py-1.5 text-xs font-semibold text-negro-clave">
                    {plan.badge}
                  </span>
                </div>
              )}

              <h3 className="mb-2 font-display text-2xl font-normal text-crema">{plan.name}</h3>
              <p className="mb-6 text-sm text-grafito">{plan.target}</p>

              <div className="mb-8">
                <span className="text-sm text-grafito">Desde</span>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="font-mono text-4xl font-medium text-crema">${plan.price}</span>
                  <span className="text-sm text-grafito">USD</span>
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-crema/80">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-oro-clave"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <SmartLink
                sectionId="contacto"
                ariaLabel={`Contratar plan ${plan.name} por ${plan.price} USD`}
                className={
                  plan.featured
                    ? "btn-primary w-full justify-center text-center"
                    : "btn-secondary w-full justify-center text-center"
                }
              >
                {plan.cta}
              </SmartLink>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-[600px] text-center text-xs text-grafito/60">
          Los precios son orientativos. Cada proyecto se presupuesta a medida después de una
          llamada de descubrimiento gratuita.
        </p>
      </div>
    </section>
  )
}
