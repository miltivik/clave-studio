"use client"

import { LenisProvider } from "@/hooks/useLenis"
import type { ReactNode } from "react"

export function ClientLayout({ children }: { children: ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>
}
