import { siteConfig } from "@/lib/site"

interface BlogPostingJsonLdInput {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified: string
}

export function createBlogPostingJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: BlogPostingJsonLdInput) {
  const url = `${siteConfig.url}${path}`
  const organization = {
    "@type": "Organization",
    "@id": siteConfig.url,
    name: siteConfig.name,
    url: siteConfig.url,
  }

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    mainEntityOfPage: url,
    image: `${siteConfig.url}/opengraph-image`,
    datePublished,
    dateModified,
    inLanguage: "es",
    author: organization,
    publisher: organization,
  }
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}
