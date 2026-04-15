"use client"

import { useEffect, useRef, type RefObject } from "react"
import { gsap } from "gsap"

export function useTilt(ref: RefObject<HTMLElement | null>) {
  const isHovering = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering.current) return
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      gsap.to(el, {
        rotateX: -y * 12,
        rotateY: x * 12,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const handleMouseEnter = () => {
      isHovering.current = true
    }

    const handleMouseLeave = () => {
      isHovering.current = false
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseenter", handleMouseEnter)
    el.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseenter", handleMouseEnter)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [ref])
}
