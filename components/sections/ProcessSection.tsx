"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: "01",
    title: "Descubrimiento",
    days: "Día 1-2",
    description:
      "Nos reunimos para entender tu negocio, tus clientes y tus objetivos. Sin tecnicismos, sin formularios infinitos.",
  },
  {
    number: "02",
    title: "Propuesta",
    days: "Día 3-5",
    description:
      "Te presentamos el plan completo: diseño, funcionalidades, plazos y precio. Todo claro, sin letra chica.",
  },
  {
    number: "03",
    title: "Construcción",
    days: "Día 6-18",
    description:
      "Desarrollamos tu proyecto con actualizaciones cada 3 días. Vos aprobás cada etapa antes de avanzar.",
  },
  {
    number: "04",
    title: "Lanzamiento",
    days: "Día 18-21",
    description:
      "Publicamos, verificamos que todo funcione perfecto y te capacitamos para manejarlo vos mismo.",
  },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate the connecting line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "center center",
              scrub: 1,
            },
          }
        )
      }

      // Stagger the step nodes
      const nodes = gsap.utils.toArray<HTMLElement>(".process-step")
      nodes.forEach((node, i) => {
        gsap.from(node, {
          opacity: 0,
          y: 40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `${20 + i * 12}% 80%`,
            end: `${30 + i * 12}% 60%`,
            scrub: 1,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="proceso" ref={sectionRef} className="bg-crema section-padding overflow-hidden">
      <div className="container-clave">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <span className="text-oro-clave font-body text-sm font-medium tracking-widest uppercase mb-4 block">
            Proceso
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-negro-clave font-light leading-tight">
            De la idea al lanzamiento
            <br />
            <span className="text-oro-clave italic">en 21 días.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-px bg-oro-clave/30 origin-left"
          />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="process-step relative">
                {/* Node dot (desktop) */}
                <div className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-oro-clave/10 border-2 border-oro-clave mb-6 mx-auto">
                  <div className="w-2 h-2 rounded-full bg-oro-clave" />
                </div>

                {/* Card */}
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-negro-clave/5 hover:border-oro-clave/20 transition-colors">
                  <div className="flex items-center gap-3 mb-4 lg:justify-center">
                    <span className="font-mono text-oro-clave text-xs font-medium">
                      {step.number}
                    </span>
                    <span className="text-grafito text-xs bg-negro-clave/5 px-2.5 py-1 rounded-full">
                      {step.days}
                    </span>
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl text-negro-clave font-normal mb-3 lg:text-center">
                    {step.title}
                  </h3>
                  <p className="text-grafito text-sm leading-relaxed lg:text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
