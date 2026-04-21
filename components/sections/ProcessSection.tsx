const STEPS = [
  {
    number: "01",
    title: "Descubrimiento",
    days: "Día 1-2",
    description:
      "Nos reunimos para entender tu negocio, tus clientes y tus objetivos. Sin tecnicismos, sin formularios infinitos.",
  },
  {
    number: "02",
    title: "Propuesta",
    days: "Día 3-5",
    description:
      "Te presentamos el plan completo: diseño, funcionalidades, plazos y precio. Todo claro, sin letra chica.",
  },
  {
    number: "03",
    title: "Construcción",
    days: "Día 6-18",
    description:
      "Desarrollamos tu proyecto con actualizaciones cada 3 días. Vos aprobás cada etapa antes de avanzar.",
  },
  {
    number: "04",
    title: "Lanzamiento",
    days: "Día 18-21",
    description:
      "Publicamos, verificamos que todo funcione perfecto y te capacitamos para manejarlo vos mismo.",
  },
]

export function ProcessSection() {
  return (
    <section id="proceso" className="section-padding overflow-hidden bg-crema">
      <div className="container-clave">
        <div className="mb-16 text-center lg:mb-24">
          <span className="mb-4 block font-body text-sm font-medium uppercase tracking-widest text-oro-clave">
            Proceso
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight text-negro-clave">
            De la idea al lanzamiento
            <br />
            <span className="italic text-oro-clave">en 21 días.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="rounded-xl border border-negro-clave/5 bg-white/60 p-6 backdrop-blur-sm transition-colors hover:border-oro-clave/20 lg:p-8"
            >
              <div className="mb-4 flex items-center gap-3 lg:justify-center">
                <span className="font-mono text-xs font-medium text-oro-clave">{step.number}</span>
                <span className="rounded-full bg-negro-clave/5 px-2.5 py-1 text-xs text-grafito">
                  {step.days}
                </span>
              </div>
              <h3 className="mb-3 font-display text-xl font-normal text-negro-clave lg:text-center lg:text-2xl">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-grafito lg:text-center">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
