import { SITE_URL } from "./pages-data.js";

export function renderLegalPage(page) {
  const prefix = page.assetPrefix ? `${page.assetPrefix}/` : "";
  const css = `${prefix}styles.css`;
  const js = `${prefix}src/main.js`;
  const canonical = `${SITE_URL}${page.canonical}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${css}">
</head>
<body class="has-site-header legal-page">
  <div id="site-header" class="site-header-host"></div>
  <main class="app legal-app">
    <div class="container">
      <article class="legal-article">
        <header class="legal-header"><h1>${page.h1}</h1></header>
        <div class="legal-body">${page.content}</div>
      </article>
      <div id="site-related"></div>
      <footer class="footer">
        <p>All processing happens on your device. Nothing is uploaded to a server.</p>
        <nav id="site-footer-links" class="footer-legal" aria-label="Legal"></nav>
      </footer>
    </div>
  </main>
  <script type="module" src="${js}"></script>
</body>
</html>`;
}
