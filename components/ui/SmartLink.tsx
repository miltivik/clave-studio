"use client"

import { useLayoutEffect, type MouseEvent, type ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useLenis } from "@/hooks/useLenis"
import { cn } from "@/lib/utils"

const SECTION_PARAM = "section"
const SCROLL_GAP = 16
const SCROLL_RETRY_COUNT = 20
const SCROLL_RETRY_MS = 100
const SCROLL_ALIGNMENT_TOLERANCE = 12
const SCROLL_STABILITY_ATTEMPTS = 6

type SmartLinkProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  ariaLabel?: string
} & (
  | {
      href: string
      sectionId?: never
    }
  | {
      href?: never
      sectionId: string
    }
)

function getSectionHref(sectionId: string) {
  return `/?${SECTION_PARAM}=${encodeURIComponent(sectionId)}`
}

function getHeaderOffset() {
  const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 72
  return headerHeight + SCROLL_GAP
}

function isSectionAligned(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (!el) return false

  const expectedTop = getHeaderOffset()
  const actualTop = el.getBoundingClientRect().top
  return Math.abs(actualTop - expectedTop) <= SCROLL_ALIGNMENT_TOLERANCE
}

function scrollToSection(
  sectionId: string,
  lenisRef: ReturnType<typeof useLenis>,
  options: { immediate?: boolean } = {},
) {
  const el = document.getElementById(sectionId)
  if (!el) return false

  const targetTop = Math.max(0, window.scrollY + el.getBoundingClientRect().top - getHeaderOffset())
  const lenis = lenisRef?.current

  if (lenis && !options.immediate) {
    lenis.scrollTo(targetTop, {
      duration: 0.8,
    })
    return true
  }

  window.scrollTo({
    top: targetTop,
    behavior: options.immediate ? "auto" : "smooth",
  })
  return true
}

function scheduleScrollCorrection(sectionId: string, lenisRef: ReturnType<typeof useLenis>) {
  let attempt = 0

  function runScroll() {
    if (
      (attempt >= SCROLL_STABILITY_ATTEMPTS && isSectionAligned(sectionId)) ||
      attempt >= SCROLL_RETRY_COUNT
    ) {
      return
    }

    attempt += 1
    scrollToSection(sectionId, lenisRef, { immediate: true })
    window.setTimeout(runScroll, SCROLL_RETRY_MS)
  }

  window.setTimeout(runScroll, SCROLL_RETRY_MS)
}

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
}

export function SectionScrollHandler() {
  const pathname = usePathname()
  const lenisRef = useLenis()

  useLayoutEffect(() => {
    const currentPathname = pathname || window.location.pathname
    if (currentPathname !== "/") return

    const params = new URLSearchParams(window.location.search)
    const sectionId = params.get(SECTION_PARAM)
    if (!sectionId) return
    const targetSectionId = sectionId

    let retryTimer: number | undefined
    let cancelled = false
    let attempt = 0

    function runScroll() {
      if (cancelled) return
      scrollToSection(targetSectionId, lenisRef, { immediate: true })
      attempt += 1

      if (
        (attempt >= SCROLL_STABILITY_ATTEMPTS && isSectionAligned(targetSectionId)) ||
        attempt >= SCROLL_RETRY_COUNT
      ) {
        return
      }

      retryTimer = window.setTimeout(runScroll, SCROLL_RETRY_MS)
    }

    const frame = window.requestAnimationFrame(runScroll)
    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
      if (retryTimer) window.clearTimeout(retryTimer)
    }
  }, [pathname, lenisRef])

  return null
}

export function SmartLink({ href, sectionId, children, className, onClick, ariaLabel }: SmartLinkProps) {
  const pathname = usePathname()
  const router = useRouter()
  const lenisRef = useLenis()
  const resolvedHref = sectionId ? getSectionHref(sectionId) : href!

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.()

    if (!sectionId || event.defaultPrevented || isModifiedClick(event)) return

    event.preventDefault()
    if (pathname === "/") {
      scrollToSection(sectionId, lenisRef)
      scheduleScrollCorrection(sectionId, lenisRef)
      return
    }

    router.push(resolvedHref, { scroll: false })
  }

  return (
    <Link
      href={resolvedHref}
      scroll={sectionId ? false : undefined}
      className={cn(className)}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  )
}
