import { detectLocale, setLocale, LOCALES } from "./locale.js";
import { MESSAGES } from "./messages/index.js";

let currentLocale = detectLocale();

/** @returns {"en" | "ja" | "zh"} */
export function getLocale() {
  return currentLocale;
}

/** @param {"en" | "ja" | "zh"} locale */
export function changeLocale(locale) {
  if (!LOCALES.includes(locale)) return;
  setLocale(locale);
  currentLocale = locale;
  document.dispatchEvent(new CustomEvent("localechange", { detail: { locale } }));
}

/**
 * Translate a dot-path key, e.g. `ui.compressAll` or `nav.compress-jpg`.
 * @param {string} key
 * @param {Record<string, string>} [vars]
 */
export function t(key, vars) {
  const raw = resolveKey(MESSAGES[currentLocale], key) ?? resolveKey(MESSAGES.en, key) ?? key;
  if (!vars) return raw;
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v)),
    raw
  );
}

function resolveKey(obj, path) {
  return path.split(".").reduce((o, k) => (o && k in o ? o[k] : undefined), obj);
}

function normalizePath(path) {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

const PATH_PAGE = {
  "/": "home",
  "/compress-jpg/": "compress-jpg",
  "/compress-png/": "compress-png",
  "/compress-webp/": "compress-webp",
  "/jpg-to-200kb/": "jpg-to-200kb",
  "/about/": "about",
  "/privacy/": "privacy",
  "/terms/": "terms",
  "/contact/": "contact",
};

export function getPageId() {
  return document.body.dataset.pageId || PATH_PAGE[normalizePath(window.location.pathname)] || null;
}

function getPageCopy(pageId) {
  const msg = MESSAGES[currentLocale];
  if (msg.legal?.[pageId]) return { kind: "legal", data: msg.legal[pageId] };
  if (msg.pages?.[pageId]) return { kind: "tool", data: msg.pages[pageId] };
  return null;
}

function setMeta(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setOg(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${name}"]`);
  if (el) el.setAttribute("content", content);
}

function renderFaqHtml(faq) {
  return faq
    .map(
      (item) =>
        `<div class="faq-item"><h3 class="faq-question">${item.q}</h3><p class="faq-answer">${item.a}</p></div>`
    )
    .join("");
}

/** Apply translations to the current page DOM. */
export function applyPageTranslations() {
  const pageId = getPageId();
  const msg = MESSAGES[currentLocale];
  const htmlLang = currentLocale === "zh" ? "zh-CN" : currentLocale === "ja" ? "ja" : "en";
  document.documentElement.lang = htmlLang;

  // Shared UI
  const map = {
    ".dropzone-cta-btn": msg.ui.dropzoneCta,
    "#controls .card-heading": msg.ui.compressionSettings,
    'label[for="quality"]': msg.ui.quality,
    'label[for="max-width"]': msg.ui.maxWidth,
    'label[for="output-format"]': msg.ui.outputFormat,
    "#compress-all": msg.ui.compressAll,
    "#clear-all": msg.ui.clearList,
    ".results-heading": msg.ui.results,
    "#what-is-image-compression h2": msg.seo.whatIsTitle,
    "#how-to-compress-images-online h2": msg.seo.howToTitle,
    "#faq > h2": msg.seo.faqTitle,
    ".related-tools-heading": msg.related.heading,
    ".footer > p": msg.footer.note,
  };

  for (const [sel, text] of Object.entries(map)) {
    const el = document.querySelector(sel);
    if (el && text) el.textContent = text;
  }

  const dropzone = document.getElementById("dropzone");
  if (dropzone) dropzone.setAttribute("aria-label", msg.ui.dropzoneAria);
  const hero = document.querySelector(".hero");
  if (hero) hero.setAttribute("aria-label", msg.ui.uploadHeroAria);
  const seoSection = document.querySelector(".seo-content");
  if (seoSection) seoSection.setAttribute("aria-label", msg.ui.seoAria);

  const maxWidth = document.getElementById("max-width");
  if (maxWidth) {
    const opt0 = maxWidth.querySelector('option[value="0"]');
    if (opt0) opt0.textContent = msg.ui.noResize;
  }
  const formatSelect = document.getElementById("output-format");
  if (formatSelect) {
    const auto = formatSelect.querySelector('option[value="auto"]');
    if (auto) auto.textContent = msg.ui.keepOriginal;
  }

  const pageCopy = pageId ? getPageCopy(pageId) : null;
  if (!pageCopy) return;

  const { data } = pageCopy;
  if (data.title) document.title = data.title;
  setMeta("description", data.description);
  setOg("og:title", data.title);
  setOg("og:description", data.description);
  setMeta("twitter:title", data.title);
  setMeta("twitter:description", data.description);

  if (pageCopy.kind === "legal") {
    const h1 = document.querySelector(".legal-header h1");
    const body = document.querySelector(".legal-body");
    if (h1 && data.h1) h1.textContent = data.h1;
    if (body && data.content) body.innerHTML = data.content;
    return;
  }

  const h1 = document.querySelector(".header h1");
  const subtitle = document.querySelector(".header .subtitle");
  const dzTitle = document.querySelector(".dropzone-title");
  const dzHint = document.querySelector(".dropzone-hint");
  if (h1 && data.h1) h1.textContent = data.h1;
  if (subtitle && data.subtitle) subtitle.textContent = data.subtitle;
  if (dzTitle && data.dropzoneTitle) dzTitle.textContent = data.dropzoneTitle;
  if (dzHint && data.dropzoneHint) dzHint.textContent = data.dropzoneHint;

  const seoWhatP = document.querySelector("#what-is-image-compression p");
  if (seoWhatP && data.seoWhatP) seoWhatP.textContent = data.seoWhatP;

  const seoHowLead = document.querySelector("#how-to-compress-images-online > p");
  if (seoHowLead && data.seoHowLead) seoHowLead.textContent = data.seoHowLead;

  const steps = document.querySelector(".seo-steps");
  if (steps && data.seoSteps) {
    steps.innerHTML = data.seoSteps.map((s) => `<li>${s}</li>`).join("");
  }

  const faqList = document.querySelector(".faq-list");
  if (faqList && data.faq) faqList.innerHTML = renderFaqHtml(data.faq);
}

/** Run locale detection and apply strings once on load. */
export function initI18n() {
  currentLocale = detectLocale();
  applyPageTranslations();
}

