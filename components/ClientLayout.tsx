"use client"

import { LenisProvider } from "@/hooks/useLenis"
import { SectionScrollHandler } from "@/components/ui/SmartLink"
import type { ReactNode } from "react"

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <SectionScrollHandler />
      {children}
    </LenisProvider>
  )
}
