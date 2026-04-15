"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTilt } from "@/hooks/useTilt"

const CASES = [
  {
    category: "Salud / Profesional",
    client: "Smile Leslieville",
    result: "Experiencia premium para clinica dental con servicios y contacto",
    stack: ["Landing Page", "UX/UI", "Responsive"],
    gradient: "from-oro-clave/20 via-oro-clave/5 to-negro-mid",
    accent: "bg-oro-clave",
    href: "https://dentista-demo-nine.vercel.app/",
    image: "/images/portfolio/dentista.png",
  },
  {
    category: "Inmobiliaria",
    client: "Porto Seguro",
    result: "Filtros en vivo y catalogo de propiedades dinamico",
    stack: ["Catalogo", "Next.js", "Conversion"],
    gradient: "from-miel/15 via-miel/5 to-negro-mid",
    accent: "bg-miel",
    href: "https://porto-seguro-demo.vercel.app/",
    image: "/images/portfolio/porto-seguro.png",
  },
  {
    category: "Gastronomia",
    client: "Papas Lokas",
    result: "Menu digital vibrante con diseno enfocado en productos",
    stack: ["Menu Digital", "Branding", "Fast Food"],
    gradient: "from-grafito/30 via-grafito/10 to-negro-mid",
    accent: "bg-grafito",
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
      className="group relative rounded-2xl overflow-hidden bg-negro-mid border border-grafito/15 hover:border-oro-clave/30 transition-colors cursor-pointer block"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative h-[220px] lg:h-[260px] bg-negro-clave overflow-hidden">
        <Image
          src={project.image}
          alt={`Portada de ${project.client}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-negro-mid/50 group-hover:bg-negro-mid/10 transition-colors duration-500" />

        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-full bg-negro-clave/60 backdrop-blur-md text-xs text-crema/80 border border-crema/10">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <p className="text-grafito text-sm mb-2">{project.client}</p>
        <h3 className="font-display text-2xl text-crema font-normal mb-4 leading-tight">
          {project.result}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-crema/5 text-grafito text-xs font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-oro-clave to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.a>
  )
}

export function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-negro-clave section-padding">
      <div className="container-clave">
        <div className="text-center mb-16">
          <span className="text-oro-clave font-body text-sm font-medium tracking-widest uppercase mb-4 block">
            Portfolio
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight">
            Proyectos que hablan
            <br />
            <span className="text-oro-clave italic">por si solos.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CASES.map((project, index) => (
            <PortfolioCard key={project.client} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-grafito mb-4">Quieres ver mas proyectos?</p>
          <a href="#contacto" className="btn-secondary">
            Ver portfolio completo
          </a>
        </motion.div>
      </div>
    </section>
  )
}
