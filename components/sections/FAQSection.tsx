"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

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
    question: "¿Trabajan con clientes fuera de Uruguay?",
    answer:
      "Sí. Hoy tenemos foco comercial en Uruguay, pero también trabajamos con clientes de otros países de LATAM cuando el proyecto encaja bien. Las reuniones se coordinan por Zoom, en horario Uruguay.",
  },
  {
    question: "¿Qué plataformas usan para los e-commerce?",
    answer:
      "Dependiendo del proyecto usamos Shopify, WooCommerce o desarrollo custom. Te recomendamos la que mejor se adapte a tu negocio, presupuesto y operación.",
  },
  {
    question: "¿Qué es exactamente una automatización?",
    answer:
      "Es conectar tus herramientas para que ciertas tareas sucedan solas: cuando alguien completa un formulario, te llega un WhatsApp, se agrega al CRM y recibe un email de bienvenida automáticamente. Sin que hagas nada.",
  },
  {
    question: "¿Tienen soporte después del lanzamiento?",
    answer:
      "Todos los planes incluyen soporte post-lanzamiento. El tiempo varía según el plan, y después del período inicial podemos seguir con mantenimiento mensual o mejoras evolutivas.",
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
        className="group flex w-full items-start justify-between gap-4 border-none bg-transparent py-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-body text-negro-clave font-medium text-[15px] leading-snug transition-colors group-hover:text-oro-clave">
          {faq.question}
        </span>
        <motion.span
          className="mt-0.5 shrink-0 text-xl leading-none text-oro-clave"
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
            <p className="pb-5 pr-12 text-sm leading-relaxed text-grafito">
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

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  const half = Math.ceil(FAQS.length / 2)
  const col1 = FAQS.slice(0, half)
  const col2 = FAQS.slice(half)

  return (
    <section id="faq" className="bg-crema section-padding">
      <div className="container-clave">
        <div className="mb-16 text-center">
          <span className="mb-4 block font-body text-sm font-medium uppercase tracking-widest text-oro-clave">
            FAQ
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight text-negro-clave">
            Preguntas <span className="text-oro-clave italic">frecuentes.</span>
          </h2>
        </div>

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

        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-16">
          <div>
            {col1.map((faq, index) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            ))}
          </div>
          <div>
            {col2.map((faq, index) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openIndex === index + half}
                onToggle={() => toggle(index + half)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
