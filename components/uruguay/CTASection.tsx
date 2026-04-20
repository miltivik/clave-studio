'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactFormData } from "@/lib/validations"

interface CTASectionProps {
  cta: {
    primary: string
    secondary: string
  }
}

export function CTASection({ cta }: CTASectionProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: ContactFormData) {
    setStatus("submitting")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Error al enviar")

      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contacto" className="bg-negro-clave py-20 border-t border-grafito/10">
      <div className="container-clave">
        <div className="max-w-[720px] mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-tight mb-4">
              {cta.primary}
            </h2>
            <p className="text-grafito text-lg max-w-[480px] mx-auto">
              Contanos tu proyecto. Te respondemos en menos de 24 horas con una propuesta clara.
            </p>
          </motion.div>

          {status === "success" ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-full bg-oro-clave/10 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-oro-clave"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-crema mb-2">Mensaje enviado</h3>
              <p className="text-grafito">Te respondemos en menos de 24 horas.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-crema/60 text-xs font-body uppercase tracking-wider">
                    Nombre completo *
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="bg-negro-mid border border-grafito/20 rounded-lg px-4 py-3 text-crema text-sm placeholder:text-grafito/40 focus:outline-none focus:border-oro-clave/50 transition-colors"
                    placeholder="Tu nombre"
                  />
                  {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-crema/60 text-xs font-body uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="bg-negro-mid border border-grafito/20 rounded-lg px-4 py-3 text-crema text-sm placeholder:text-grafito/40 focus:outline-none focus:border-oro-clave/50 transition-colors"
                    placeholder="tu@email.com"
                  />
                  {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="whatsapp" className="text-crema/60 text-xs font-body uppercase tracking-wider">
                    WhatsApp (opcional)
                  </label>
                  <input
                    id="whatsapp"
                    type="tel"
                    {...register("whatsapp")}
                    className="bg-negro-mid border border-grafito/20 rounded-lg px-4 py-3 text-crema text-sm placeholder:text-grafito/40 focus:outline-none focus:border-oro-clave/50 transition-colors"
                    placeholder="+598 92 395 129"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service" className="text-crema/60 text-xs font-body uppercase tracking-wider">
                    Que necesitas? *
                  </label>
                  <select
                    id="service"
                    {...register("service")}
                    className="bg-negro-mid border border-grafito/20 rounded-lg px-4 py-3 text-crema text-sm focus:outline-none focus:border-oro-clave/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Selecciona una opcion
                    </option>
                    <option value="web">Sitio web</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="automations">Automatizaciones</option>
                    <option value="unsure">No lo tengo claro aun</option>
                  </select>
                  {errors.service && <span className="text-red-400 text-xs">{errors.service.message}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-crema/60 text-xs font-body uppercase tracking-wider">
                  Contanos tu proyecto *
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={4}
                  className="bg-negro-mid border border-grafito/20 rounded-lg px-4 py-3 text-crema text-sm placeholder:text-grafito/40 focus:outline-none focus:border-oro-clave/50 transition-colors resize-none"
                  placeholder="Conta brevemente tu proyecto, negocio y que estas buscando..."
                />
                {errors.message && <span className="text-red-400 text-xs">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center text-center mt-2"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Enviando..." : cta.primary}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  Hubo un error al enviar. Intenta de nuevo.
                </p>
              )}
            </motion.form>
          )}
        </div>
      </div>
    </section>
  )
}
