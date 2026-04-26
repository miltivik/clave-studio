"use client"

import { useEffect, useEffectEvent, useRef, useState } from "react"
import Script from "next/script"

interface TurnstileRenderOptions {
  sitekey: string
  callback: (token: string) => void
  "expired-callback"?: () => void
  "error-callback"?: () => void
  theme?: "light" | "dark" | "auto"
}

interface TurnstileApi {
  render(container: HTMLElement, options: TurnstileRenderOptions): string | number
  remove(widgetId: string | number): void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

interface TurnstileFieldProps {
  siteKey: string
  renderKey: number
  errorMessage?: string
  onVerify: (token: string) => void
  onExpire: () => void
  onError: () => void
}

export function TurnstileField({
  siteKey,
  renderKey,
  errorMessage,
  onVerify,
  onExpire,
  onError,
}: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | number | null>(null)
  const [isScriptReady, setIsScriptReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.turnstile)
  )
  const handleVerify = useEffectEvent((token: string) => {
    onVerify(token)
  })
  const handleExpire = useEffectEvent(() => {
    onExpire()
  })
  const handleError = useEffectEvent(() => {
    onError()
  })

  useEffect(() => {
    if (!siteKey || !isScriptReady || !containerRef.current || !window.turnstile) return

    containerRef.current.innerHTML = ""
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: handleVerify,
      "expired-callback": handleExpire,
      "error-callback": handleError,
      theme: "dark",
    })

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {}
      }

      widgetIdRef.current = null
    }
  }, [isScriptReady, renderKey, siteKey])

  return (
    <div className="space-y-2">
      <Script
        id="cloudflare-turnstile-script"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setIsScriptReady(true)}
      />

      <div ref={containerRef} />

      {!siteKey && (
        <p className="text-xs text-red-400">
          Falta configurar NEXT_PUBLIC_TURNSTILE_SITE_KEY para habilitar el envio.
        </p>
      )}

      {errorMessage && <p className="text-xs text-red-400">{errorMessage}</p>}
    </div>
  )
}
