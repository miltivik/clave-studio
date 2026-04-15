"use client"

import { StaggerTestimonials, type TestimonialItem } from "@/components/ui/stagger-testimonials"

const RAW_TESTIMONIALS = [
  {
    quote:
      "Clave nos armó la tienda online en 3 semanas. En el primer mes ya habíamos recuperado la inversión.",
    name: "Valentina R.",
    role: "Dueña de tienda de ropa",
    location: "Buenos Aires",
    imgSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
  },
  {
    quote:
      "Por fin tengo una web que me da vergüenza enseñar... ¡de lo buena que quedó! Y aparezco primero en Google.",
    name: "Marcos T.",
    role: "Arquitecto",
    location: "Montevideo",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
  },
  {
    quote:
      "Las automatizaciones nos ahorraron contratar un asistente. El seguimiento de clientes ahora es automático.",
    name: "Carolina M.",
    role: "Consultora de RRHH",
    location: "Santiago",
    imgSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop"
  },
  {
    quote:
      "Intenté con dos agencias antes. Con Clave fue la primera vez que me explicaron todo sin tecnicismos y cumplieron los plazos.",
    name: "Diego F.",
    role: "Dueño de restaurante",
    location: "Bogotá",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    quote:
      "Nuestra tienda Shopify ahora vende sola. Los emails automáticos post-compra nos generan el 30% de las recomendaciones.",
    name: "Luciana P.",
    role: "E-commerce de cosméticos",
    location: "CABA",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    quote:
      "En menos de un mes teníamos la web funcionando y ya estaban llegando consultas desde Google. Impresionante.",
    name: "Andrés G.",
    role: "Fundador de startup",
    location: "Medellín",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop"
  },
]

// Mapeamos los datos limpios al formato que requiere el componente de UI
const formattedTestimonials: TestimonialItem[] = RAW_TESTIMONIALS.map((t) => ({
  testimonial: t.quote,
  by: `${t.name}, ${t.role}`,
  imgSrc: t.imgSrc,
}))

export function TestimonialsSection() {
  return (
    <section className="bg-crema section-padding overflow-hidden">
      <div className="container-clave mb-12 lg:mb-16">
        <div className="text-center">
          <span className="text-oro-clave font-body text-sm font-medium tracking-widest uppercase mb-4 block">
            Testimonios
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-negro-clave font-light leading-tight">
            Lo que dicen nuestros{" "}
            <span className="text-oro-clave italic">clientes.</span>
          </h2>
        </div>
      </div>

      {/* JSON-LD for Professional Service and Reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Clave Studio Digital",
            image: "https://clave.studio/logo-3d.svg",
            url: "https://clave.studio",
            telephone: "",
            address: {
              "@type": "PostalAddress",
              "addressLocality": "LATAM",
              "addressCountry": "AR"
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: RAW_TESTIMONIALS.length.toString(),
            },
            review: RAW_TESTIMONIALS.map((t) => ({
              "@type": "Review",
              author: {
                "@type": "Person",
                name: t.name,
              },
              reviewBody: t.quote,
              reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
              },
            })),
          }),
        }}
      />

      <div className="flex flex-col gap-6">
        {/* Aquí insertamos el componente importado desde /components/ui */}
        <StaggerTestimonials testimonials={formattedTestimonials} />
      </div>
    </section>
  )
}
