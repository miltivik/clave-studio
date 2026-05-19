import { siteConfig } from "@/lib/site"

export const dynamic = "force-static"

const expires = "2027-05-19T00:00:00.000Z"

export function GET() {
  const body = [
    `Contact: mailto:${siteConfig.email}`,
    `Expires: ${expires}`,
    "Preferred-Languages: es, en",
    `Canonical: ${siteConfig.url}/.well-known/security.txt`,
    "",
  ].join("\n")

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
