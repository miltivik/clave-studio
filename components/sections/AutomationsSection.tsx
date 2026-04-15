"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/ui/FadeIn"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { 
  FileText, 
  Users, 
  MessageCircle, 
  Mail, 
  BarChart, 
  CreditCard, 
  Database, 
  ShoppingBag, 
  Send, 
  Megaphone
} from "lucide-react"

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

export function AutomationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || !sectionRef.current || !svgRef.current) return

    const ctx = gsap.context(() => {
      // Animate SVG paths (stroke-dashoffset)
      const paths = svgRef.current!.querySelectorAll(".flow-path")
      paths.forEach((path, i) => {
        const length = (path as SVGPathElement).getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1,
          delay: i * 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        })
      })

      // Animate traveling light particles
      const lights = svgRef.current!.querySelectorAll(".flow-light")
      lights.forEach((light, i) => {
        const length = (light as SVGPathElement).getTotalLength()
        // Start dashed line offset past the path
        gsap.set(light, { strokeDasharray: `24 ${length}`, strokeDashoffset: length })
        
        // Use a continuous timeline for an infinite looping particle effect
        const tl = gsap.timeline({ repeat: -1, delay: i * 0.8 + 1.5 })
        tl.to(light, {
          strokeDashoffset: -24, // Move all the way to the end
          duration: 1.5,
          ease: "power2.inOut",
        })
      })

      // Pulse nodes
      const nodes = svgRef.current!.querySelectorAll(".flow-node")
      nodes.forEach((node, i) => {
        gsap.to(node, {
          scale: 1.06,
          duration: 2,
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
          ease: "power1.inOut",
          transformOrigin: "center center",
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="automatizaciones" ref={sectionRef} className="bg-negro-mid section-padding overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="container-clave w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <FadeIn direction="right" className="flex flex-col">
            <SectionHeader
              badge="Automatizaciones"
              title={
                <>
                  Tu negocio funcionando
                  <br />
                  <span className="text-oro-clave italic">mientras dormís.</span>
                </>
              }
              className="mb-6"
            />
            <p className="text-grafito text-lg leading-relaxed mb-8 max-w-[480px]">
              Conectamos tus herramientas para que los procesos repetitivos sucedan solos.
              Vos enfocate en lo que realmente importa.
            </p>

            {/* Integrations grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {INTEGRATIONS.map((integration, i) => (
                <motion.div
                  key={integration.name}
                  className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-crema/5 border border-crema/5 text-sm text-crema/70 transition-colors duration-300 hover:bg-oro-clave/10 hover:border-oro-clave/20 hover:text-crema"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-md bg-oro-clave/10 text-oro-clave shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <integration.icon size={14} strokeWidth={2.5} />
                  </div>
                  {integration.name}
                </motion.div>
              ))}
            </div>

            <a href="#contacto" className="btn-primary self-start">
              Contame qué proceso querés automatizar →
            </a>
          </FadeIn>

          {/* Right: SVG Flow Diagram */}
          <FadeIn direction="left" delay={0.2} className="relative">
            <div className="relative bg-negro-clave/50 rounded-2xl border border-grafito/15 p-6 lg:p-8 overflow-hidden">
              <svg
                ref={svgRef}
                viewBox="0 0 800 220"
                className="w-full h-auto overflow-visible"
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

                {/* Connection paths */}
                {FLOW_CONNECTIONS.map((conn, i) => {
                  const from = FLOW_NODES[conn.from]
                  const to = FLOW_NODES[conn.to]
                  const midX = (from.x + to.x) / 2
                  return (
                    <g key={i}>
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

                {/* Nodes */}
                {FLOW_NODES.map((node) => (
                  <g key={node.id} className="flow-node group cursor-pointer pointer-events-auto">
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="36"
                      className="fill-[#1A1916] stroke-[#C9890A] transition-all duration-300 group-hover:fill-[#25221B] group-hover:stroke-[#FFD666]"
                      strokeWidth="2.5"
                    />
                    <svg x={node.x - 12} y={node.y - 12} width="24" height="24" className="text-[#C9890A] transition-colors duration-300 group-hover:text-[#FFD666]">
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

              {/* Glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-oro-clave/5 rounded-full blur-[60px] pointer-events-none" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
