import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import {
  AUDIT_ROUTES,
  buildRouteReportPath,
  createSummaryTable,
  evaluateRouteReport,
} from "./perf-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const reportsDir = path.join(projectRoot, "reports", "lighthouse");
const preset = "mobile";
const host = "127.0.0.1";
const port = 3100;
const baseUrl = `http://${host}:${port}`;

let serverProcess;
let chrome;

try {
  await fs.mkdir(reportsDir, { recursive: true });

  serverProcess = startNextServer();
  await waitForServer(`${baseUrl}/`);

  chrome = await launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });

  const results = [];

  for (const routeConfig of AUDIT_ROUTES) {
    const targetUrl = new URL(routeConfig.route, `${baseUrl}/`).toString();
    const runnerResult = await lighthouse(targetUrl, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance"],
    });

    if (!runnerResult?.lhr || typeof runnerResult.report !== "string") {
      throw new Error(`Lighthouse no devolvió resultados válidos para ${routeConfig.route}.`);
    }

    const evaluated = evaluateRouteReport({ routeConfig, lhr: runnerResult.lhr });
    results.push(evaluated);

    await fs.writeFile(
      path.join(reportsDir, buildRouteReportPath(routeConfig.route, preset)),
      runnerResult.report,
      "utf8"
    );
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    preset,
    baseUrl,
    results,
  };

  await fs.writeFile(
    path.join(reportsDir, `summary.${preset}.json`),
    JSON.stringify(summary, null, 2),
    "utf8"
  );

  const markdown = [
    "# Auditoría Lighthouse Mobile",
    "",
    `Base URL: \`${baseUrl}\``,
    `Generado: ${summary.generatedAt}`,
    "",
    createSummaryTable(results),
    "",
    "## Riesgos priorizados",
    "",
    "- Home: revisar el hero 3D y las animaciones por encima del pliegue si LCP o score quedan bajos.",
    "- Sitios de servicio: reducir JS cliente, diferir animaciones y revisar qué puede volver a Server Components.",
    "- Todo el sitio: vigilar CLS en entradas animadas y bloques con contenido dinámico.",
    "",
  ].join("\n");

  await fs.writeFile(path.join(reportsDir, `summary.${preset}.md`), markdown, "utf8");

  process.stdout.write(`${markdown}\n`);
} finally {
  if (chrome) {
    await chrome.kill();
  }

  if (serverProcess) {
    serverProcess.kill("SIGTERM");
    await onceExit(serverProcess);
  }
}

function startNextServer() {
  const command = process.execPath;
  const nextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");

  const child = spawn(command, [nextBin, "start", "--hostname", host, "--port", String(port)], {
    cwd: projectRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "production",
    },
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      process.exitCode = code;
    }
  });

  return child;
}

async function waitForServer(url) {
  const timeoutAt = Date.now() + 30_000;

  while (Date.now() < timeoutAt) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {}

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`El servidor no respondió a tiempo en ${url}.`);
}

function onceExit(child) {
  return new Promise((resolve) => {
    if (child.exitCode !== null) {
      resolve();
      return;
    }

    child.once("exit", () => resolve());
  });
}
