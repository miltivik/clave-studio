import type { Metadata } from "next"
import { siteConfig } from "@/lib/site"
import { ecommerceContent } from "@/lib/content"
import { ServicePageComponent } from "@/components/uruguay/ServicePageComponent"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { createFaqJsonLd, serializeJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: ecommerceContent.title,
  description: ecommerceContent.description,
  alternates: { canonical: `${siteConfig.url}${siteConfig.routes.ecommerceUruguay}` },
  openGraph: {
    title: ecommerceContent.title,
    description: ecommerceContent.description,
    url: `${siteConfig.url}${siteConfig.routes.ecommerceUruguay}`,
    images: [
      {
        url: "/ecommerce-uruguay/opengraph-image",
        width: 1200,
        height: 630,
        alt: ecommerceContent.h1,
      },
    ],
  },
  twitter: {
    title: ecommerceContent.title,
    description: ecommerceContent.description,
    images: ["/ecommerce-uruguay/opengraph-image"],
  },
}

export default function EcommerceUruguayPage() {
  const content = ecommerceContent
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.url}/servicios` },
      { "@type": "ListItem", position: 3, name: content.h1, item: `${siteConfig.url}${siteConfig.routes.ecommerceUruguay}` },
    ],
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.h1,
    description: content.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "Uruguay",
    serviceType: "E-commerce",
  }

  const jsonLd = [breadcrumbJsonLd, serviceJsonLd, createFaqJsonLd(content.faq)]

  return (
    <>
      <Navbar />
      <ServicePageComponent
        h1={content.h1}
        eyebrow={content.hero.eyebrow}
        heroTitle={content.hero.title}
        heroSubtitle={content.hero.subtitle}
        problems={content.problems}
        results={content.results}
        deliverables={content.deliverables}
        stack={content.stack}
        process={content.process}
        caseStudy={content.caseStudy}
        faq={content.faq}
        cta={content.cta}
        internalLinks={content.internalLinks}
      />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
    </>
  )
}
