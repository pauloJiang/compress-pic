import { NAV_LINKS, RELATED_TOOLS } from "../config/nav.js";

/**
 * Mount sticky header nav and Related Tools footer block.
 * Set <body data-active-nav="compress-jpg"> on each page for active state.
 */
export function mountSiteChrome() {
  const headerHost = document.getElementById("site-header");
  if (headerHost) {
    const active = document.body.dataset.activeNav || "";
    headerHost.outerHTML = renderHeader(active);
  }

  const relatedHost = document.getElementById("site-related");
  if (relatedHost) {
    const currentPath = normalizePath(window.location.pathname);
    relatedHost.innerHTML = renderRelatedTools(currentPath);
  }
}

function normalizePath(path) {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

function renderHeader(activeNav) {
  const navItems = NAV_LINKS.map(
    (link) =>
      `<a href="${link.href}" class="site-nav-link${activeNav === link.id ? " is-active" : ""}">${link.label}</a>`
  ).join("");

  return `<header class="site-header" role="banner">
  <div class="site-header-inner">
    <a href="/" class="site-logo">compressjpg.pro</a>
    <nav class="site-nav" aria-label="Main">${navItems}</nav>
  </div>
</header>`;
}

function renderRelatedTools(currentPath) {
  const links = RELATED_TOOLS.filter(
    (tool) => normalizePath(tool.href) !== currentPath
  )
    .map((tool) => `<a href="${tool.href}" class="related-tool-link">${tool.label}</a>`)
    .join("");

  return `<section class="related-tools" aria-labelledby="related-tools-heading">
  <h2 id="related-tools-heading" class="related-tools-heading">Related Tools</h2>
  <div class="related-tools-grid">${links}</div>
</section>`;
}
