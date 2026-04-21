"use client"

import { useEffect, useRef, useState } from "react"

interface UseNearViewportOptions {
  rootMargin?: string
  threshold?: number
}

export function useNearViewport<T extends HTMLElement>(options?: UseNearViewportOptions) {
  const targetRef = useRef<T | null>(null)
  const [isNearViewport, setIsNearViewport] = useState(false)

  useEffect(() => {
    const node = targetRef.current
    if (!node || isNearViewport) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return

        if (entry.isIntersecting) {
          setIsNearViewport(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: options?.rootMargin ?? "320px 0px",
        threshold: options?.threshold ?? 0,
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [isNearViewport, options?.rootMargin, options?.threshold])

  return [targetRef, isNearViewport] as const
}
