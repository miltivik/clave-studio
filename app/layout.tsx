import type { Metadata } from "next"
import { Cormorant, Jost, JetBrains_Mono } from "next/font/google"
import { siteConfig } from "@/lib/site"
import { serializeJsonLd } from "@/lib/structured-data"
import "./globals.css"

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
})

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: "%s | Clave Studio Digital",
  },
  description: siteConfig.defaultDescription,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  icons: {
    icon: "/logo-3d.svg",
    apple: "/logo-3d.svg",
    shortcut: "/logo-3d.svg",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.ogDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Clave Studio Digital - Agencia digital en Uruguay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.ogDescription,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: siteConfig.url },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.defaultDescription,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo-3d.svg`,
    areaServed: ["Uruguay", "LATAM"],
    availableLanguage: "Spanish",
    serviceType: ["Web Development", "E-commerce", "Business Automation"],
    priceRange: "$$",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      availableLanguage: "Spanish",
    },
  }

  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${jost.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
