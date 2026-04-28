import { CTASection } from "@/components/uruguay/CTASection"
import { FAQSection } from "@/components/uruguay/FAQSection"
import { InternalLinks } from "@/components/uruguay/InternalLinks"

interface ServicePageProps {
  h1: string
  eyebrow: string
  heroTitle: string
  heroSubtitle: string
  problems: string[]
  results: string[]
  deliverables: string[]
  stack: string[]
  process: { step: string; description: string }[]
  caseStudy: {
    client: string
    result: string
    category: string
    services: string[]
  } | null
  faq: { question: string; answer: string }[]
  cta: { primary: string; secondary: string }
  internalLinks: { label: string; href: string }[]
}

export function ServicePageComponent({
  h1,
  eyebrow,
  heroTitle,
  heroSubtitle,
  problems,
  results,
  deliverables,
  stack,
  process,
  caseStudy,
  faq,
  cta,
  internalLinks,
}: ServicePageProps) {
  return (
    <main className="bg-negro-clave min-h-screen">
      <section className="section-padding pb-20">
        <div className="container-clave">
          <div className="max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-oro-clave/10 border border-oro-clave/20 text-oro-clave text-sm font-body mb-6">
              {eyebrow}
            </span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-light tracking-tight mb-4">
              {h1}
            </h1>
            <p className="text-crema/90 text-xl lg:text-2xl font-light mb-4">{heroTitle}</p>
            <p className="text-grafito text-lg lg:text-xl max-w-[640px] leading-relaxed font-light">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-negro-mid py-20">
        <div className="container-clave">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-crema font-light mb-8">
              El problema
            </h2>
            <div className="space-y-4">
              {problems.map((problem) => (
                <div key={problem} className="flex items-start gap-4">
                  <span className="text-oro-clave text-xl mt-0.5 shrink-0">-</span>
                  <p className="text-grafito leading-relaxed">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-crema py-20">
        <div className="container-clave">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-negro-clave font-light mb-8">
              El resultado
            </h2>
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result} className="flex items-start gap-4">
                  <span className="text-oro-clave text-xl mt-0.5 shrink-0">+</span>
                  <p className="text-negro-clave/80 leading-relaxed">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-negro-mid py-20">
        <div className="container-clave">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-crema font-light mb-8">
              Que vas a recibir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deliverables.map((item) => (
                <div key={item} className="flex items-start gap-4 bg-negro-clave/30 rounded-lg p-4">
                  <span className="text-oro-clave shrink-0 mt-0.5">*</span>
                  <p className="text-grafito text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-negro-clave py-16 border-y border-grafito/10">
        <div className="container-clave">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] text-crema font-light mb-8">
              Tecnologias que usamos
            </h2>
            <div className="flex flex-wrap gap-3">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full border border-oro-clave/20 text-oro-clave/80 text-sm font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-crema py-20">
        <div className="container-clave">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-negro-clave font-light mb-8">
              Proceso y plazos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {process.map((step) => (
                <div key={step.step} className="flex items-start gap-4">
                  <span className="font-mono text-oro-clave/60 text-sm shrink-0 mt-1">{step.step}</span>
                  <p className="text-negro-clave/80 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {caseStudy && (
        <section className="bg-negro-clave py-20 border-y border-grafito/10">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto">
              <span className="text-oro-clave font-body text-sm font-medium tracking-widest uppercase mb-4 block">
                Caso de exito
              </span>
              <div className="bg-negro-mid/50 rounded-xl p-8 border border-grafito/10">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-oro-clave/10 text-oro-clave text-xs">
                    {caseStudy.category}
                  </span>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl text-crema mb-2">
                  {caseStudy.client}
                </h3>
                <p className="text-grafito mb-6">{caseStudy.result}</p>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.services.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 rounded-md bg-crema/5 text-grafito text-xs font-mono"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <InternalLinks links={internalLinks} />
      <FAQSection faqs={faq} />
      <CTASection cta={cta} />
    </main>
  )
}
