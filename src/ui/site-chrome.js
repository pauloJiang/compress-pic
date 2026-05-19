import { NAV_LINKS, RELATED_TOOLS, FOOTER_LINKS } from "../config/nav.js";
import { t, getLocale, changeLocale } from "../i18n/index.js";

/**
 * Mount sticky header nav, language switcher, Related Tools, and footer legal links.
 */
export function mountSiteChrome() {
  const headerHost = document.getElementById("site-header");
  if (headerHost) {
    const active = document.body.dataset.activeNav || "";
    headerHost.outerHTML = renderHeader(active);
    bindLangSwitcher();
  }

  const currentPath = normalizePath(window.location.pathname);

  const relatedHost = document.getElementById("site-related");
  if (relatedHost) {
    relatedHost.innerHTML = renderRelatedTools(currentPath);
  }

  const footerHost = document.getElementById("site-footer-links");
  if (footerHost) {
    footerHost.innerHTML = renderFooterLinks(currentPath);
  }
}

function bindLangSwitcher() {
  const host = document.querySelector(".lang-switcher");
  if (!host || host.dataset.bound === "1") return;
  host.dataset.bound = "1";
  host.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    changeLocale(btn.dataset.lang);
  });
}

function normalizePath(path) {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

function navIdFromHref(href) {
  return href.replace(/^\//, "").replace(/\/$/, "");
}

function renderLangSwitcher() {
  const locale = getLocale();
  const items = [
    { code: "en", label: "EN" },
    { code: "ja", label: "日本語" },
    { code: "zh", label: "中文" },
  ];

  const buttons = items
    .map((item, i) => {
      const sep = i > 0 ? '<span class="lang-sep" aria-hidden="true">|</span>' : "";
      const active = locale === item.code ? " is-active" : "";
      return `${sep}<button type="button" class="lang-btn${active}" data-lang="${item.code}" aria-pressed="${locale === item.code}">${item.label}</button>`;
    })
    .join("");

  return `<div class="lang-switcher" role="group" aria-label="Language">${buttons}</div>`;
}

function renderHeader(activeNav) {
  const navItems = NAV_LINKS.map((link) => {
    const label = t(`nav.${link.id}`);
    return `<a href="${link.href}" class="site-nav-link${activeNav === link.id ? " is-active" : ""}">${label}</a>`;
  }).join("");

  return `<header class="site-header" role="banner">
  <div class="site-header-inner">
    <a href="/" class="site-logo">compressjpg.pro</a>
    <nav class="site-nav" aria-label="Main">${navItems}</nav>
    ${renderLangSwitcher()}
  </div>
</header>`;
}

function renderRelatedTools(currentPath) {
  const links = RELATED_TOOLS.filter((tool) => normalizePath(tool.href) !== currentPath)
    .map((tool) => {
      const label = t(`nav.${navIdFromHref(tool.href)}`);
      return `<a href="${tool.href}" class="related-tool-link">${label}</a>`;
    })
    .join("");

  if (!links) return "";

  return `<section class="related-tools" aria-labelledby="related-tools-heading">
  <h2 id="related-tools-heading" class="related-tools-heading">${t("related.heading")}</h2>
  <div class="related-tools-grid">${links}</div>
</section>`;
}

function renderFooterLinks(currentPath) {
  return FOOTER_LINKS.map((link) => {
    const label = t(`footer.${navIdFromHref(link.href)}`);
    const isCurrent = normalizePath(link.href) === currentPath;
    if (isCurrent) {
      return `<span class="footer-legal-link is-current">${label}</span>`;
    }
    return `<a href="${link.href}" class="footer-legal-link">${label}</a>`;
  }).join("");
}
