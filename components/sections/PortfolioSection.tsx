"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTilt } from "@/hooks/useTilt"

const CASES = [
  {
    category: "Salud / Profesional",
    client: "Smile Leslieville",
    result: "Experiencia premium para clínica dental con servicios y contacto",
    stack: ["Landing Page", "UX/UI", "Responsive"],
    href: "https://dentista-demo-nine.vercel.app/",
    image: "/images/portfolio/dentista.png",
  },
  {
    category: "Inmobiliaria",
    client: "Porto Seguro",
    result: "Filtros en vivo y catálogo de propiedades dinámico",
    stack: ["Catálogo", "Next.js", "Conversión"],
    href: "https://porto-seguro-demo.vercel.app/",
    image: "/images/portfolio/porto-seguro.png",
  },
  {
    category: "Gastronomía",
    client: "Papas Lokas",
    result: "Menú digital vibrante con diseño enfocado en productos",
    stack: ["Menú Digital", "Branding", "Fast Food"],
    href: "https://papas-demo.vercel.app/",
    image: "/images/portfolio/papas.png",
  },
] as const

interface PortfolioCardProps {
  project: (typeof CASES)[number]
  index: number
}

function PortfolioCard({ project, index }: PortfolioCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  useTilt(cardRef)

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className="group relative block overflow-hidden rounded-2xl border border-grafito/15 bg-negro-mid transition-colors hover:border-oro-clave/30"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative h-[220px] overflow-hidden bg-negro-clave lg:h-[260px]">
        <Image
          src={project.image}
          alt={`Portada de ${project.client}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-negro-mid/50 transition-colors duration-500 group-hover:bg-negro-mid/10" />

        <div className="absolute left-4 top-4 z-10">
          <span className="rounded-full border border-crema/10 bg-negro-clave/60 px-3 py-1.5 text-xs text-crema/80 backdrop-blur-md">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <p className="mb-2 text-sm text-grafito">{project.client}</p>
        <h3 className="mb-4 font-display text-2xl font-normal leading-tight text-crema">
          {project.result}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-crema/5 px-2.5 py-1 text-xs font-mono text-grafito"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-oro-clave to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.a>
  )
}

export function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-negro-clave section-padding">
      <div className="container-clave">
        <div className="mb-16 text-center">
          <span className="text-oro-clave font-body mb-4 block text-sm font-medium tracking-widest uppercase">
            Portfolio
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight">
            Proyectos que hablan
            <br />
            <span className="text-oro-clave italic">por sí solos.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {CASES.map((project, index) => (
            <PortfolioCard key={project.client} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-12 text-center lg:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-grafito">¿Querés ver más proyectos?</p>
          <a href="#contacto" className="btn-secondary">
            Ver portfolio completo
          </a>
        </motion.div>
      </div>
    </section>
  )
}
