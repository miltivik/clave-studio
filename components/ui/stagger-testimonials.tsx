"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TestimonialItem {
  testimonial: string
  by: string
  imgSrc: string
}

interface CarouselItem extends TestimonialItem {
  id: string
}

interface CardDimensions {
  width: number
  height: number
}

const DEFAULT_CARD_DIMENSIONS: CardDimensions = {
  width: 380,
  height: 330,
}

interface TestimonialCardProps {
  position: number
  testimonial: CarouselItem
  onMove: (steps: number) => void
  cardWidth: number
  cardHeight: number
}

function modulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor
}

function getCardDimensions(width: number): CardDimensions {
  if (width >= 1280) return { width: 380, height: 330 }
  if (width >= 1024) return { width: 340, height: 310 }
  if (width >= 640) return { width: 310, height: 300 }
  return { width: 270, height: 290 }
}

function TestimonialCard({
  position,
  testimonial,
  onMove,
  cardWidth,
  cardHeight,
}: TestimonialCardProps) {
  const isCenter = position === 0
  const absPos = Math.abs(position)

  if (absPos > 2) return null

  const opacity = isCenter ? 1 : absPos === 1 ? 0.6 : 0.3
  const scale = isCenter ? 1 : absPos === 1 ? 0.9 : 0.8
  const zIndex = isCenter ? 10 : absPos === 1 ? 5 : 1
  const xOffset = position * (cardWidth * 0.85)
  const yOffset = isCenter ? -30 : position % 2 ? 10 : -10
  const rotation = isCenter ? 0 : position > 0 ? 3 : -3

  const [author, ...rest] = testimonial.by.split(",")
  const role = rest.join(",").trim()

  return (
    <div
      onClick={() => onMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border p-6 sm:p-8 rounded-2xl",
        "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isCenter
          ? "bg-oro-clave text-negro-clave border-oro-clave/60"
          : "bg-white/90 text-negro-clave border-negro-clave/5 backdrop-blur-sm",
      )}
      style={{
        width: cardWidth,
        height: cardHeight,
        opacity,
        zIndex,
        transform: `
          translate(-50%, -50%)
          translateX(${xOffset}px)
          translateY(${yOffset}px)
          rotate(${rotation}deg)
          scale(${scale})
        `,
        boxShadow: isCenter
          ? "0 25px 60px -15px rgba(201, 137, 10, 0.3), 0 10px 20px -5px rgba(0,0,0,0.08)"
          : "0 8px 30px -8px rgba(0, 0, 0, 0.08)",
        pointerEvents: absPos > 2 ? "none" : "auto",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={testimonial.imgSrc}
            alt={author}
            width={48}
            height={48}
            className={cn(
              "h-12 w-12 object-cover rounded-full border-2 flex-shrink-0",
              isCenter ? "border-negro-clave/10" : "border-oro-clave/20",
            )}
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold font-body truncate">{author}</p>
            <p className={cn("text-xs truncate", isCenter ? "text-negro-clave/60" : "text-grafito")}>
              {role}
            </p>
          </div>
        </div>

        <div className={cn("flex gap-0.5 mb-3 text-xs", isCenter ? "text-negro-clave/60" : "text-oro-clave")}>
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index}>{"\u2605"}</span>
          ))}
        </div>

        <blockquote
          className={cn(
            "text-sm sm:text-[15px] leading-relaxed font-body flex-1",
            isCenter ? "text-negro-clave font-medium" : "text-negro-clave/75",
          )}
        >
          &ldquo;{testimonial.testimonial}&rdquo;
        </blockquote>
      </div>
    </div>
  )
}

export interface StaggerTestimonialsProps {
  testimonials: TestimonialItem[]
}

export function StaggerTestimonials({ testimonials }: StaggerTestimonialsProps) {
  const [cardDimensions, setCardDimensions] = useState<CardDimensions>(DEFAULT_CARD_DIMENSIONS)
  const [rotation, setRotation] = useState(0)

  const items = useMemo<CarouselItem[]>(
    () =>
      testimonials.map((testimonial, index) => ({
        ...testimonial,
        id: `${index}-${testimonial.by}-${testimonial.imgSrc}`,
      })),
    [testimonials],
  )

  const orderedTestimonials = useMemo(() => {
    if (items.length === 0) return []

    const offset = modulo(rotation, items.length)
    return [...items.slice(offset), ...items.slice(0, offset)]
  }, [items, rotation])

  function handleMove(steps: number) {
    if (items.length === 0 || steps === 0) return
    setRotation((currentRotation) => modulo(currentRotation + steps, items.length))
  }

  useEffect(() => {
    function updateSize() {
      setCardDimensions(getCardDimensions(window.innerWidth))
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  if (orderedTestimonials.length === 0) return null

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 520 }}>
      {orderedTestimonials.map((testimonial, index) => {
        const position = orderedTestimonials.length % 2
          ? index - (orderedTestimonials.length - 1) / 2
          : index - orderedTestimonials.length / 2

        return (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            onMove={handleMove}
            position={position}
            cardWidth={cardDimensions.width}
            cardHeight={cardDimensions.height}
          />
        )
      })}

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4 z-30">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300",
            "bg-white border border-negro-clave/10 text-negro-clave shadow-lg",
            "hover:bg-oro-clave hover:text-negro-clave hover:border-oro-clave hover:scale-110",
            "active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oro-clave",
          )}
          aria-label="Testimonio anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300",
            "bg-white border border-negro-clave/10 text-negro-clave shadow-lg",
            "hover:bg-oro-clave hover:text-negro-clave hover:border-oro-clave hover:scale-110",
            "active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oro-clave",
          )}
          aria-label="Siguiente testimonio"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
