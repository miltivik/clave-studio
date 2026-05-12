import type { Metadata } from "next"
import { siteConfig } from "@/lib/site"
import { ecommerceLatamContent } from "@/lib/content"
import { ServicePageComponent } from "@/components/uruguay/ServicePageComponent"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { serializeJsonLd } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: ecommerceLatamContent.title,
  description: ecommerceLatamContent.description,
  alternates: {
    canonical: `${siteConfig.url}${siteConfig.routes.ecommerceLatam}`,
    languages: {
      "es-419": `${siteConfig.url}${siteConfig.routes.ecommerceLatam}`,
      "es-UY": `${siteConfig.url}${siteConfig.routes.ecommerceUruguay}`,
      "x-default": `${siteConfig.url}${siteConfig.routes.ecommerceLatam}`,
    },
  },
  openGraph: {
    title: ecommerceLatamContent.title,
    description: ecommerceLatamContent.description,
    url: `${siteConfig.url}${siteConfig.routes.ecommerceLatam}`,
    images: [
      {
        url: "/ecommerce-latam/opengraph-image",
        width: 1200,
        height: 630,
        alt: ecommerceLatamContent.h1,
      },
    ],
  },
  twitter: {
    title: ecommerceLatamContent.title,
    description: ecommerceLatamContent.description,
    images: ["/ecommerce-latam/opengraph-image"],
  },
}

export default function EcommerceLatamPage() {
  const content = ecommerceLatamContent
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.url}/servicios` },
      { "@type": "ListItem", position: 3, name: content.h1, item: `${siteConfig.url}${siteConfig.routes.ecommerceLatam}` },
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
    areaServed: "Latin America",
    serviceType: "E-commerce",
  }

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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd([breadcrumbJsonLd, serviceJsonLd]) }}
      />
    </>
  )
}
