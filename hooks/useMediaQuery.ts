"use client"

import { useSyncExternalStore } from "react"

function createSubscribe(query: string) {
  return (callback: () => void) => {
    const mediaQuery = window.matchMedia(query)

    function handleChange() {
      callback()
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }
}

function createSnapshot(query: string) {
  return () => window.matchMedia(query).matches
}

function getServerSnapshot() {
  return false
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    createSubscribe(query),
    createSnapshot(query),
    getServerSnapshot
  )
}
