"use client"

import { FadeIn } from "@/components/ui/FadeIn"
import { SectionHeader } from "@/components/ui/SectionHeader"
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
    <section id="precios" className="bg-negro-clave section-padding min-h-screen flex flex-col justify-center">
      <div className="container-clave w-full">
        {/* Header */}
        <SectionHeader
          badge="Precios"
          title={
            <>
              Inversión clara,
              <br />
              <span className="text-oro-clave italic">sin sorpresas.</span>
            </>
          }
          className="text-center mb-20"
        />
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 max-w-[1200px] mx-auto">
          {PLANS.map((plan, i) => (
            <FadeIn
              key={plan.name}
              delay={i * 0.1}
              duration={0.5}
              disableOnMobile
              className={`@container relative rounded-2xl p-8 lg:p-10 flex flex-col ${
                plan.featured
                  ? "bg-negro-mid border-2 border-oro-clave lg:scale-105 z-10 shadow-[0_0_60px_rgba(201,137,10,0.1)]"
                  : "bg-negro-mid/60 border border-grafito/15"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-oro-clave text-negro-clave text-xs font-semibold whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name */}
              <h3 className="font-display text-2xl text-crema font-normal mb-2">{plan.name}</h3>
              <p className="text-grafito text-sm mb-6">{plan.target}</p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-grafito text-sm">Desde</span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="font-mono text-4xl font-medium text-crema">
                    ${plan.price}
                  </span>
                  <span className="text-grafito text-sm">USD</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-crema/80">
                    <svg
                      className="w-4 h-4 text-oro-clave mt-0.5 shrink-0"
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

              {/* CTA */}
              <a
                href="#contacto"
                aria-label={`Contratar plan ${plan.name} por ${plan.price} USD`}
                className={
                  plan.featured
                    ? "btn-primary w-full justify-center text-center"
                    : "btn-secondary w-full justify-center text-center"
                }
              >
                {plan.cta}
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Legal note */}
        <p className="text-center text-grafito/60 text-xs mt-10 max-w-[600px] mx-auto">
          Los precios son orientativos. Cada proyecto se presupuesta a medida después de una
          llamada de descubrimiento gratuita.
        </p>
      </div>
    </section>
  )
}
