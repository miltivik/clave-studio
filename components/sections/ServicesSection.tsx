"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    number: "01",
    title: ["Sitios web que", "trabajan por vos."],
    description:
      "Diseñamos y desarrollamos tu presencia digital desde cero: rápida, visible en Google y pensada para convertir visitantes en clientes.",
    features: [
      "Diseño UI/UX personalizado",
      "Desarrollo Next.js (carga en menos de 2 segundos)",
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
      "Integración de medios de pago LATAM (Mercado Pago, PayU, Stripe)",
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
      "Automatización de emails y seguimientos (Make, Zapier, n8n)",
      "CRM y pipeline de ventas conectado a tu web",
      "Bots de WhatsApp y formularios inteligentes",
      "Reportes automáticos semanales",
      "Integración con tu stack actual (sin migración)",
    ],
    cta: "Automatizar mi negocio →",
    accent: "from-grafito/20 to-transparent",
  },
]

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || !sectionRef.current || !panelsRef.current) return

    const panels = gsap.utils.toArray<HTMLElement>(".service-panel")
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
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
            dots.forEach((dot, i) => {
              if (i === index) {
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

      panels.forEach((panel, i) => {
        if (i === 0) return

        tl.to(
          panels[i - 1],
          {
            yPercent: -20,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          `panel${i}`
        )

        tl.fromTo(
          panel,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          `panel${i}`
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="servicios" ref={sectionRef} className="relative bg-negro-clave min-h-screen overflow-hidden">
      <div ref={panelsRef} className="relative w-full h-screen">
        {SERVICES.map((service, i) => (
          <div
            key={service.number}
            className={`service-panel absolute inset-0 flex items-center bg-negro-clave ${i > 0 ? "opacity-0" : ""}`}
            style={{ zIndex: i + 1 }}
          >
            <div className="container-clave grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Number + Title */}
              <div>
                <span className="font-mono text-oro-clave/40 text-7xl lg:text-[120px] font-medium leading-none block mb-4">
                  {service.number}
                </span>
                <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] font-light text-crema">
                  {service.title.map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < service.title.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
              </div>

              {/* Right: Description + Features */}
              <div className="flex flex-col gap-6">
                <p className="text-grafito text-lg leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-crema/80 text-sm">
                      <span className="text-oro-clave mt-1 shrink-0">·</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 text-oro-clave font-medium text-sm hover:text-miel transition-colors mt-2 group"
                >
                  {service.cta}
                </a>
              </div>
            </div>

            {/* Background gradient */}
            <div className={`absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t ${service.accent} pointer-events-none`} />
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 hidden lg:flex">
        {SERVICES.map((s, i) => (
          <div
            key={s.number}
            className={`progress-dot w-1 rounded-full bg-grafito/30 transition-all duration-300 ${i === 0 ? "h-8 bg-oro-clave" : "h-4"}`}
          />
        ))}
      </div>
    </section>
  )
}
