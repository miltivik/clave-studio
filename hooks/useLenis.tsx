"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react"
import type Lenis from "lenis"
import { shouldEnableLenis } from "@/lib/performance-budget"

const LenisContext = createContext<RefObject<Lenis | null> | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches

    if (!shouldEnableLenis({ isDesktop, prefersReducedMotion })) return

    let disposed = false
    let frameId = 0

    async function initLenis() {
      const { default: LenisConstructor } = await import("lenis")
      if (disposed) return

      const lenis = new LenisConstructor({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      lenisRef.current = lenis

      function raf(time: number) {
        lenis.raf(time)
        frameId = requestAnimationFrame(raf)
      }

      frameId = requestAnimationFrame(raf)
    }

    void initLenis()

    return () => {
      disposed = true
      cancelAnimationFrame(frameId)
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext value={lenisRef}>
      {children}
    </LenisContext>
  )
}
