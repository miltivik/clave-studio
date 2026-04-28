export const AUDIT_ROUTES = [
  { route: "/", label: "Home", minPerformance: 80 },
  { route: "/servicios", label: "Servicios", minPerformance: 85 },
  { route: "/agencia-digital-latam", label: "Agencia LATAM", minPerformance: 85 },
  { route: "/desarrollo-web-latam", label: "Desarrollo Web LATAM", minPerformance: 85 },
  { route: "/ecommerce-latam", label: "E-commerce LATAM", minPerformance: 85 },
  { route: "/automatizaciones-latam", label: "Automatizaciones LATAM", minPerformance: 85 },
  { route: "/agencia-digital-uruguay", label: "Agencia Uruguay", minPerformance: 85 },
  { route: "/desarrollo-web-uruguay", label: "Desarrollo Web", minPerformance: 85 },
  { route: "/ecommerce-uruguay", label: "E-commerce", minPerformance: 85 },
  { route: "/automatizaciones-uruguay", label: "Automatizaciones", minPerformance: 85 },
]

const CLS_BUDGET = 0.1

export function buildRouteReportPath(route, preset = "mobile") {
  const normalizedRoute = route === "/" ? "home" : route.replace(/^\/+/, "")
  return `${normalizedRoute}.${preset}.json`
}

export function evaluateRouteReport({ routeConfig, lhr }) {
  const performanceScore = Math.round((lhr.categories.performance.score ?? 0) * 100)
  const lcpMs = lhr.audits["largest-contentful-paint"]?.numericValue ?? 0
  const cls = lhr.audits["cumulative-layout-shift"]?.numericValue ?? 0
  const passesPerformance = performanceScore >= routeConfig.minPerformance
  const passesCls = cls <= CLS_BUDGET
  const observations = []

  if (!passesPerformance) {
    observations.push(
      `Performance debajo del objetivo (${performanceScore} < ${routeConfig.minPerformance}).`
    )
  }

  if (lcpMs >= 4000) {
    observations.push(
      `LCP alto (${formatSeconds(lcpMs)}). Revisar hero, cargas iniciales y JS sobre el pliegue.`
    )
  }

  if (!passesCls) {
    observations.push(`CLS fuera de presupuesto (${cls.toFixed(3)} > ${CLS_BUDGET.toFixed(3)}).`)
  }

  return {
    route: routeConfig.route,
    label: routeConfig.label,
    performanceScore,
    minPerformance: routeConfig.minPerformance,
    lcpMs,
    cls,
    passesPerformance,
    passesCls,
    status: observations.length === 0 ? "pass" : "fail",
    observations,
    recommendedAction: pickRecommendedAction(routeConfig.route, observations),
  }
}

export function createSummaryTable(results) {
  const rows = [
    "| Ruta | Score | LCP | CLS | Estado | Observaciones | Acción sugerida |",
    "| --- | ---: | ---: | ---: | --- | --- | --- |",
  ]

  for (const result of results) {
    rows.push(
      `| ${result.label} (\`${result.route}\`) | ${result.performanceScore} | ${formatSeconds(result.lcpMs)} | ${result.cls.toFixed(3)} | ${result.status.toUpperCase()} | ${formatObservations(result.observations)} | ${result.recommendedAction} |`
    )
  }

  return rows.join("\n")
}

function pickRecommendedAction(route, observations) {
  if (route === "/") {
    return "Reducir el costo del hero 3D."
  }

  if (observations.some((observation) => observation.includes("LCP alto"))) {
    return "Reducir carga inicial y revisar medios del primer viewport."
  }

  if (observations.some((observation) => observation.includes("Performance debajo"))) {
    return "Diferir JS cliente y revisar secciones bajo el pliegue."
  }

  if (observations.some((observation) => observation.includes("CLS fuera"))) {
    return "Reservar espacio y revisar entradas animadas."
  }

  return "Mantener presupuesto actual."
}

function formatObservations(observations) {
  return observations.length > 0 ? observations.join(" ") : "Sin observaciones."
}

function formatSeconds(milliseconds) {
  return `${(milliseconds / 1000).toFixed(2)} s`
}
