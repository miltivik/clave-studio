"use client"

import { motion } from "framer-motion"
import { ContactFormFields } from "@/components/contact/ContactFormFields"
import { ContactSuccess } from "@/components/contact/ContactSuccess"
import { useContactForm } from "@/hooks/useContactForm"

interface CTASectionProps {
  cta: {
    primary: string
    secondary: string
  }
}

export function CTASection({ cta }: CTASectionProps) {
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

  return (
    <section id="contacto" className="border-t border-grafito/10 bg-negro-clave py-20">
      <div className="container-clave">
        <div className="mx-auto max-w-[720px]">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 font-display text-[clamp(2rem,5vw,3.8rem)] font-light leading-tight">
              {cta.primary}
            </h2>
            <p className="mx-auto max-w-[480px] text-lg text-grafito">
              Contanos tu proyecto. Te respondemos en menos de 24 horas con una propuesta clara.
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactFormFields
                register={register}
                errors={errors}
                status={status}
                submitLabel={cta.primary}
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
      </div>
    </section>
  )
}
