# Uruguay-First SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve qualified organic acquisition in Uruguay while retaining a differentiated secondary LATAM cluster.

**Architecture:** Keep the existing App Router pages and content objects. Fix shared metadata at `siteConfig` and the root layout, keep route-specific intent in `lib/content.ts`, reuse the current JSON-LD serializer for article markup, and preserve the existing controlled section scrolling while changing generated destinations to fragments.

**Tech Stack:** Next.js 16.2.2 App Router, React 19.2.4, TypeScript, Node test runner, Next Metadata API, JSON-LD, Lighthouse 13.

## Global Constraints

- Uruguay is the primary market; LATAM is secondary.
- Keep the existing eight regional landing pages.
- Do not add country or city pages, dependencies, analytics, or Search Console integration.
- Preserve the user's pending `es-419` to `es` hreflang changes and sitemap cleanup.
- Use `es`, `es-UY`, and `x-default` as the regional hreflang set.
- Do not add FAQ or review rich-result markup to commercial pages.
- Do not invent people, dates, ratings, addresses, results, or citations.
- Generate fragment section URLs, but continue reading legacy `?section=` URLs.
- Keep the font change only if a comparable mobile Lighthouse run improves the 3.6-second LCP baseline without a visual regression.
- Do not change `next.config.ts`; Cloudflare HSTS remains an external follow-up.
- Preserve unrelated portfolio screenshots and all unrelated worktree changes.

## File Map

- `lib/site.ts`: homepage metadata and shared brand/site values.
- `app/layout.tsx`: child title template, shared metadata, and font loading.
- `lib/content.ts`: regional page titles, descriptions, and contextual links.
- Eight `app/*-(uruguay|latam)/page.tsx` files: existing reciprocal hreflang declarations.
- `app/sitemap.ts`: canonical URL list without artificial modification dates.
- `app/blog/page.tsx`, `app/servicios/page.tsx`, `app/sobre-nosotros/page.tsx`: concise child metadata.
- Three `app/blog/*/page.tsx` files: article metadata, visible bylines, JSON-LD, claims, and service links.
- `lib/structured-data.ts`: JSON-LD serialization and the shared `BlogPosting` builder.
- `components/ui/SmartLink.tsx`: fragment generation and legacy query fallback.
- `scripts/seo-regression.test.mjs`: source-level regression checks.

---

### Task 1: Regional Metadata and Sitemap Signals

**Files:**

- Modify: `scripts/seo-regression.test.mjs`
- Modify: `lib/site.ts`
- Modify: `app/layout.tsx`
- Modify: `lib/content.ts`
- Modify: `app/blog/page.tsx`
- Modify: `app/servicios/page.tsx`
- Modify: `app/sobre-nosotros/page.tsx`
- Modify: `app/blog/cuanto-cuesta-pagina-web-uruguay-2026/page.tsx`
- Modify: `app/blog/shopify-vs-woocommerce-latam/page.tsx`
- Modify: `app/blog/automatizaciones-pyme-uruguay/page.tsx`
- Preserve: `app/agencia-digital-latam/page.tsx`
- Preserve: `app/agencia-digital-uruguay/page.tsx`
- Preserve: `app/automatizaciones-latam/page.tsx`
- Preserve: `app/automatizaciones-uruguay/page.tsx`
- Preserve: `app/desarrollo-web-latam/page.tsx`
- Preserve: `app/desarrollo-web-uruguay/page.tsx`
- Preserve: `app/ecommerce-latam/page.tsx`
- Preserve: `app/ecommerce-uruguay/page.tsx`
- Preserve: `app/sitemap.ts`

**Interfaces:**

- Consumes: static `siteConfig` values and the current `Metadata` exports.
- Produces: one short child title template, unique intent-aligned page titles, reciprocal supported hreflang values, and a sitemap without false `lastModified` values.

- [ ] **Step 1: Add failing title regression tests**

Add this helper after `read()` in `scripts/seo-regression.test.mjs`:

```js
function firstTitle(source) {
  const match = source.match(/\btitle:\s*"([^"]+)"/);
  assert.ok(match, "Missing static metadata title");
  return match[1];
}
```

Add these tests after the sitemap tests:

```js
test("child metadata relies on one short brand suffix", () => {
  const expectedTitles = new Map([
    ["app/blog/page.tsx", "Blog"],
    ["app/servicios/page.tsx", "Servicios Digitales para Pymes"],
    ["app/sobre-nosotros/page.tsx", "Sobre Nosotros"],
    [
      "app/blog/cuanto-cuesta-pagina-web-uruguay-2026/page.tsx",
      "Cuánto cuesta una página web en Uruguay en 2026",
    ],
    ["app/blog/shopify-vs-woocommerce-latam/page.tsx", "Shopify vs WooCommerce en LATAM 2026"],
    [
      "app/blog/automatizaciones-pyme-uruguay/page.tsx",
      "5 automatizaciones para pymes en Uruguay",
    ],
  ]);

  for (const [page, expectedTitle] of expectedTitles) {
    assert.equal(firstTitle(read(page)), expectedTitle);
  }

  assert.match(read("app/layout.tsx"), /template:\s*"%s \| Clave"/);
});

test("regional metadata titles map one concise query to each page", () => {
  const source = read("lib/content.ts");
  const expectedTitles = [
    "Agencia Digital Uruguay para Pymes",
    "Agencia Digital para Pymes en LATAM",
    "Desarrollo Web Uruguay para Pymes",
    "Desarrollo Web para Pymes en LATAM",
    "E-commerce Uruguay para Pymes",
    "E-commerce para Pymes en LATAM",
    "Automatizaciones para Pymes en Uruguay",
    "Automatizaciones para Pymes en LATAM",
  ];

  for (const title of expectedTitles) {
    assert.match(source, new RegExp(`title:\\s*"${title}"`));
  }
});
```

- [ ] **Step 2: Run the SEO suite and verify RED**

Run:

```powershell
pnpm test:seo
```

Expected: the two new metadata tests fail because child titles contain embedded brand text, the layout uses the long suffix, and regional titles contain multiple intents.

- [ ] **Step 3: Apply the shared homepage and child metadata values**

Use these exact shared values in `lib/site.ts`:

```ts
defaultTitle: "Clave Studio Digital | Web y Automatización para Pymes",
defaultDescription:
  "Estudio digital para pymes en Uruguay. Creamos sitios web, tiendas online y automatizaciones con foco en ventas, velocidad y crecimiento regional.",
ogDescription:
  "Desarrollo web, e-commerce y automatizaciones para pymes, con foco principal en Uruguay y alcance para toda Latinoamérica.",
```

Change only the template in `app/layout.tsx`:

```ts
title: {
  default: siteConfig.defaultTitle,
  template: "%s | Clave",
},
```

Set these top-level `metadata.title` values:

| File | Title |
| --- | --- |
| `app/blog/page.tsx` | `Blog` |
| `app/servicios/page.tsx` | `Servicios Digitales para Pymes` |
| `app/sobre-nosotros/page.tsx` | `Sobre Nosotros` |
| `app/blog/cuanto-cuesta-pagina-web-uruguay-2026/page.tsx` | `Cuánto cuesta una página web en Uruguay en 2026` |
| `app/blog/shopify-vs-woocommerce-latam/page.tsx` | `Shopify vs WooCommerce en LATAM 2026` |
| `app/blog/automatizaciones-pyme-uruguay/page.tsx` | `5 automatizaciones para pymes en Uruguay` |

Keep Open Graph and Twitter titles independent; they do not inherit the root title template.

- [ ] **Step 4: Apply one intent per regional content object**

Use these exact top-level title and description pairs in `lib/content.ts`:

| Export | Title | Description |
| --- | --- | --- |
| `hubUruguayContent` | `Agencia Digital Uruguay para Pymes` | `Agencia digital en Uruguay para pymes. Creamos sitios web, e-commerce y automatizaciones con atención local, objetivos claros y soporte en español.` |
| `hubLatamContent` | `Agencia Digital para Pymes en LATAM` | `Agencia digital para pymes en LATAM. Desarrollamos sitios web, e-commerce y automatizaciones para equipos que venden y operan en varios mercados.` |
| `desarrolloWebContent` | `Desarrollo Web Uruguay para Pymes` | `Desarrollo web en Uruguay para pymes: sitios rápidos con Next.js, SEO técnico y foco en convertir visitas en consultas comerciales.` |
| `desarrolloWebLatamContent` | `Desarrollo Web para Pymes en LATAM` | `Desarrollo web para pymes en LATAM: sitios rápidos, SEO técnico y una base preparada para campañas y operaciones regionales.` |
| `ecommerceContent` | `E-commerce Uruguay para Pymes` | `Creamos tiendas online en Uruguay con catálogo claro, pagos, envíos y una experiencia de compra enfocada en generar confianza y ventas.` |
| `ecommerceLatamContent` | `E-commerce para Pymes en LATAM` | `Creamos tiendas online para pymes en LATAM con pagos, envíos y catálogos preparados para vender en distintos mercados de la región.` |
| `automatizacionesContent` | `Automatizaciones para Pymes en Uruguay` | `Automatizaciones para pymes en Uruguay: conectamos CRM, WhatsApp, email y reportes para reducir tareas manuales y ordenar la operación.` |
| `automatizacionesLatamContent` | `Automatizaciones para Pymes en LATAM` | `Automatizaciones para pymes en LATAM: conectamos CRM, WhatsApp, email y reportes para coordinar equipos y procesos regionales.` |

- [ ] **Step 5: Preserve and inspect the existing regional fixes**

Every regional page must retain the complete reciprocal set. The agency pair is:

```ts
languages: {
  es: `${siteConfig.url}${siteConfig.routes.agenciaDigitalLatam}`,
  "es-UY": `${siteConfig.url}${siteConfig.routes.agenciaDigitalUruguay}`,
  "x-default": `${siteConfig.url}${siteConfig.routes.agenciaDigitalLatam}`,
},
```

The remaining pairs use these exact route keys in the same three positions:

| Page pair | `es` and `x-default` | `es-UY` |
| --- | --- | --- |
| Development | `desarrolloWebLatam` | `desarrolloWebUruguay` |
| E-commerce | `ecommerceLatam` | `ecommerceUruguay` |
| Automation | `automatizacionesLatam` | `automatizacionesUruguay` |

`app/sitemap.ts` must continue omitting `const lastModified = new Date()` and every build-time `lastModified` property.

- [ ] **Step 6: Run the SEO suite and verify GREEN**

Run:

```powershell
pnpm test:seo
```

Expected: all tests pass, including the existing hreflang and sitemap checks plus the two new title tests.

- [ ] **Step 7: Commit the metadata unit**

Stage only the files listed in this task, including the user's existing regional fixes, and inspect the staged set before committing:

```powershell
git add app/layout.tsx lib/site.ts lib/content.ts app/blog/page.tsx app/servicios/page.tsx app/sobre-nosotros/page.tsx app/blog/cuanto-cuesta-pagina-web-uruguay-2026/page.tsx app/blog/shopify-vs-woocommerce-latam/page.tsx app/blog/automatizaciones-pyme-uruguay/page.tsx app/agencia-digital-latam/page.tsx app/agencia-digital-uruguay/page.tsx app/automatizaciones-latam/page.tsx app/automatizaciones-uruguay/page.tsx app/desarrollo-web-latam/page.tsx app/desarrollo-web-uruguay/page.tsx app/ecommerce-latam/page.tsx app/ecommerce-uruguay/page.tsx app/sitemap.ts scripts/seo-regression.test.mjs
git diff --cached --name-only
git diff --cached --check
git commit -m "fix(seo): sharpen Uruguay-first metadata signals"
```

Do not stage portfolio screenshots.

---

### Task 2: Fragment-Based Section Navigation

**Files:**

- Modify: `scripts/seo-regression.test.mjs`
- Modify: `components/ui/SmartLink.tsx`

**Interfaces:**

- Consumes: `sectionId: string`, `usePathname()`, the existing scroll correction functions, `window.location.hash`, and the legacy `section` query parameter.
- Produces: `/#<encoded-section-id>` link destinations and a decoded section ID or `null` for the initial scroll handler.

- [ ] **Step 1: Add the failing navigation regression test**

Add:

```js
test("section links generate fragments and retain the legacy query fallback", () => {
  const source = read("components/ui/SmartLink.tsx");

  assert.match(source, /return `\/#\$\{encodeURIComponent\(sectionId\)\}`/);
  assert.doesNotMatch(source, /return `\/\?\$\{SECTION_PARAM\}=/);
  assert.match(source, /window\.location\.hash/);
  assert.match(source, /params\.get\(SECTION_PARAM\)/);
});
```

- [ ] **Step 2: Run the focused suite and verify RED**

Run `pnpm test:seo`.

Expected: the new navigation test fails because `getSectionHref()` still generates `/?section=` and the handler does not read the hash.

- [ ] **Step 3: Generate fragment destinations**

Replace `getSectionHref()` with:

```ts
function getSectionHref(sectionId: string) {
  return `/#${encodeURIComponent(sectionId)}`
}
```

Add this helper immediately after it:

```ts
function getRequestedSection() {
  const hash = window.location.hash.slice(1)

  if (hash) {
    try {
      return decodeURIComponent(hash)
    } catch {
      return null
    }
  }

  const params = new URLSearchParams(window.location.search)
  return params.get(SECTION_PARAM)
}
```

In `SectionScrollHandler`, replace the direct `URLSearchParams` read with:

```ts
const sectionId = getRequestedSection()
if (!sectionId) return
```

Do not alter the existing retry, alignment, or Lenis behavior.

- [ ] **Step 4: Run the SEO suite and verify GREEN**

Run `pnpm test:seo`.

Expected: all tests pass.

- [ ] **Step 5: Commit the navigation unit**

```powershell
git add components/ui/SmartLink.tsx scripts/seo-regression.test.mjs
git diff --cached --check
git commit -m "fix(seo): use fragments for homepage sections"
```

---

### Task 3: Article Authority and Contextual Linking

**Files:**

- Modify: `scripts/seo-regression.test.mjs`
- Modify: `lib/structured-data.ts`
- Modify: `lib/content.ts`
- Modify: `app/blog/cuanto-cuesta-pagina-web-uruguay-2026/page.tsx`
- Modify: `app/blog/shopify-vs-woocommerce-latam/page.tsx`
- Modify: `app/blog/automatizaciones-pyme-uruguay/page.tsx`

**Interfaces:**

- Consumes: `siteConfig`, visible article metadata, and the existing `serializeJsonLd(value: unknown): string` function.
- Produces: `createBlogPostingJsonLd(input: BlogPostingJsonLdInput): object`, visible organization bylines, one JSON-LD script per article, and reciprocal content-to-service links.

- [ ] **Step 1: Add failing article and link regression tests**

Add:

```js
const articlePages = [
  "app/blog/cuanto-cuesta-pagina-web-uruguay-2026/page.tsx",
  "app/blog/shopify-vs-woocommerce-latam/page.tsx",
  "app/blog/automatizaciones-pyme-uruguay/page.tsx",
];

test("blog posts expose visible authorship and BlogPosting JSON-LD", () => {
  const structuredData = read("lib/structured-data.ts");
  assert.match(structuredData, /export function createBlogPostingJsonLd/);
  assert.match(structuredData, /"@type": "BlogPosting"/);

  for (const page of articlePages) {
    const source = read(page);
    assert.match(source, /createBlogPostingJsonLd/);
    assert.match(source, /serializeJsonLd\(articleSchema\)/);
    assert.match(source, /Por \{siteConfig\.name\}/);
  }
});

test("editorial content links to its matching commercial page", () => {
  const targets = new Map([
    [articlePages[0], "/desarrollo-web-uruguay"],
    [articlePages[1], "/ecommerce-latam"],
    [articlePages[2], "/automatizaciones-uruguay"],
  ]);

  for (const [page, target] of targets) {
    assert.match(read(page), new RegExp(`href="${target}"`));
  }

  const content = read("lib/content.ts");
  assert.match(content, /href: "\/blog\/cuanto-cuesta-pagina-web-uruguay-2026"/);
  assert.match(content, /href: "\/blog\/shopify-vs-woocommerce-latam"/);
  assert.match(content, /href: "\/blog\/automatizaciones-pyme-uruguay"/);
});

test("blog copy avoids the unsupported 40 percent inquiry claim", () => {
  const source = read(articlePages[0]);
  assert.doesNotMatch(source, /40% m[aá]s de consultas/);
});
```

- [ ] **Step 2: Run the SEO suite and verify RED**

Run `pnpm test:seo`.

Expected: all three new tests fail because article schemas, bylines, contextual service links, and the claim cleanup are not present.

- [ ] **Step 3: Add the shared BlogPosting builder**

Update `lib/structured-data.ts` to:

```ts
import { siteConfig } from "@/lib/site"

interface BlogPostingJsonLdInput {
  headline: string
  description: string
  path: string
  datePublished: string
}

export function createBlogPostingJsonLd({
  headline,
  description,
  path,
  datePublished,
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
    inLanguage: "es",
    author: organization,
    publisher: organization,
  }
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}
```

- [ ] **Step 4: Wire exact article data into each post**

Import both helpers in every article:

```ts
import { createBlogPostingJsonLd, serializeJsonLd } from "@/lib/structured-data"
```

Create the cost article schema with:

```ts
const articleSchema = createBlogPostingJsonLd({
  headline: "Cuánto cuesta una página web en Uruguay en 2026",
  description:
    "Desglosamos los costos reales de desarrollar un sitio web en Uruguay en 2026: landing pages, sitios corporativos, tiendas online y presupuestos por etapa.",
  path: "/blog/cuanto-cuesta-pagina-web-uruguay-2026",
  datePublished: "2026-05-05",
})
```

Create the Shopify comparison schema with:

```ts
const articleSchema = createBlogPostingJsonLd({
  headline: "Shopify vs WooCommerce en LATAM 2026",
  description:
    "Comparativa completa de Shopify vs WooCommerce para vender online en LATAM: medios de pago, envíos, costos, escalabilidad y cuál elegir según tu negocio.",
  path: "/blog/shopify-vs-woocommerce-latam",
  datePublished: "2026-05-05",
})
```

Create the automation article schema with:

```ts
const articleSchema = createBlogPostingJsonLd({
  headline: "5 automatizaciones para pymes en Uruguay",
  description:
    "Descubrí 5 automatizaciones prácticas para pymes en Uruguay: WhatsApp, CRM, email automático, reportes y seguimiento de clientes sin trabajo manual.",
  path: "/blog/automatizaciones-pyme-uruguay",
  datePublished: "2026-05-05",
})
```

Keep the literal metadata titles established in Task 1 and the existing canonical, Open Graph, and visible ISO date values.

Add the visible byline beside the `<time>`:

```tsx
<span className="text-xs text-grafito">Por {siteConfig.name}</span>
```

Add one script inside the article page root:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }}
/>
```

- [ ] **Step 5: Add reciprocal contextual links**

Add these entries to both the Uruguay and LATAM version of each matching service's `internalLinks` array in `lib/content.ts`:

```ts
{ label: "Cuánto cuesta una página web en Uruguay", href: "/blog/cuanto-cuesta-pagina-web-uruguay-2026" }
{ label: "Shopify vs WooCommerce en LATAM", href: "/blog/shopify-vs-woocommerce-latam" }
{ label: "Automatizaciones para pymes en Uruguay", href: "/blog/automatizaciones-pyme-uruguay" }
```

Add these secondary links to the matching article CTA groups:

```tsx
<Link href="/desarrollo-web-uruguay" className="btn-secondary">
  Ver desarrollo web en Uruguay
</Link>
```

```tsx
<Link href="/ecommerce-latam" className="btn-secondary">
  Ver e-commerce para LATAM
</Link>
```

```tsx
<Link href="/automatizaciones-uruguay" className="btn-secondary">
  Ver automatizaciones en Uruguay
</Link>
```

Keep the existing `/blog` links.

- [ ] **Step 6: Remove the unsupported result claim**

Replace the paragraph containing `40% más de consultas` with:

```tsx
<p className="text-grafito leading-relaxed mb-4">
  Un sitio web bien hecho no es solo una pieza visual. Debe explicar tu oferta, responder
  dudas y facilitar que una visita termine en consulta. Una base rápida, segura y bien
  estructurada también permite medir resultados y trabajar el posicionamiento orgánico sin
  rehacer el proyecto.
</p>
```

- [ ] **Step 7: Run the SEO suite and verify GREEN**

Run `pnpm test:seo`.

Expected: all tests pass.

- [ ] **Step 8: Commit the article unit**

```powershell
git add lib/structured-data.ts lib/content.ts scripts/seo-regression.test.mjs app/blog/cuanto-cuesta-pagina-web-uruguay-2026/page.tsx app/blog/shopify-vs-woocommerce-latam/page.tsx app/blog/automatizaciones-pyme-uruguay/page.tsx
git diff --cached --check
git commit -m "feat(seo): connect regional content and article schema"
```

---

### Task 4: Variable Font LCP Experiment

**Files:**

- Modify: `scripts/seo-regression.test.mjs`
- Modify: `app/layout.tsx`
- Generated and ignored: `reports/lighthouse/*`

**Interfaces:**

- Consumes: Next.js 16 `Cormorant`, `Jost`, and `JetBrains_Mono` font loaders, each of which supports `weight: "variable"` in the installed type declarations.
- Produces: the same CSS variables and font families with fewer font resources.

- [ ] **Step 1: Record the pre-change production-build baseline**

Run:

```powershell
pnpm build
node scripts/perf-audit.mjs
```

Record the home LCP and performance score printed by `scripts/perf-audit.mjs`. Do not compare against a development server.

- [ ] **Step 2: Add the failing variable-font regression test**

Replace the existing font test body with:

```js
test("layout uses variable next/font files for the site fonts", () => {
  const source = read("app/layout.tsx");

  assert.match(source, /next\/font\/google/);
  assert.equal([...source.matchAll(/weight:\s*"variable"/g)].length, 3);
  assert.match(
    source,
    /className=\{`\$\{cormorant\.variable\} \$\{jost\.variable\} \$\{jetbrainsMono\.variable\}`\}/,
  );
  assert.match(source, /preload: true/);
});
```

- [ ] **Step 3: Run the SEO suite and verify RED**

Run `pnpm test:seo`.

Expected: the font test fails because the layout still requests static weight arrays.

- [ ] **Step 4: Switch the existing font loaders to variable files**

Change only the three weight declarations in `app/layout.tsx`:

```ts
weight: "variable",
```

Keep Cormorant's normal and italic styles, all three CSS variable names, `display: "swap"`, the current subsets, and the existing preload choices.

- [ ] **Step 5: Run tests, build, and the comparable performance audit**

Run:

```powershell
pnpm test:seo
pnpm build
node scripts/perf-audit.mjs
```

Expected: tests and build pass. Keep the font change only when the home LCP improves from the baseline recorded in Step 1.

Start the production build on port 3101 in another terminal, then capture comparable desktop screenshots:

```powershell
pnpm start --hostname 127.0.0.1 --port 3101
```

```powershell
$env:CLAVE_SCREENSHOT_DIR = [IO.Path]::GetTempPath()
@'
import path from "node:path"
import puppeteer from "puppeteer"

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 })

for (const [name, url] of [
  ["before", "https://clavestudio.dev"],
  ["after", "http://127.0.0.1:3101"],
]) {
  await page.goto(url, { waitUntil: "networkidle0" })
  await page.screenshot({
    path: path.join(process.env.CLAVE_SCREENSHOT_DIR, `clave-font-${name}.png`),
    fullPage: false,
  })
}

await browser.close()
'@ | node --input-type=module
```

Inspect `clave-font-before.png` and `clave-font-after.png` with the image viewer. Stop the local server. Keep the variable fonts only when the headline wraps and renders consistently and no layout regression is visible.

If LCP does not improve or the screenshots regress, restore these exact weights:

```ts
// Cormorant
weight: ["300", "400", "500"],

// Jost
weight: ["300", "400", "500", "600"],

// JetBrains Mono
weight: ["400", "500"],
```

Restore this regression test and leave the task without a production-code commit:

```js
test("layout applies next/font variables for the site fonts", () => {
  const source = read("app/layout.tsx");

  assert.match(source, /next\/font\/google/);
  assert.match(
    source,
    /className=\{`\$\{cormorant\.variable\} \$\{jost\.variable\} \$\{jetbrainsMono\.variable\}`\}/,
  );
  assert.match(source, /preload: true/);
});
```

- [ ] **Step 6: Commit only a successful font experiment**

```powershell
git add app/layout.tsx scripts/seo-regression.test.mjs
git diff --cached --check
git commit -m "perf: reduce homepage font payload"
```

---

### Task 5: Full Rendered Verification

**Files:**

- Verify: all files changed by Tasks 1-4.
- Do not modify: `next.config.ts`.

**Interfaces:**

- Consumes: the production build and all regression tests.
- Produces: evidence that metadata, structured data, links, build output, and performance satisfy the approved design.

- [ ] **Step 1: Run the complete automated gate**

Run fresh:

```powershell
pnpm test:seo
pnpm test:perf-tooling
pnpm lint
pnpm build
```

Expected: every command exits `0`, with no failed tests or build errors.

- [ ] **Step 2: Run Lighthouse against the production build**

Run:

```powershell
node scripts/perf-audit.mjs
```

Expected: the home LCP is below the pre-font baseline when Task 4 was retained, CLS remains below `0.1`, and no audited route regresses past its configured budget.

- [ ] **Step 3: Inspect rendered SEO output**

Start the built application on port 3101:

```powershell
pnpm start --hostname 127.0.0.1 --port 3101
```

From another terminal, run this rendered-output audit:

```powershell
@'
import assert from "node:assert/strict"
import puppeteer from "puppeteer"

const base = "http://127.0.0.1:3101"
const regionalPaths = [
  "/agencia-digital-latam",
  "/agencia-digital-uruguay",
  "/desarrollo-web-latam",
  "/desarrollo-web-uruguay",
  "/ecommerce-latam",
  "/ecommerce-uruguay",
  "/automatizaciones-latam",
  "/automatizaciones-uruguay",
]
const articlePaths = [
  "/blog/cuanto-cuesta-pagina-web-uruguay-2026",
  "/blog/shopify-vs-woocommerce-latam",
  "/blog/automatizaciones-pyme-uruguay",
]
const paths = ["/", ...regionalPaths, ...articlePaths]

for (const path of paths) {
  const response = await fetch(`${base}${path}`)
  assert.equal(response.status, 200, path)
  const html = await response.text()
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
  assert.ok(title && title.length <= 65, `${path}: ${title}`)
  assert.doesNotMatch(title, /Clave Studio Digital \| Clave Studio Digital/)
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, path)

  if (regionalPaths.includes(path)) {
    assert.match(html, /hreflang="es"/)
    assert.match(html, /hreflang="es-UY"/)
    assert.match(html, /hreflang="x-default"/)
  }

  if (articlePaths.includes(path)) {
    assert.match(html, /Por Clave Studio Digital/)
    assert.match(html, /"@type":"BlogPosting"/)
  }

  if (path === "/") {
    assert.match(html, /href="\/#precios"/)
  }
}

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.goto(`${base}/?section=precios`, { waitUntil: "networkidle0" })
await page.waitForFunction(() => window.scrollY > 0)
assert.ok(await page.$("#precios"))
await browser.close()

console.log(`Rendered SEO audit passed for ${paths.length} pages`)
'@ | node --input-type=module
```

Expected output: `Rendered SEO audit passed for 12 pages`. This confirms:

- each page returns `200`;
- every page has one concise title and one canonical;
- regional pairs expose `es`, `es-UY`, and `x-default` reciprocally;
- every article has one visible byline and one `BlogPosting` object;
- section links use `/#...`, while a direct `/?section=precios` visit still scrolls correctly;
- no rendered title contains `Clave Studio Digital | Clave Studio Digital`.

Stop the local server after inspection.

- [ ] **Step 4: Check repository hygiene and external follow-up**

Run:

```powershell
git status --short --branch
git diff --check
curl.exe -sSI https://clavestudio.dev | Select-String -Pattern "strict-transport-security"
```

Expected: source work is committed, portfolio screenshots remain untracked and untouched, generated Lighthouse reports are ignored, and production still reports the Cloudflare-managed HSTS value until it is changed externally.

- [ ] **Step 5: Report the verified result**

Report commit hashes, exact test/build commands, Lighthouse before/after values, the preserved unrelated files, and Cloudflare HSTS as the only external configuration follow-up. Do not claim ranking improvements without Search Console data.
