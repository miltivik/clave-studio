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

export function HeroVisualGate() {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)")
    const update = () => setCanRender(query.matches)

    update()
    query.addEventListener("change", update)

    return () => query.removeEventListener("change", update)
  }, [])

  return canRender ? <HeroVisualDesktop /> : null
}
