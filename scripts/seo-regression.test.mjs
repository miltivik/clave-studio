import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function firstTitle(source) {
  const match = source.match(/\btitle:\s*"([^"]+)"/);
  assert.ok(match, "Missing static metadata title");
  return match[1];
}

const articlePages = [
  "app/blog/cuanto-cuesta-pagina-web-uruguay-2026/page.tsx",
  "app/blog/shopify-vs-woocommerce-latam/page.tsx",
  "app/blog/automatizaciones-pyme-uruguay/page.tsx",
];

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16) / 255,
    g: Number.parseInt(value.slice(2, 4), 16) / 255,
    b: Number.parseInt(value.slice(4, 6), 16) / 255,
  };
}

function linearize(channel) {
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrast(foreground, background) {
  const fg = luminance(foreground);
  const bg = luminance(background);
  const light = Math.max(fg, bg);
  const dark = Math.min(fg, bg);
  return (light + 0.05) / (dark + 0.05);
}

function cssVar(css, name) {
  const match = css.match(new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6})`));
  assert.ok(match, `Missing CSS variable ${name}`);
  return match[1];
}

const latamRoutes = [
  "agenciaDigitalLatam",
  "desarrolloWebLatam",
  "ecommerceLatam",
  "automatizacionesLatam",
];

test("site config exposes LATAM SEO routes", () => {
  const source = read("lib/site.ts");

  for (const routeName of latamRoutes) {
    assert.match(source, new RegExp(`${routeName}:\\s*"/[^"]+"`));
  }
});

test("sitemap includes all LATAM service URLs", () => {
  const source = read("app/sitemap.ts");

  for (const routeName of latamRoutes) {
    assert.match(source, new RegExp(`siteConfig\\.routes\\.${routeName}`));
  }
});

test("regional page metadata uses Google-supported Spanish hreflang values", () => {
  const regionalPages = [
    "app/agencia-digital-latam/page.tsx",
    "app/agencia-digital-uruguay/page.tsx",
    "app/desarrollo-web-latam/page.tsx",
    "app/desarrollo-web-uruguay/page.tsx",
    "app/ecommerce-latam/page.tsx",
    "app/ecommerce-uruguay/page.tsx",
    "app/automatizaciones-latam/page.tsx",
    "app/automatizaciones-uruguay/page.tsx",
  ];

  for (const page of regionalPages) {
    const source = read(page);

    assert.doesNotMatch(source, /"es-419"/);
    assert.match(source, /\bes:\s*`/);
    assert.match(source, /"es-UY":\s*`/);
  }
});

test("sitemap does not claim every page changed at build time", () => {
  const source = read("app/sitemap.ts");

  assert.doesNotMatch(source, /const lastModified = new Date\(\)/);
  assert.doesNotMatch(source, /\blastModified,\s*$/m);
});

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

test("section links generate fragments and retain the legacy query fallback", () => {
  const source = read("components/ui/SmartLink.tsx");

  assert.match(source, /return `\/#\$\{encodeURIComponent\(sectionId\)\}`/);
  assert.doesNotMatch(source, /return `\/\?\$\{SECTION_PARAM\}=/);
  assert.match(source, /window\.location\.hash/);
  assert.match(source, /params\.get\(SECTION_PARAM\)/);
});

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

test("security.txt exposes required disclosure fields", () => {
  const source = read("app/.well-known/security.txt/route.ts");

  assert.match(source, /Contact: mailto:/);
  assert.match(source, /Expires:/);
  assert.match(source, /Canonical:/);
  assert.match(source, /text\/plain/);
});

test("commercial pages avoid self-serving review and FAQ rich-result markup", () => {
  const testimonials = read("components/sections/TestimonialsSection.tsx");
  const homeFaq = read("components/sections/FAQSection.tsx");
  const developmentPage = read("app/desarrollo-web-uruguay/page.tsx");

  assert.doesNotMatch(testimonials, /aggregateRating/);
  assert.doesNotMatch(testimonials, /"@type":\s*"Review"/);
  assert.doesNotMatch(homeFaq, /"@type":\s*"FAQPage"/);
  assert.doesNotMatch(developmentPage, /createFaqJsonLd/);
});

test("service page template provides the main landmark", () => {
  const source = read("components/uruguay/ServicePageComponent.tsx");

  assert.match(source, /<main\b/);
  assert.match(source, /<\/main>/);
});

test("pricing CTAs keep visible text as accessible names", () => {
  const source = read("components/sections/PricingSection.tsx");

  assert.doesNotMatch(source, /ariaLabel=\{`Contratar plan/);
});

test("pricing shows accessible entry anchors and maintenance exclusions", () => {
  const source = read("components/sections/PricingSection.tsx");

  assert.match(source, /price:\s*"450"/);
  assert.match(source, /price:\s*"1\.290"/);
  assert.match(source, /price:\s*"2\.700"/);
  assert.match(source, /El mantenimiento mensual no est[aá] incluido/);
  assert.match(source, /Hosting,\s*dominios, licencias y servicios de terceros/);
});

test("contextual contrast tokens satisfy WCAG AA for common backgrounds", () => {
  const css = read("app/globals.css");
  const darkText = cssVar(css, "--color-grafito-on-dark");
  const lightAccent = cssVar(css, "--color-oro-on-light");

  assert.ok(contrast(darkText, "#0F0E0A") >= 4.5);
  assert.ok(contrast(darkText, "#1A1916") >= 4.5);
  assert.ok(contrast(lightAccent, "#F7F3EA") >= 4.5);
  assert.match(css, /\.bg-negro-clave :where\(\.text-grafito\)/);
  assert.match(css, /\.bg-negro-clave :where\(\.text-grafito\\\/70\)/);
  assert.match(css, /\.bg-negro-clave :where\(\.text-grafito\\\/60\)/);
  assert.match(css, /\.bg-negro-mid :where\(\.text-grafito\\\/50\)/);
  assert.match(css, /\.bg-crema :where\(\.text-oro-clave\)/);
});

test("layout applies next/font variables for the site fonts", () => {
  const source = read("app/layout.tsx");

  assert.match(source, /next\/font\/google/);
  assert.match(source, /className=\{\`\$\{cormorant\.variable\} \$\{jost\.variable\} \$\{jetbrainsMono\.variable\}\`\}/);
  assert.match(source, /preload: true/);
});

test("layout tolerates browser-injected root attributes before hydration", () => {
  const source = read("app/layout.tsx");

  assert.match(source, /<html[\s\S]*suppressHydrationWarning/);
  assert.match(source, /<body suppressHydrationWarning>/);
});

test("home critical hero copy avoids delayed client animation", () => {
  const source = read("components/sections/HeroSection.tsx");
  const visualSource = read("components/sections/HeroVisualDesktop.tsx");

  assert.doesNotMatch(source, /"use client"/);
  assert.doesNotMatch(source, /from "gsap"/);
  assert.doesNotMatch(source, /from "framer-motion"/);
  assert.doesNotMatch(source, /<motion\.h1/);
  assert.doesNotMatch(source, /<motion\.p/);
  assert.doesNotMatch(source, /opacity: 0, y: 40/);
  assert.doesNotMatch(visualSource, /fetchPriority="high"/);
  assert.match(source, /className="order-2 hidden md:block/);
});

test("turnstile script is deferred until the form is near interaction", () => {
  const source = read("components/contact/TurnstileField.tsx");

  assert.match(source, /IntersectionObserver/);
  assert.match(source, /onFocusCapture=\{\(\) => setShouldLoadScript\(true\)\}/);
  assert.match(source, /\{shouldLoadScript && siteKey && \(/);
  assert.match(source, /strategy="afterInteractive"/);
});
