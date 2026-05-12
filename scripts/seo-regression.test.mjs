import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

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
