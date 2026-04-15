import type { Metadata } from "next"
import { siteConfig } from "@/lib/site"
import { hubUruguayContent } from "@/lib/content"
import { ServiceHubSection } from "@/components/uruguay/ServiceHubSection"
import { CTASection } from "@/components/uruguay/CTASection"
import { FAQSection } from "@/components/uruguay/FAQSection"
import { InternalLinks } from "@/components/uruguay/InternalLinks"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { serializeJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: hubUruguayContent.title,
  description: hubUruguayContent.description,
  alternates: { canonical: `${siteConfig.url}${siteConfig.routes.agenciaDigitalUruguay}` },
  openGraph: {
    title: hubUruguayContent.title,
    description: hubUruguayContent.description,
    url: `${siteConfig.url}${siteConfig.routes.agenciaDigitalUruguay}`,
    images: [
      {
        url: "/agencia-digital-uruguay/opengraph-image",
        width: 1200,
        height: 630,
        alt: hubUruguayContent.h1,
      },
    ],
  },
  twitter: {
    title: hubUruguayContent.title,
    description: hubUruguayContent.description,
    images: ["/agencia-digital-uruguay/opengraph-image"],
  },
}

export default function AgenciaDigitalUruguayPage() {
  const content = hubUruguayContent
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: content.h1,
        item: `${siteConfig.url}${siteConfig.routes.agenciaDigitalUruguay}`,
      },
    ],
  }

  return (
    <div className="bg-negro-clave min-h-screen">
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding pb-20">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-oro-clave/10 border border-oro-clave/20 text-oro-clave text-sm font-body mb-6">
                {content.hero.eyebrow}
              </span>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-light tracking-tight mb-4">
                {content.h1}
              </h1>
              <p className="text-crema/90 text-xl lg:text-2xl font-light mb-4">{content.hero.title}</p>
              <p className="text-grafito text-lg lg:text-xl max-w-[640px] leading-relaxed font-light">
                {content.hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        <ServiceHubSection services={content.services} />

        <section className="bg-negro-mid py-20">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-crema font-light mb-12">
                Por que trabajar con un estudio con foco en Uruguay
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.whyUruguay.map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="text-oro-clave text-xl mt-0.5 shrink-0">*</span>
                    <p className="text-grafito leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-crema py-20">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-negro-clave font-light mb-4">
                Nuestro proceso
              </h2>
              <p className="text-grafito text-lg mb-12">De la idea al lanzamiento con una hoja de ruta clara.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.process.map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <span className="font-mono text-oro-clave/60 text-sm shrink-0 mt-1">{step.step}</span>
                    <p className="text-negro-clave/80 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-negro-mid py-20">
          <div className="container-clave">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-crema font-light mb-12">
                Casos que muestran el tipo de trabajo que hacemos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.cases.map((caseItem) => (
                  <div key={caseItem.client} className="bg-negro-clave/50 border border-grafito/10 rounded-xl p-6">
                    <span className="px-3 py-1 rounded-full bg-oro-clave/10 text-oro-clave text-xs mb-4 inline-block">
                      {caseItem.category}
                    </span>
                    <h3 className="font-display text-xl text-crema mb-2">{caseItem.client}</h3>
                    <p className="text-grafito text-sm leading-relaxed">{caseItem.result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <InternalLinks links={content.internalLinks} />
        <FAQSection faqs={content.faq} />
        <CTASection cta={content.cta} />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
    </div>
  )
}
