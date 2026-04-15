"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

const METRICS = [
  "+40 proyectos entregados",
  "98% clientes satisfechos",
  "Promedio 18 días de entrega",
  "+$2M en ventas generadas para clientes",
]

export function SocialProofStrip() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || !marqueeRef.current) return

    const el = marqueeRef.current
    const width = el.scrollWidth / 2

    tweenRef.current = gsap.to(el, {
      x: -width,
      duration: 30,
      ease: "none",
      repeat: -1,
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [])

  const handleMouseEnter = () => tweenRef.current?.pause()
  const handleMouseLeave = () => tweenRef.current?.resume()

  const content = METRICS.map((metric, i) => (
    <div key={i} className="flex items-center gap-8 px-8">
      <span className="text-crema/80 font-body text-sm lg:text-base whitespace-nowrap font-medium">
        {metric}
      </span>
      <span className="text-oro-clave/40 text-lg">◆</span>
    </div>
  ))

  return (
    <section className="bg-negro-mid py-6 lg:py-8 overflow-hidden border-y border-grafito/10">
      <div
        ref={marqueeRef}
        className="flex items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Two copies for seamless loop */}
        <div className="flex items-center shrink-0">{content}</div>
        <div className="flex items-center shrink-0">{content}</div>
      </div>
    </section>
  )
}
