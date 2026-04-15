"use client"

import { useSyncExternalStore } from "react"

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)

  function handleChange() {
    callback()
  }

  mediaQuery.addEventListener("change", handleChange)
  return () => mediaQuery.removeEventListener("change", handleChange)
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function getServerSnapshot() {
  return false
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
