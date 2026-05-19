#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES } from "./pages-data.js";
import { renderPage } from "./render-page.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

for (const page of PAGES) {
  const outPath = join(root, page.output);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, renderPage(page), "utf8");
  console.log("Wrote", page.output);
}
