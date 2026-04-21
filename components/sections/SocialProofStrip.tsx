const METRICS = [
  "+40 proyectos entregados",
  "98% de clientes satisfechos",
  "Promedio de 18 días de entrega",
  "+USD 2M en ventas generadas para clientes",
]

export function SocialProofStrip() {
  const content = METRICS.map((metric, index) => (
    <div key={`${metric}-${index}`} className="flex items-center gap-8 px-8">
      <span className="whitespace-nowrap text-sm font-medium text-crema/80 lg:text-base">
        {metric}
      </span>
      <span className="text-lg text-oro-clave/40">◆</span>
    </div>
  ))

  return (
    <section className="overflow-hidden border-y border-grafito/10 bg-negro-mid py-6 lg:py-8">
      <div className="social-proof-marquee">
        <div className="social-proof-track">
          <div className="flex shrink-0 items-center">{content}</div>
          <div className="flex shrink-0 items-center">{content}</div>
        </div>
      </div>
    </section>
  )
}
