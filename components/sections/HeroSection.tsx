"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Logo3D } from "@/components/ui/logo-3d"

function KeyVisual() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || !containerRef.current) return

    const el = containerRef.current
    gsap.to(el, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })
  }, [])

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[400px] lg:min-h-[500px]">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full bg-oro-clave/10 blur-[80px]" />
      </div>
      {/* Rotating 3D key */}
      <div
        ref={containerRef}
        className="relative w-full h-[400px] lg:h-[500px]"
      >
        <Logo3D />
      </div>
      {/* Orbiting particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-oro-clave/40"
            style={{
              top: `${30 + Math.sin((i * Math.PI) / 3) * 30}%`,
              left: `${50 + Math.cos((i * Math.PI) / 3) * 35}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-negro-clave overflow-hidden pt-[72px]"
    >
      <div className="container-clave grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center py-12 lg:py-0">
        {/* Left: Copy */}
        <div className="order-2 lg:order-1 flex flex-col gap-6 lg:gap-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-oro-clave/10 border border-oro-clave/20 text-oro-clave text-sm font-body">
              🔑 Agencia Digital · LATAM
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-light tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            Tu próxima venta
            <br />
            empieza con una web
            <br />
            que{" "}
            <span className="text-oro-clave italic font-normal">convierte.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-grafito text-lg lg:text-xl max-w-[520px] leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Creamos sitios web, tiendas online y automatizaciones para pymes
            en LATAM. Rapidas, visibles en Google y pensadas para convertir.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a href="#contacto" className="btn-primary">
              Quiero una web que venda →
            </a>
            <a href="/servicios" className="btn-secondary">
              Ver servicios
            </a>
          </motion.div>
        </div>

        {/* Right: Key Visual */}
        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <KeyVisual />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-grafito"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll para descubrir</span>
        <motion.svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M8 4 L8 16 M3 12 L8 18 L13 12" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
