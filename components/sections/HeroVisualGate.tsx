"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const HeroVisualDesktop = dynamic(
  () => import("@/components/sections/HeroVisualDesktop").then((mod) => mod.HeroVisualDesktop),
  {
    ssr: false,
    loading: () => <div className="min-h-[400px] lg:min-h-[500px]" />,
  }
)

function defer(callback: () => void) {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 200 })
  } else {
    setTimeout(callback, 150)
  }
}

export function HeroVisualGate() {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)")
    const update = () => {
      if (query.matches) {
        defer(() => setCanRender(true))
      } else {
        setCanRender(false)
      }
    }

    update()
    query.addEventListener("change", update)

    return () => query.removeEventListener("change", update)
  }, [])

  return canRender ? <HeroVisualDesktop /> : null
}
