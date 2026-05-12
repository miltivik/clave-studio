"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SmartLink } from "@/components/ui/SmartLink"
import { useMediaQuery } from "@/hooks/useMediaQuery"

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    number: "01",
    title: ["Sitios web que", "trabajan por vos."],
    description:
      "Diseñamos y desarrollamos tu presencia digital desde cero: rápida, visible en Google y pensada para convertir visitantes en clientes.",
    features: [
      "Diseño UI/UX personalizado",
      "Desarrollo Next.js con base técnica sólida",
      "SEO técnico desde el día 1",
      "Panel de administración para que edites vos mismo",
      "3 meses de soporte incluido",
    ],
    cta: "Ver proyectos web →",
    accent: "from-oro-clave/20 to-transparent",
  },
  {
    number: "02",
    title: ["Tu tienda online,", "lista para vender."],
    description:
      "Armamos tu e-commerce con todo lo necesario para empezar a vender online: catálogo, pagos, envíos y una experiencia de compra que genera confianza.",
    features: [
      "Tienda con Shopify, WooCommerce o custom",
      "Integración de medios de pago LATAM",
      "Gestión de stock e inventario",
      "Emails automáticos de compra y seguimiento",
      "Optimización de checkout para reducir abandono",
    ],
    cta: "Quiero mi tienda online →",
    accent: "from-miel/20 to-transparent",
  },
  {
    number: "03",
    title: ["Menos tareas manuales,", "más tiempo para crecer."],
    description:
      "Conectamos tus herramientas y automatizamos los procesos repetitivos de tu negocio: desde respuestas automáticas hasta reportes y seguimiento de clientes.",
    features: [
      "Automatización de emails y seguimientos",
      "CRM y pipeline de ventas conectado a tu web",
      "Bots de WhatsApp y formularios inteligentes",
      "Reportes automáticos semanales",
      "Integración con tu stack actual sin migraciones forzadas",
    ],
    cta: "Automatizar mi negocio →",
    accent: "from-grafito/20 to-transparent",
  },
]

function ServiceContent({
  service,
  mobile,
}: {
  service: (typeof SERVICES)[number]
  mobile?: boolean
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <div>
        <span className="mb-4 block font-mono text-6xl font-medium leading-none text-oro-clave/40 lg:text-[120px]">
          {service.number}
        </span>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.1] text-crema">
          {service.title.map((line, index) => (
            <span key={index}>
              {line}
              {index < service.title.length - 1 && <br />}
            </span>
          ))}
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-lg leading-relaxed text-grafito">{service.description}</p>
        <ul className="space-y-3">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-crema/80">
              <span className="mt-1 shrink-0 text-oro-clave">-</span>
              {feature}
            </li>
          ))}
        </ul>
        <SmartLink
          sectionId="contacto"
          className={`inline-flex items-center gap-2 text-sm font-medium text-oro-clave transition-colors hover:text-miel ${
            mobile ? "mt-1 self-start" : "mt-2"
          }`}
        >
          {service.cta}
        </SmartLink>
      </div>
    </div>
  )
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!isDesktop || prefersReducedMotion || !sectionRef.current || !panelsRef.current) return

    const panels = gsap.utils.toArray<HTMLElement>(".service-panel")
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${panels.length * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (panels.length - 1))
            const dots = document.querySelectorAll(".progress-dot")

            dots.forEach((dot, dotIndex) => {
              if (dotIndex === index) {
                dot.classList.remove("h-4", "bg-grafito/30")
                dot.classList.add("h-8", "bg-oro-clave")
              } else {
                dot.classList.remove("h-8", "bg-oro-clave")
                dot.classList.add("h-4", "bg-grafito/30")
              }
            })
          },
        },
      })

      panels.forEach((panel, index) => {
        if (index === 0) return

        timeline.to(
          panels[index - 1],
          {
            yPercent: -20,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          `panel${index}`
        )

        timeline.fromTo(
          panel,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          `panel${index}`
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isDesktop])

  return (
    <section id="servicios" ref={sectionRef} className="relative overflow-hidden bg-negro-clave">
      <h2 className="sr-only">Servicios</h2>
      <div className="container-clave py-10 pb-20 lg:hidden">
        <div className="space-y-6">
          {SERVICES.map((service) => (
            <article
              key={service.number}
              className="relative overflow-hidden rounded-2xl border border-grafito/15 bg-negro-mid/60 p-6"
            >
              <ServiceContent service={service} mobile />
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t ${service.accent}`}
              />
            </article>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <div ref={panelsRef} className="relative h-screen w-full">
          {SERVICES.map((service, index) => (
            <div
              key={service.number}
              className={`service-panel absolute inset-0 flex items-center bg-negro-clave ${index > 0 ? "opacity-0" : ""}`}
              style={{ zIndex: index + 1 }}
            >
              <div className="container-clave">
                <ServiceContent service={service} />
              </div>

              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t ${service.accent}`}
              />
            </div>
          ))}
        </div>

        <div className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
          {SERVICES.map((service, index) => (
            <div
              key={service.number}
              className={`progress-dot w-1 rounded-full bg-grafito/30 transition-all duration-300 ${index === 0 ? "h-8 bg-oro-clave" : "h-4"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
