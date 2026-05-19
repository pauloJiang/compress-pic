import { formatBytes, calcSavedPercent } from "../../utils/format.js";
import { escapeHtml } from "../../utils/html.js";
import { t } from "../../i18n/index.js";

/** @typedef {import("../../store/file-store.js").FileItem} FileItem */

const DOWNLOAD_ICON =
  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
  '<path d="M8 2v8m0 0l3-3m-3 3L5 7M3 12h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const ARROW_ICON =
  '<svg width="20" height="20" viewBox="0 0 20 20" fill="none">' +
  '<path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/** Build saved-percent pill markup. */
function savedPillHtml(saved) {
  if (saved === null) return "";
  if (saved > 0) return `<span class="saved-pill">${t("result.savedPct", { n: saved })}</span>`;
  if (saved === 0) return `<span class="saved-pill saved-pill--neutral">${t("result.savedZero")}</span>`;
  return `<span class="saved-pill saved-pill--warn">${t("result.savedWarn", { n: Math.abs(saved) })}</span>`;
}

/** HTML for a completed compression result card. */
export function renderDoneCard(item) {
  const originalSize = item.file.size;
  const compressedSize = item.compressed?.size ?? null;
  const saved = calcSavedPercent(originalSize, compressedSize);
  const beforeLabel = formatBytes(originalSize);
  const afterLabel = compressedSize !== null ? formatBytes(compressedSize) : "—";
  const name = escapeHtml(item.file.name);
  const disabled = item.status === "processing" ? "disabled" : "";
  const afterPct =
    originalSize > 0 && compressedSize !== null
      ? Math.min(100, Math.round((compressedSize / originalSize) * 100))
      : 100;
  const note = item.error ? `<p class="result-note">${escapeHtml(item.error)}</p>` : "";

  const D = "d" + "iv";

  return [
    "<article class=\"result-card\">",
    "<header class=\"result-header\">",
    `<p class="result-name" title="${name}">${name}</p>`,
    savedPillHtml(saved),
    "</header>",
    note,
    `<${D} class="compare-row">`,
    "<figure class=\"compare-pane compare-before\">",
    `<span class="compare-tag">${t("result.before")}</span>`,
    `<${D} class="compare-img-wrap"><img src="${item.previewUrl}" alt="Before preview" loading="lazy"></${D}>`,
    `<span class="compare-size">${beforeLabel}</span>`,
    "</figure>",
    `<span class="compare-arrow" aria-hidden="true">${ARROW_ICON}</span>`,
    "<figure class=\"compare-pane compare-after\">",
    `<span class="compare-tag compare-tag--accent">${t("result.after")}</span>`,
    `<${D} class="compare-img-wrap"><img src="${item.compressedUrl || item.previewUrl}" alt="After preview" loading="lazy"></${D}>`,
    `<span class="compare-size compare-size--accent">${afterLabel}</span>`,
    "</figure>",
    `</${D}>`,
    `<${D} class="size-compare" aria-hidden="true">`,
    "<span class=\"size-compare-track\">",
    "<span class=\"size-compare-before\" style=\"width:100%\"></span>",
    `<span class="size-compare-after" style="width:${afterPct}%"></span>`,
    "</span>",
    "<span class=\"size-compare-labels\">",
    `<span>${beforeLabel}</span><span>${afterLabel}</span>`,
    "</span>",
    `</${D}>`,
    "<footer class=\"result-footer\">",
    `<${D} class="result-stats-inline">`,
    `<span><em>${t("result.original")}</em> ${beforeLabel}</span>`,
    `<span><em>${t("result.compressed")}</em> ${afterLabel}</span>`,
    saved !== null ? `<span class="result-stats-saved"><em>${t("result.saved")}</em> ${saved}%</span>` : "",
    `</${D}>`,
    `<${D} class="result-actions">`,
    `<button type="button" class="btn btn-ghost btn-compress" ${disabled}>${t("result.recompress")}</button>`,
    `<button type="button" class="btn btn-primary btn-download">${DOWNLOAD_ICON}${t("result.download")}</button>`,
    `<button type="button" class="btn btn-ghost btn-remove">${t("result.remove")}</button>`,
    `</${D}>`,
    "</footer>",
    "</article>",
  ].join("");
}

/** HTML for pending / processing state. */
export function renderPendingCard(item) {
  const beforeLabel = formatBytes(item.file.size);
  const name = escapeHtml(item.file.name);
  const disabled = item.status === "processing" ? "disabled" : "";
  const compressLabel = item.status === "done" ? t("result.recompress") : t("result.compress");

  const statusHint =
    item.status === "processing"
      ? t("result.compressing")
      : item.status === "error"
        ? item.error || t("result.failed")
        : t("result.ready");
  const metaClass =
    item.status === "error" ? "pending-meta pending-meta--error" : "pending-meta";
  const processingOverlay =
    item.status === "processing"
      ? '<span class="pending-overlay"><span class="pending-spinner"></span></span>'
      : "";

  const D = "d" + "iv";

  return [
    "<article class=\"result-card result-card--pending\">",
    `<${D} class="pending-row">`,
    `<${D} class="pending-preview${item.status === "processing" ? " is-processing" : ""}">`,
    `<img src="${item.previewUrl}" alt="" loading="lazy">`,
    processingOverlay,
    `</${D}>`,
    `<${D} class="pending-body">`,
    `<p class="result-name" title="${name}">${name}</p>`,
    `<p class="${metaClass}">${escapeHtml(statusHint)} · ${beforeLabel}</p>`,
    `<${D} class="pending-actions">`,
    `<button type="button" class="btn btn-primary btn-compress" ${disabled}>${compressLabel}</button>`,
    `<button type="button" class="btn btn-ghost btn-remove">${t("result.remove")}</button>`,
    `</${D}>`,
    `</${D}>`,
    `</${D}>`,
    "</article>",
  ].join("");
}

/** Pick template for current item state. */
export function renderCardHtml(item) {
  const isDone = item.status === "done" && item.compressed;
  return isDone ? renderDoneCard(item) : renderPendingCard(item);
}
