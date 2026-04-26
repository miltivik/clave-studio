"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Logo } from "@/components/Logo"
import { ContactFormFields } from "@/components/contact/ContactFormFields"
import { ContactSuccess } from "@/components/contact/ContactSuccess"
import { useHasMounted } from "@/hooks/useHasMounted"
import { useContactForm } from "@/hooks/useContactForm"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReducedMotion } from "@/hooks/useReducedMotion"

gsap.registerPlugin(ScrollTrigger)

export function CTAFinal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const keyRef = useRef<HTMLDivElement>(null)
  const hasMounted = useHasMounted()
  const isMobile = useMediaQuery("(max-width: 767px)")
  const prefersReducedMotion = useReducedMotion()
  const shouldReduceMotion = !hasMounted || isMobile || prefersReducedMotion
  const {
    errors,
    formMessage,
    isSubmitDisabled,
    register,
    status,
    submitContactForm,
    turnstileRenderKey,
    turnstileSiteKey,
    turnstileToken,
    handleTurnstileError,
    handleTurnstileExpire,
    handleTurnstileVerify,
  } = useContactForm()

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
            <ContactSuccess />
          </motion.div>
        ) : (
          <motion.form
            onSubmit={submitContactForm}
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
            <ContactFormFields
              register={register}
              errors={errors}
              status={status}
              submitLabel="Enviar mensaje ->"
              formMessage={formMessage}
              isSubmitDisabled={isSubmitDisabled}
              turnstileSiteKey={turnstileSiteKey}
              turnstileRenderKey={turnstileRenderKey}
              turnstileToken={turnstileToken}
              onTurnstileVerify={handleTurnstileVerify}
              onTurnstileExpire={handleTurnstileExpire}
              onTurnstileError={handleTurnstileError}
            />
          </motion.form>
        )}
      </div>
    </section>
  )
}
