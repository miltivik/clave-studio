"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/FadeIn"
import { SectionHeader } from "@/components/ui/SectionHeader"
import {
  BarChart,
  CreditCard,
  Database,
  FileText,
  Mail,
  Megaphone,
  MessageCircle,
  Send,
  ShoppingBag,
  Users,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

gsap.registerPlugin(ScrollTrigger)

const INTEGRATIONS = [
  { name: "Mercado Pago & Stripe", icon: CreditCard },
  { name: "WhatsApp Business", icon: MessageCircle },
  { name: "Gmail & Outlook", icon: Mail },
  { name: "Google Sheets & Notion", icon: Database },
  { name: "Shopify & WooCommerce", icon: ShoppingBag },
  { name: "Mailchimp & ActiveCampaign", icon: Send },
  { name: "HubSpot & Pipedrive", icon: Users },
  { name: "Instagram & Facebook Ads", icon: Megaphone },
]

const FLOW_NODES = [
  { id: "form", label: "Formulario web", x: 80, y: 100, Icon: FileText },
  { id: "crm", label: "CRM", x: 240, y: 60, Icon: Users },
  { id: "whatsapp", label: "WhatsApp", x: 400, y: 120, Icon: MessageCircle },
  { id: "email", label: "Email", x: 560, y: 70, Icon: Mail },
  { id: "report", label: "Reporte", x: 720, y: 110, Icon: BarChart },
]

const FLOW_CONNECTIONS = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
]

const MOBILE_FLOW_STEPS = [
  { label: "Formulario web", icon: FileText },
  { label: "CRM", icon: Users },
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Reporte", icon: BarChart },
]

function AutomationsMobileFlow() {
  return (
    <div className="rounded-2xl border border-grafito/15 bg-negro-clave/50 p-5">
      <div className="space-y-3">
        {MOBILE_FLOW_STEPS.map((step, index) => (
          <div key={step.label}>
            <div className="flex items-center gap-4 rounded-xl border border-crema/5 bg-crema/[0.03] px-4 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-oro-clave/10 text-oro-clave">
                <step.icon size={22} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-grafito/70">
                  Paso {index + 1}
                </p>
                <p className="text-base font-medium text-crema">{step.label}</p>
              </div>
            </div>

            {index < MOBILE_FLOW_STEPS.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-oro-clave/10 text-oro-clave">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M7 2.5V11.5 M3.5 8L7 11.5 10.5 8" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AutomationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!isDesktop || prefersReducedMotion || !sectionRef.current || !svgRef.current) return

    const ctx = gsap.context(() => {
      const paths = svgRef.current!.querySelectorAll(".flow-path")
      paths.forEach((path, index) => {
        const length = (path as SVGPathElement).getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1,
          delay: index * 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        })
      })

      const lights = svgRef.current!.querySelectorAll(".flow-light")
      lights.forEach((light, index) => {
        const length = (light as SVGPathElement).getTotalLength()
        gsap.set(light, { strokeDasharray: `24 ${length}`, strokeDashoffset: length })

        const tl = gsap.timeline({ repeat: -1, delay: index * 0.8 + 1.5 })
        tl.to(light, {
          strokeDashoffset: -24,
          duration: 1.5,
          ease: "power2.inOut",
        })
      })

      const nodes = svgRef.current!.querySelectorAll(".flow-node")
      nodes.forEach((node, index) => {
        gsap.to(node, {
          scale: 1.06,
          duration: 2,
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
          ease: "power1.inOut",
          transformOrigin: "center center",
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isDesktop])

  return (
    <section
      id="automatizaciones"
      ref={sectionRef}
      className="section-padding flex min-h-screen flex-col justify-center overflow-hidden bg-negro-mid"
    >
      <div className="container-clave w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn direction="right" disableOnMobile className="flex flex-col">
            <SectionHeader
              badge="Automatizaciones"
              title={
                <>
                  Tu negocio funcionando
                  <br />
                  <span className="text-oro-clave italic">mientras dormÃ­s.</span>
                </>
              }
              className="mb-6"
            />
            <p className="mb-8 max-w-[480px] text-lg leading-relaxed text-grafito">
              Conectamos tus herramientas para que los procesos repetitivos sucedan solos.
              Vos enfocate en lo que realmente importa.
            </p>

            <div className="mb-8 grid grid-cols-2 gap-3">
              {INTEGRATIONS.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  className="group flex items-center gap-2.5 rounded-lg border border-crema/5 bg-crema/5 px-3 py-2.5 text-sm text-crema/70 transition-colors duration-300 hover:border-oro-clave/20 hover:bg-oro-clave/10 hover:text-crema"
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + index * 0.03 }}
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-oro-clave/10 text-oro-clave transition-transform duration-300 group-hover:scale-110">
                    <integration.icon size={14} strokeWidth={2.5} />
                  </div>
                  <span className="min-w-0 leading-snug">{integration.name}</span>
                </motion.div>
              ))}
            </div>

            <a
              href="#contacto"
              className="btn-primary w-full self-stretch justify-center text-center whitespace-normal sm:w-auto sm:self-start sm:justify-start sm:text-left sm:whitespace-nowrap"
            >
              Contame quÃ© proceso querÃ©s automatizar â†’
            </a>
          </FadeIn>

          <FadeIn direction="left" delay={0.2} disableOnMobile className="relative">
            <div className="lg:hidden">
              <AutomationsMobileFlow />
            </div>

            <div className="relative hidden overflow-hidden rounded-2xl border border-grafito/15 bg-negro-clave/50 p-6 lg:block lg:p-8">
              <svg
                ref={svgRef}
                viewBox="0 0 800 220"
                className="h-auto w-full overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {FLOW_CONNECTIONS.map((conn, index) => {
                  const from = FLOW_NODES[conn.from]
                  const to = FLOW_NODES[conn.to]
                  const midX = (from.x + to.x) / 2

                  return (
                    <g key={index}>
                      <path
                        className="flow-path"
                        d={`M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`}
                        stroke="#C9890A"
                        strokeWidth="3"
                        strokeLinecap="round"
                        opacity="0.4"
                      />
                      <path
                        className="flow-light"
                        d={`M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`}
                        stroke="#FFD666"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="url(#neon-glow)"
                      />
                    </g>
                  )
                })}

                {FLOW_NODES.map((node) => (
                  <g key={node.id} className="flow-node group cursor-pointer pointer-events-auto">
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="36"
                      className="fill-[#1A1916] stroke-[#C9890A] transition-all duration-300 group-hover:fill-[#25221B] group-hover:stroke-[#FFD666]"
                      strokeWidth="2.5"
                    />
                    <svg
                      x={node.x - 12}
                      y={node.y - 12}
                      width="24"
                      height="24"
                      className="text-[#C9890A] transition-colors duration-300 group-hover:text-[#FFD666]"
                    >
                      <node.Icon width="24" height="24" strokeWidth={2.5} />
                    </svg>
                    <text
                      x={node.x}
                      y={node.y + 60}
                      textAnchor="middle"
                      className="fill-[#6B6760] transition-colors duration-300 group-hover:fill-[#C9890A]"
                      fontSize="16.5"
                      fontFamily="var(--font-body)"
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-oro-clave/5 blur-[60px]" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
