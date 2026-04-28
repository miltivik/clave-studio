import { SmartLink } from "@/components/ui/SmartLink"
import { HeroVisualGate } from "@/components/sections/HeroVisualGate"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-negro-clave pt-[72px]"
    >
      <div className="container-clave grid grid-cols-1 items-center gap-8 py-10 pb-20 sm:py-12 sm:pb-24 lg:grid-cols-2 lg:gap-4 lg:py-0">
        <div className="order-1 flex flex-col gap-6 lg:order-1 lg:gap-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-oro-clave/20 bg-oro-clave/10 px-4 py-2 text-sm font-body text-oro-clave">
              Clave Studio · LATAM
            </span>
          </div>

          <h1
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-tight"
          >
            Tu próxima venta
            <br />
            empieza con una web
            <br />
            que <span className="font-normal italic text-oro-clave">convierte.</span>
          </h1>

          <p className="max-w-[520px] text-lg font-light leading-relaxed text-grafito lg:text-xl">
            Creamos sitios web, tiendas online y automatizaciones para pymes en LATAM. Rápidas,
            visibles en Google y pensadas para convertir.
          </p>

          <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <SmartLink
              sectionId="contacto"
              className="btn-primary w-full justify-center whitespace-normal text-center sm:w-auto sm:whitespace-nowrap"
            >
              Quiero una web que venda →
            </SmartLink>
            <SmartLink
              href="/servicios"
              className="btn-secondary w-full justify-center whitespace-normal text-center sm:w-auto sm:whitespace-nowrap"
            >
              Ver servicios
            </SmartLink>
          </div>
        </div>

        <div className="order-2 hidden md:block lg:order-2">
          <HeroVisualGate />
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-grafito md:flex"
      >
        <span className="text-xs uppercase tracking-widest">Scroll para descubrir</span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="animate-bounce"
        >
          <path d="M8 4 L8 16 M3 12 L8 18 L13 12" />
        </svg>
      </div>
    </section>
  )
}
