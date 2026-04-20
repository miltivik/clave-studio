"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactFormData } from "@/lib/validations"
import { Logo } from "@/components/Logo"
import { useHasMounted } from "@/hooks/useHasMounted"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReducedMotion } from "@/hooks/useReducedMotion"

gsap.registerPlugin(ScrollTrigger)

export function CTAFinal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const keyRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const hasMounted = useHasMounted()
  const isMobile = useMediaQuery("(max-width: 767px)")
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = !hasMounted || isMobile || prefersReducedMotion

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  useEffect(() => {
    if (shouldReduceMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      if (keyRef.current) {
        gsap.to(keyRef.current, {
          rotate: 360,
          duration: 30,
          repeat: -1,
          ease: "none",
        })

        gsap.fromTo(
          keyRef.current,
          { scale: 0.8 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [shouldReduceMotion])

  const onSubmit = async (data: ContactFormData) => {
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
    <section
      id="contacto"
      ref={sectionRef}
      className="relative overflow-hidden bg-negro-clave section-padding"
    >
      <div
        ref={keyRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
      >
        <Logo size={600} />
      </div>

      <div className="container-clave relative z-10 mx-auto max-w-[720px]">
        <motion.div
          className="mb-12 text-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
          viewport={shouldReduceMotion ? undefined : { once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
        >
          <span className="mb-4 block text-sm font-medium uppercase tracking-widest text-oro-clave">
            Hablemos
          </span>
          <h2 className="mb-4 font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-tight">
            Abrimos las puertas
            <br />
            <span className="text-oro-clave italic">de tu mundo digital.</span>
          </h2>
          <p className="mx-auto max-w-[480px] text-lg text-grafito">
            Contanos tu proyecto. Te respondemos en menos de 24 horas con una propuesta clara y
            sin compromiso.
          </p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            className="py-16 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-oro-clave/10">
              <svg
                className="h-8 w-8 text-oro-clave"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mb-2 font-display text-2xl text-crema">Mensaje enviado</h3>
            <p className="text-grafito">Te respondemos en menos de 24 horas.</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            animate={shouldReduceMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={shouldReduceMotion ? undefined : { once: true }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.2,
            }}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-wider text-crema/60"
                >
                  Nombre completo *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="rounded-lg border border-grafito/20 bg-negro-mid px-4 py-3 text-sm text-crema transition-colors placeholder:text-grafito/40 focus:border-oro-clave/50 focus:outline-none"
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <span className="text-xs text-red-400">{errors.name.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-wider text-crema/60"
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="rounded-lg border border-grafito/20 bg-negro-mid px-4 py-3 text-sm text-crema transition-colors placeholder:text-grafito/40 focus:border-oro-clave/50 focus:outline-none"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <span className="text-xs text-red-400">{errors.email.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="whatsapp"
                  className="text-xs uppercase tracking-wider text-crema/60"
                >
                  WhatsApp (opcional)
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  {...register("whatsapp")}
                  className="rounded-lg border border-grafito/20 bg-negro-mid px-4 py-3 text-sm text-crema transition-colors placeholder:text-grafito/40 focus:border-oro-clave/50 focus:outline-none"
                  placeholder="+598 92 395 129"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="service"
                  className="text-xs uppercase tracking-wider text-crema/60"
                >
                  Que necesitas? *
                </label>
                <select
                  id="service"
                  {...register("service")}
                  className="cursor-pointer appearance-none rounded-lg border border-grafito/20 bg-negro-mid px-4 py-3 text-sm text-crema transition-colors focus:border-oro-clave/50 focus:outline-none"
                >
                  <option value="" disabled>
                    Selecciona una opcion
                  </option>
                  <option value="web">Sitio web</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="automations">Automatizaciones</option>
                  <option value="unsure">No se bien</option>
                </select>
                {errors.service && (
                  <span className="text-xs text-red-400">{errors.service.message}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-wider text-crema/60"
              >
                Contanos tu proyecto *
              </label>
              <textarea
                id="message"
                {...register("message")}
                rows={4}
                className="resize-none rounded-lg border border-grafito/20 bg-negro-mid px-4 py-3 text-sm text-crema transition-colors placeholder:text-grafito/40 focus:border-oro-clave/50 focus:outline-none"
                placeholder="Describi brevemente tu proyecto, negocio y que estas buscando..."
              />
              {errors.message && (
                <span className="text-xs text-red-400">{errors.message.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary mt-2 w-full justify-center text-center"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Enviando..." : "Enviar mensaje ->"}
            </button>

            {status === "error" && (
              <p className="text-center text-sm text-red-400">
                Hubo un error al enviar. Intenta de nuevo.
              </p>
            )}
          </motion.form>
        )}
      </div>
    </section>
  )
}
