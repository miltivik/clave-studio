import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { ContactFormValues } from "@/lib/contact/schema"
import { TurnstileField } from "@/components/contact/TurnstileField"
import { PhoneInputField } from "@/components/contact/PhoneInputField"

interface ContactFormFieldsProps {
  register: UseFormRegister<ContactFormValues>
  errors: FieldErrors<ContactFormValues>
  status: "idle" | "submitting" | "success" | "error"
  submitLabel: string
  formMessage?: string
  isSubmitDisabled: boolean
  turnstileSiteKey: string
  turnstileRenderKey: number
  turnstileToken?: string
  onTurnstileVerify: (token: string) => void
  onTurnstileExpire: () => void
  onTurnstileError: () => void
}

const fieldBaseClass =
  "h-12 px-4 text-sm leading-none text-crema placeholder:text-grafito/40 bg-negro-mid border border-grafito/20 rounded-lg transition-colors focus-visible:border-oro-clave/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oro-clave/60"

const textareaBaseClass =
  "px-4 pt-3 pb-3 text-sm leading-5 text-crema placeholder:text-grafito/40 bg-negro-mid border border-grafito/20 rounded-lg transition-colors focus-visible:border-oro-clave/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oro-clave/60 resize-none"

export function ContactFormFields({
  register,
  errors,
  status,
  submitLabel,
  formMessage,
  isSubmitDisabled,
  turnstileSiteKey,
  turnstileRenderKey,
  turnstileToken,
  onTurnstileVerify,
  onTurnstileExpire,
  onTurnstileError,
}: ContactFormFieldsProps) {
  const isTurnstileLoading = Boolean(turnstileSiteKey && !turnstileToken && status !== "submitting")

  return (
    <>
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">No completar</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <input type="hidden" {...register("sourcePath")} />
      <input type="hidden" {...register("utmSource")} />
      <input type="hidden" {...register("utmMedium")} />
      <input type="hidden" {...register("utmCampaign")} />
      <input type="hidden" {...register("utmTerm")} />
      <input type="hidden" {...register("utmContent")} />
      <input type="hidden" {...register("referrer")} />
      <input type="hidden" {...register("turnstileToken")} />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs uppercase tracking-wider text-crema/60">
            Nombre completo *
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            {...register("name")}
            className={fieldBaseClass}
            placeholder="Tu nombre"
          />
          {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs uppercase tracking-wider text-crema/60">
            Email *
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className={fieldBaseClass}
            placeholder="tu@email.com"
          />
          {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <PhoneInputField register={register} errors={errors} />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="service" className="text-xs uppercase tracking-wider text-crema/60">
            ¿Qué necesitas? *
          </label>
          <select
            id="service"
            {...register("service")}
            className={`${fieldBaseClass} appearance-none`}
            defaultValue=""
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="web">Sitio web</option>
            <option value="ecommerce">E-commerce</option>
            <option value="automations">Automatizaciones</option>
            <option value="unsure">No lo tengo claro aun</option>
          </select>
          {errors.service && (
            <span className="text-xs text-red-400">{errors.service.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs uppercase tracking-wider text-crema/60">
          Cuéntanos tu proyecto *
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={4}
          className={textareaBaseClass}
          placeholder="Describe brevemente tu proyecto, negocio y qué estás buscando…"
        />
        {errors.message && <span className="text-xs text-red-400">{errors.message.message}</span>}
      </div>

      <TurnstileField
        siteKey={turnstileSiteKey}
        renderKey={turnstileRenderKey}
        errorMessage={errors.turnstileToken?.message}
        onVerify={onTurnstileVerify}
        onExpire={onTurnstileExpire}
        onError={onTurnstileError}
      />

      {isTurnstileLoading && (
        <p className="text-xs text-grafito" aria-live="polite">
          Cargando verificación de seguridad…
        </p>
      )}

      <button
        type="submit"
        className="btn-primary mt-2 w-full justify-center text-center"
        disabled={isSubmitDisabled}
      >
        {status === "submitting" ? "Enviando…" : submitLabel}
      </button>

      {status === "error" && formMessage && (
        <p className="text-center text-sm text-red-400" role="alert">
          {formMessage}
        </p>
      )}
    </>
  )
}
