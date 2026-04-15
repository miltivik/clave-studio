"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const FAQS = [
  {
    question: "¿En cuánto tiempo me entregan el proyecto?",
    answer:
      "Nuestros proyectos tienen un plazo promedio de 18 días desde que arrancamos. Antes de empezar te damos una fecha de entrega comprometida por escrito.",
  },
  {
    question: "¿Necesito tener el diseño listo para empezar?",
    answer:
      "No. Nosotros nos encargamos del diseño completo. Vos solo nos contás tu negocio y tus objetivos, y nosotros creamos la propuesta visual.",
  },
  {
    question: "¿Qué pasa si no me gusta cómo quedó?",
    answer:
      "El proceso incluye dos rondas de revisión sin costo. Trabajamos hasta que estés conforme con el resultado.",
  },
  {
    question: "¿Puedo editar el sitio yo mismo después?",
    answer:
      "Sí. Todos nuestros proyectos incluyen un panel de administración sencillo. Y te capacitamos para usarlo antes del lanzamiento.",
  },
  {
    question: "¿Trabajan con clientes fuera de Argentina?",
    answer:
      "Trabajamos con clientes en toda LATAM: Argentina, Uruguay, Chile, Colombia, México y más. Las reuniones son por Zoom, en horario de LATAM.",
  },
  {
    question: "¿Qué plataformas usan para los e-commerce?",
    answer:
      "Dependiendo del proyecto usamos Shopify, WooCommerce o desarrollo custom. Te recomendamos la que mejor se adapte a tu negocio y presupuesto.",
  },
  {
    question: "¿Qué es exactamente una automatización?",
    answer:
      "Es conectar tus herramientas para que ciertas tareas sucedan solas: cuando alguien completa un formulario, te llega un WhatsApp, se agrega al CRM y recibe un email de bienvenida automáticamente. Sin que hagas nada.",
  },
  {
    question: "¿Tienen soporte después del lanzamiento?",
    answer:
      "Todos los planes incluyen soporte post-lanzamiento. El tiempo varía según el plan (1 a 6 meses). Después del período de soporte ofrecemos planes de mantenimiento mensual.",
  },
]

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-negro-clave/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left bg-transparent border-none cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="font-body text-negro-clave font-medium text-[15px] leading-snug group-hover:text-oro-clave transition-colors">
          {faq.question}
        </span>
        <motion.span
          className="text-oro-clave text-xl leading-none shrink-0 mt-0.5"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="text-grafito text-sm leading-relaxed pb-5 pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  const half = Math.ceil(FAQS.length / 2)
  const col1 = FAQS.slice(0, half)
  const col2 = FAQS.slice(half)

  return (
    <section id="faq" className="bg-crema section-padding">
      <div className="container-clave">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-oro-clave font-body text-sm font-medium tracking-widest uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-negro-clave font-light leading-tight">
            Preguntas{" "}
            <span className="text-oro-clave italic">frecuentes.</span>
          </h2>
        </div>

        {/* JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />

        {/* Two-column FAQ grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 max-w-[1000px] mx-auto">
          <div>
            {col1.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
          <div>
            {col2.map((faq, i) => (
              <FAQItem
                key={i + half}
                faq={faq}
                isOpen={openIndex === i + half}
                onToggle={() => toggle(i + half)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
