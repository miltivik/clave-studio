# Uruguay-First SEO Design

## Goal

Increase qualified organic leads for Clave Studio Digital by treating Uruguay as the primary market and LATAM as a secondary regional market, without creating speculative country pages.

## Current State

The site already has a useful SEO foundation:

- 17 sitemap URLs return `200` in production.
- Important pages have self-referencing canonicals, one `h1`, metadata, and internal links.
- Regional service pages are indexed.
- The current SEO regression suite passes.
- A mobile Lighthouse run scored SEO 100 and performance 85, with LCP at 3.6 seconds, TBT at 80 milliseconds, and CLS at 0.027.

The main weaknesses are long or duplicated titles, unsupported `es-419` hreflang values in production, inaccurate sitemap modification dates, weak article markup and linking, indexed `?section=` navigation URLs, insufficient differentiation between Uruguay and LATAM service pages, and a mobile LCP delayed by font rendering.

## Search Architecture

Keep the existing routes and assign one primary intent to each group:

| Route group | Primary intent |
| --- | --- |
| `/` | Branded overview of web, e-commerce, and automation services |
| `/agencia-digital-uruguay` | Agencia digital Uruguay |
| Uruguay service pages | Development, e-commerce, and automation queries for Uruguay |
| `/agencia-digital-latam` | Agencia digital LATAM |
| LATAM service pages | Regional service queries for Spanish-speaking LATAM |
| Blog posts | Long-tail informational queries that support the relevant service page |

The homepage must not compete directly with either regional agency hub. Uruguay pages should use genuinely local operational details. LATAM pages should describe regional, multi-market needs rather than repeat Uruguay copy with different place names.

## Metadata

- Keep the full brand title on the homepage.
- Use a short `| Clave` title suffix for child pages.
- Remove brand text already embedded in child titles so the template cannot duplicate it.
- Keep every title descriptive and generally within the visible search-result range.
- Give each page a unique description that matches its search intent and visible content.
- Preserve existing self-referencing canonical URLs.
- Use `es` for generic Spanish LATAM pages, `es-UY` for Uruguay pages, and the LATAM page as `x-default`.
- Preserve reciprocal and self-referencing hreflang entries on each regional pair.

The pending worktree changes that replace `es-419` and remove artificial build-time `lastModified` values are part of the implementation and must be preserved.

## Content and Internal Links

- Keep the existing eight regional landing pages; do not add country or city pages.
- Strengthen Uruguay pages with concrete local wording already supported by the business, such as Uruguayan schedules, payments, commerce operations, and support expectations.
- Keep LATAM pages focused on Spanish-language support, distributed teams, multiple markets, payments, shipping, and scalable regional architecture.
- Remove the unsupported claim that professional web presence produces 40 percent more inquiries.
- Add related blog links to the existing `internalLinks` collections for service pages.
- Add contextual service links to each blog article near its conclusion.
- Keep commercial FAQ content visible, but do not add self-serving FAQ rich-result markup.

## Article Structured Data

Each of the three existing posts should expose one `BlogPosting` JSON-LD object through the existing `serializeJsonLd()` helper. The markup should contain only data visible or already known in the repository:

- headline and description;
- canonical URL;
- visible publication date;
- Clave Studio Digital as author and publisher;
- the existing Open Graph image;
- `inLanguage: es`.

Add a visible organization byline near each publication date. Do not invent person profiles, modification dates, ratings, or citations.

## Section Navigation

Replace internal `/?section=<id>` destinations with native `/#<id>` fragments. Keep the current controlled scrolling only where needed for header offset and deferred sections. Continue reading the legacy `section` query parameter as a fallback, but never generate it in new internal links.

This prevents new parameter URLs from being discovered through internal navigation while preserving current homepage behavior.

## Performance

The homepage H1 is the measured mobile LCP element. Reduce static Google Font variants by using the variable-font support already provided by `next/font`, while preserving the current families, styles, and CSS variables.

No animation rewrite, new performance dependency, or visual redesign is included. Re-run mobile Lighthouse under comparable conditions and keep the font change only if LCP improves without a visual regression.

## Deployment Boundary

The repository already configures a strong HSTS header, but production currently returns `Strict-Transport-Security: max-age=0`. Do not duplicate or alter the application header. Record Cloudflare HSTS as a deployment follow-up because it cannot be corrected from this repository alone.

The implementation does not include Search Console configuration, sitemap submission, DNS, Cloudflare changes, deployment, backlink campaigns, or guaranteed rankings.

## Files

Expected implementation should stay within existing files:

- `app/layout.tsx`
- `app/sitemap.ts`
- the eight regional page files
- the three blog article files
- `app/blog/page.tsx`, `app/servicios/page.tsx`, and `app/sobre-nosotros/page.tsx` where title duplication exists
- `components/ui/SmartLink.tsx`
- `lib/content.ts`
- `lib/site.ts`
- `scripts/seo-regression.test.mjs`

Use fewer files when a shared existing value or template fixes all callers safely.

## Verification

Extend the existing SEO regression test before production edits so it fails for the targeted regressions and then passes after implementation. Cover:

- supported reciprocal hreflang values;
- no artificial sitemap modification dates;
- no duplicated brand suffixes in child metadata;
- fragment-based section URLs;
- `BlogPosting` markup and visible bylines;
- removal of the unsupported 40 percent claim;
- contextual blog and service links;
- reduced font configuration without removing required font families.

Then run:

1. `pnpm test:seo`
2. `pnpm test:perf-tooling`
3. `pnpm lint`
4. `pnpm build`
5. Mobile Lighthouse against the production build

Inspect rendered titles, descriptions, canonicals, hreflang tags, and JSON-LD rather than relying only on source-text assertions.

## Success Criteria

- Uruguay has the strongest search hierarchy and internal-link support.
- LATAM retains a coherent secondary cluster without unsupported hreflang codes.
- Child titles are unique, concise, and contain one brand suffix.
- Blog posts support commercial pages with valid article markup and contextual links.
- New internal navigation does not generate query-parameter crawl targets.
- All verification commands pass and a comparable mobile Lighthouse run improves the 3.6-second LCP baseline.

## Deferred Work

Create country-specific pages, a larger editorial calendar, author profile pages, field performance telemetry, and backlink outreach only after Search Console data shows demand and prioritizes the opportunity.
