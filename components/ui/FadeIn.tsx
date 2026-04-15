"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { useHasMounted } from "@/hooks/useHasMounted"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
  disableOnMobile?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.6,
  disableOnMobile = false,
}: FadeInProps) {
  const hasMounted = useHasMounted()
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 767px)")

  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 }
  }

  const shouldDisableAnimation =
    prefersReducedMotion || (disableOnMobile && (!hasMounted || isMobile))

  if (shouldDisableAnimation)
    return <div className={className}>{children}</div>

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
