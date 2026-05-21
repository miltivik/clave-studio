# Accessible Pricing Design

## Goal

Lower initial pricing friction for Clave Digital in Uruguay and LATAM while preserving a clear path to later premium repositioning.

## Approved Pricing

`PricingSection` keeps three `Desde` plan anchors:

| Plan | Price |
| --- | --- |
| Presencia | USD 450 |
| Crecimiento | USD 1.290 |
| Sistema | USD 2.700 |

The new ladder mixes an accessible entry offer with enough separation for e-commerce and automation work. `Sistema` stays above commodity web pricing because it includes automation and CRM scope.

## Scope

Change only homepage pricing copy in `components/sections/PricingSection.tsx`.

- Update plan prices.
- Keep current plan names, features, support durations, CTAs, featured plan treatment, and `Desde` label.
- Expand pricing note below the plan grid.
- State that monthly maintenance is excluded.
- State that hosting, domains, licenses, and third-party services are quoted separately when applicable.

## Pricing Note

Use this Spanish copy below the grid:

> Los precios son orientativos. Cada proyecto se presupuesta a medida despues de una llamada de descubrimiento gratuita. El mantenimiento mensual no esta incluido. Hosting, dominios, licencias y servicios de terceros se cotizan aparte cuando corresponda.

The source file already contains Spanish diacritics. Final UI copy may preserve that established style.

## Technical Shape

`PricingSection` remains a server-rendered React component with its existing local `PLANS` data. No new state, routes, dependencies, data fetching, or client boundary are needed.

## Testing

Add a focused source regression test beside existing pricing source checks in `scripts/seo-regression.test.mjs`.

The test should verify:

- Accessible anchor prices exist in `PricingSection.tsx`.
- Monthly maintenance exclusion copy exists.
- Third-party cost disclaimer exists.

Run the focused Node test before editing production pricing, then run it again after implementation. Run lint if pricing source changes stay text-only and local.
