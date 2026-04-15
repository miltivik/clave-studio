'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
}

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-grafito/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left bg-transparent border-none cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="font-body text-crema font-medium text-[15px] leading-snug group-hover:text-oro-clave transition-colors text-left">
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

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="bg-negro-mid py-20">
      <div className="container-clave">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-oro-clave font-body text-sm font-medium tracking-widest uppercase mb-4 block">
              FAQ
            </span>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-crema font-light">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="bg-negro-clave/30 rounded-xl p-6">
            <div>
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
