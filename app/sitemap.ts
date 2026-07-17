import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.services}`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.about}`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.blog}`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/blog/cuanto-cuesta-pagina-web-uruguay-2026`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/blog/shopify-vs-woocommerce-latam`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/blog/automatizaciones-pyme-uruguay`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.agenciaDigitalLatam}`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.desarrolloWebLatam}`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.ecommerceLatam}`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.automatizacionesLatam}`,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.agenciaDigitalUruguay}`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.desarrolloWebUruguay}`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.ecommerceUruguay}`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.automatizacionesUruguay}`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.privacy}`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}${siteConfig.routes.terms}`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
