"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { gsap } from "gsap"
import { motion } from "framer-motion"
import { SmartLink } from "@/components/ui/SmartLink"
import { useHasMounted } from "@/hooks/useHasMounted"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { shouldLoadHero3D } from "@/lib/performance-budget"

const Logo3D = dynamic(() => import("@/components/ui/logo-3d").then((mod) => mod.Logo3D), {
  ssr: false,
})

function StaticHeroVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[220px] w-[220px] rounded-full bg-oro-clave/10 blur-[70px] sm:h-[280px] sm:w-[280px] lg:h-[360px] lg:w-[360px]" />
      </div>
      <div className="relative flex h-[240px] w-[240px] items-center justify-center sm:h-[300px] sm:w-[300px] lg:h-[360px] lg:w-[360px]">
        <Image
          src="/logo-3d.svg"
          alt="Clave Studio"
          fill
          priority
          className="object-contain opacity-95 drop-shadow-[0_24px_60px_rgba(201,137,10,0.18)]"
          sizes="(max-width: 639px) 240px, (max-width: 1023px) 300px, 360px"
        />
      </div>
    </div>
  )
}

function KeyVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasMounted = useHasMounted()
  const isMobile = useMediaQuery("(max-width: 767px)")
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const prefersReducedMotion = useReducedMotion()
  const shouldRender3D = shouldLoadHero3D({
    hasMounted,
    isDesktop,
    prefersReducedMotion,
  })

  useEffect(() => {
    if (!shouldRender3D || isMobile || prefersReducedMotion || !containerRef.current) return

    const el = containerRef.current
    gsap.to(el, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })
  }, [isMobile, prefersReducedMotion, shouldRender3D])

  return (
      <div className="relative flex h-full w-full min-h-[260px] items-center justify-center sm:min-h-[400px] lg:min-h-[500px]">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="h-[240px] w-[240px] rounded-full bg-oro-clave/10 blur-[70px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px] lg:blur-[80px]" />
      </div>
      <div ref={containerRef} className="relative h-[320px] w-full sm:h-[400px] lg:h-[500px]">
        {shouldRender3D ? <Logo3D /> : <StaticHeroVisual />}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-oro-clave/40"
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
  const hasMounted = useHasMounted()
  const isMobile = useMediaQuery("(max-width: 767px)")
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = !hasMounted || isMobile || prefersReducedMotion

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-negro-clave pt-[72px]"
    >
      <div className="container-clave grid grid-cols-1 items-center gap-8 py-10 pb-20 sm:py-12 sm:pb-24 lg:grid-cols-2 lg:gap-4 lg:py-0">
        <div className="order-1 flex flex-col gap-6 lg:order-1 lg:gap-8">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: 0 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-oro-clave/20 bg-oro-clave/10 px-4 py-2 text-sm font-body text-oro-clave">
              Clave Studio · LATAM
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-tight"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              delay: shouldReduceMotion ? 0 : 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            Tu próxima venta
            <br />
            empieza con una web
            <br />
            que <span className="font-normal italic text-oro-clave">convierte.</span>
          </motion.h1>

          <motion.p
            className="max-w-[520px] text-lg font-light leading-relaxed text-grafito lg:text-xl"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.4,
            }}
          >
            Creamos sitios web, tiendas online y automatizaciones para pymes en LATAM. Rápidas,
            visibles en Google y pensadas para convertir.
          </motion.p>

          <motion.div
            className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.6,
            }}
          >
            <SmartLink
              sectionId="contacto"
              className="btn-primary w-full justify-center whitespace-normal text-center sm:w-auto sm:whitespace-nowrap"
            >
              Quiero una web que venda →
            </SmartLink>
            <SmartLink
              href="/servicios"
              className="btn-secondary w-full justify-center whitespace-normal text-center sm:w-auto sm:whitespace-nowrap"
            >
              Ver servicios
            </SmartLink>
          </motion.div>
        </div>

        <motion.div
          className="order-2 lg:order-2"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1,
            delay: shouldReduceMotion ? 0 : 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <KeyVisual />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-grafito md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll para descubrir</span>
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
