#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { LEGAL_PAGES } from "./legal-pages-data.js";
import { renderLegalPage } from "./render-legal.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

for (const page of LEGAL_PAGES) {
  const outPath = join(root, page.output);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, renderLegalPage(page), "utf8");
  console.log("Wrote", page.output);
}
