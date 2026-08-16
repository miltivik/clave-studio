import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-05-21"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.services}`,
      lastModified: new Date("2026-04-28"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.about}`,
      lastModified: new Date("2026-05-21"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.blog}`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/blog/cuanto-cuesta-pagina-web-uruguay-2026`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/blog/shopify-vs-woocommerce-latam`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/blog/automatizaciones-pyme-uruguay`,
      lastModified: new Date("2026-05-12"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.agenciaDigitalLatam}`,
      lastModified: new Date("2026-08-16"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.desarrolloWebLatam}`,
      lastModified: new Date("2026-08-16"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.ecommerceLatam}`,
      lastModified: new Date("2026-08-16"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.automatizacionesLatam}`,
      lastModified: new Date("2026-08-16"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.agenciaDigitalUruguay}`,
      lastModified: new Date("2026-08-16"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.desarrolloWebUruguay}`,
      lastModified: new Date("2026-08-16"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.ecommerceUruguay}`,
      lastModified: new Date("2026-08-16"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.automatizacionesUruguay}`,
      lastModified: new Date("2026-08-16"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.privacy}`,
      lastModified: new Date("2026-05-03"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.terms}`,
      lastModified: new Date("2026-05-03"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
