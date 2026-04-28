import test from "node:test";
import assert from "node:assert/strict";

import {
  AUDIT_ROUTES,
  buildRouteReportPath,
  createSummaryTable,
  evaluateRouteReport,
} from "./perf-lib.mjs";

test("defines the expected mobile performance budgets", () => {
  assert.equal(AUDIT_ROUTES.length, 10);
  assert.deepEqual(
    AUDIT_ROUTES.map(({ route, minPerformance }) => ({ route, minPerformance })),
    [
      { route: "/", minPerformance: 80 },
      { route: "/servicios", minPerformance: 85 },
      { route: "/agencia-digital-latam", minPerformance: 85 },
      { route: "/desarrollo-web-latam", minPerformance: 85 },
      { route: "/ecommerce-latam", minPerformance: 85 },
      { route: "/automatizaciones-latam", minPerformance: 85 },
      { route: "/agencia-digital-uruguay", minPerformance: 85 },
      { route: "/desarrollo-web-uruguay", minPerformance: 85 },
      { route: "/ecommerce-uruguay", minPerformance: 85 },
      { route: "/automatizaciones-uruguay", minPerformance: 85 },
    ]
  );
});

test("evaluates route reports against performance and CLS budgets", () => {
  const passingReport = evaluateRouteReport({
    routeConfig: { route: "/", label: "Home", minPerformance: 80 },
    lhr: {
      categories: { performance: { score: 0.91 } },
      audits: {
        "largest-contentful-paint": { numericValue: 2200 },
        "cumulative-layout-shift": { numericValue: 0.03 },
      },
    },
  });

  assert.equal(passingReport.performanceScore, 91);
  assert.equal(passingReport.passesPerformance, true);
  assert.equal(passingReport.passesCls, true);
  assert.equal(passingReport.status, "pass");
  assert.equal(passingReport.observations.length, 0);

  const failingReport = evaluateRouteReport({
    routeConfig: { route: "/servicios", label: "Servicios", minPerformance: 85 },
    lhr: {
      categories: { performance: { score: 0.72 } },
      audits: {
        "largest-contentful-paint": { numericValue: 4100 },
        "cumulative-layout-shift": { numericValue: 0.18 },
      },
    },
  });

  assert.equal(failingReport.performanceScore, 72);
  assert.equal(failingReport.passesPerformance, false);
  assert.equal(failingReport.passesCls, false);
  assert.equal(failingReport.status, "fail");
  assert.deepEqual(failingReport.observations, [
    "Performance debajo del objetivo (72 < 85).",
    "LCP alto (4.10 s). Revisar hero, cargas iniciales y JS sobre el pliegue.",
    "CLS fuera de presupuesto (0.180 > 0.100).",
  ]);
});

test("creates stable report file names from routes", () => {
  assert.equal(buildRouteReportPath("/"), "home.mobile.json");
  assert.equal(buildRouteReportPath("/desarrollo-web-uruguay"), "desarrollo-web-uruguay.mobile.json");
});

test("renders a markdown summary table with actions", () => {
  const markdown = createSummaryTable([
    {
      route: "/",
      label: "Home",
      performanceScore: 79,
      lcpMs: 3500,
      cls: 0.02,
      status: "fail",
      observations: ["Performance debajo del objetivo (79 < 80)."],
      recommendedAction: "Reducir el costo del hero 3D.",
    },
  ]);

  assert.match(markdown, /\| Ruta \| Score \| LCP \| CLS \| Estado \| Observaciones \| Acción sugerida \|/);
  assert.match(markdown, /\| Home \(`\/`\) \| 79 \| 3\.50 s \| 0\.020 \| FAIL \| Performance debajo del objetivo \(79 < 80\)\. \| Reducir el costo del hero 3D\. \|/);
});
