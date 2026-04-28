"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { gsap } from "gsap"
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
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[280px] w-[280px] rounded-full bg-oro-clave/10 blur-[70px] lg:h-[360px] lg:w-[360px]" />
      </div>
      <div className="relative flex h-[300px] w-[300px] items-center justify-center lg:h-[360px] lg:w-[360px]">
        <Image
          src="/logo-3d.svg"
          alt="Clave Studio"
          fill
          loading="eager"
          fetchPriority="high"
          className="object-contain opacity-95 drop-shadow-[0_24px_60px_rgba(201,137,10,0.18)]"
          sizes="(max-width: 1023px) 300px, 360px"
        />
      </div>
    </div>
  )
}

export function HeroVisualDesktop() {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasMounted = useHasMounted()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const prefersReducedMotion = useReducedMotion()
  const shouldRender3D = shouldLoadHero3D({
    hasMounted,
    isDesktop,
    prefersReducedMotion,
  })

  useEffect(() => {
    if (!shouldRender3D || prefersReducedMotion || !containerRef.current) return

    const el = containerRef.current
    const tween = gsap.to(el, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    return () => {
      tween.kill()
    }
  }, [prefersReducedMotion, shouldRender3D])

  return (
    <div className="relative flex h-full w-full min-h-[400px] items-center justify-center lg:min-h-[500px]">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-[300px] w-[300px] rounded-full bg-oro-clave/10 blur-[70px] lg:h-[400px] lg:w-[400px] lg:blur-[80px]" />
      </div>
      <div ref={containerRef} className="relative h-[400px] w-full lg:h-[500px]">
        {shouldRender3D ? <Logo3D /> : <StaticHeroVisual />}
      </div>
      <div className="pointer-events-none absolute inset-0">
        {[...Array(6)].map((_, index) => (
          <span
            key={index}
            className="absolute h-1.5 w-1.5 animate-pulse rounded-full bg-oro-clave/40"
            style={{
              top: `${30 + Math.sin((index * Math.PI) / 3) * 30}%`,
              left: `${50 + Math.cos((index * Math.PI) / 3) * 35}%`,
              animationDelay: `${index * 300}ms`,
              animationDuration: `${3000 + index * 500}ms`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
