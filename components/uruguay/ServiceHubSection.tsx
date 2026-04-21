import Link from "next/link"

interface ServiceItem {
  title: string
  description: string
  href: string
}

interface ServiceHubSectionProps {
  services: ServiceItem[]
}

export function ServiceHubSection({ services }: ServiceHubSectionProps) {
  return (
    <section className="bg-negro-mid py-20">
      <div className="container-clave">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-crema font-light mb-12">
            Nuestros servicios en Uruguay
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-negro-clave/50 border border-grafito/10 rounded-xl p-6 hover:border-oro-clave/30 transition-all"
              >
                <h3 className="font-display text-xl text-crema mb-3 group-hover:text-oro-clave transition-colors">
                  {service.title}
                </h3>
                <p className="text-grafito text-sm leading-relaxed mb-4">{service.description}</p>
                <span className="text-oro-clave text-sm font-medium group-hover:underline">
                  Ver más
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
