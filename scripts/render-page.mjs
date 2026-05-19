import { SITE_URL, getFaq } from "./pages-data.js";

function assetPath(prefix, path) {
  if (!prefix) return path;
  return `${prefix}/${path}`;
}

function formatOption(value, label, selected) {
  return `<option value="${value}"${selected ? " selected" : ""}>${label}</option>`;
}

function renderTool(page) {
  const p = page.assetPrefix ? `${page.assetPrefix}/` : "";
  const badges = page.formatBadges
    .map((b) => `<span class="format-badge">${b}</span>`)
    .join("");

  const formats = [
    formatOption("auto", "Keep original", page.defaultFormat === "auto"),
    formatOption("image/jpeg", "JPG", page.defaultFormat === "image/jpeg"),
    formatOption("image/png", "PNG", page.defaultFormat === "image/png"),
    formatOption("image/webp", "WebP", page.defaultFormat === "image/webp"),
  ].join("");

  return `
      <section class="hero-fold">
        <header class="header">
          <h1>${page.h1}</h1>
          <p class="subtitle">${page.subtitle}</p>
        </header>
        <section class="hero" aria-label="Upload images">
          <div class="upload-shell">
            <label id="dropzone" class="dropzone" for="file-input" tabindex="0" aria-label="Drag and drop images or click to upload">
              <input id="file-input" type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" multiple hidden>
              <span class="dropzone-border" aria-hidden="true">
                <svg class="dropzone-border-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <rect class="dropzone-border-rect" x="1.25" y="1.25" width="97.5" height="97.5" rx="3.5" ry="3.5"/>
                </svg>
              </span>
              <span class="dropzone-bg" aria-hidden="true"></span>
              <span class="dropzone-content">
                <span class="dropzone-icon-wrap" aria-hidden="true">
                  <svg class="dropzone-icon" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <rect x="4" y="8" width="22" height="18" rx="3" stroke="currentColor" stroke-width="1.75"/>
                    <circle cx="13" cy="15" r="2.25" fill="currentColor"/>
                    <path d="M4 30l7-7 5 5 6-8 14 10" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M26 14v10m0 0l-3.5-3.5M26 24l3.5-3.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="dropzone-title">${page.dropzoneTitle}</span>
                <span class="dropzone-cta"><span class="dropzone-cta-btn">Click to upload</span></span>
                <span class="dropzone-hint">${page.dropzoneHint}</span>
                <span class="format-badges" aria-hidden="true">${badges}</span>
              </span>
            </label>
          </div>
        </section>
      </section>
      <div class="workspace">
        <section id="controls" class="controls card" hidden>
          <h2 class="card-heading">Compression settings</h2>
          <div class="controls-grid">
            <p class="control-row">
              <label for="quality">Quality</label>
              <span class="quality-wrap">
                <input id="quality" type="range" min="10" max="100" value="80">
                <span id="quality-value" class="quality-value">80%</span>
              </span>
            </p>
            <p class="control-row">
              <label for="max-width">Max width</label>
              <select id="max-width">
                <option value="0">No resize</option>
                <option value="1920" selected>1920px</option>
                <option value="1280">1280px</option>
                <option value="800">800px</option>
              </select>
            </p>
            <p class="control-row">
              <label for="output-format">Output format</label>
              <select id="output-format">${formats}</select>
            </p>
          </div>
          <div class="controls-actions">
            <button id="compress-all" type="button" class="btn btn-primary">Compress all</button>
            <button id="clear-all" type="button" class="btn btn-ghost">Clear list</button>
          </div>
        </section>
        <section class="results-section" id="results-section" hidden>
          <h2 class="results-heading">Results</h2>
          <ul id="file-list" class="file-list" aria-live="polite"></ul>
        </section>
      </div>`;
}

function renderSeo(page) {
  const faq = getFaq(page)
    .map(
      (item) => `<div class="faq-item">
              <h3 class="faq-question">${item.q}</h3>
              <p class="faq-answer">${item.a}</p>
            </div>`
    )
    .join("");

  return `
      <section class="seo-content" aria-label="About image compression">
        <article class="seo-block" id="what-is-image-compression">
          <h2>What is image compression?</h2>
          <p>Image compression reduces file size by removing redundant data or using efficient encoding—so images load faster while still looking sharp on screen. ${page.seoWhatExtra}</p>
        </article>
        <article class="seo-block" id="how-to-compress-images-online">
          <h2>How to compress images online</h2>
          <p>${page.seoHowLead}</p>
          <ol class="seo-steps">
            <li>Drag and drop your images into the upload area, or click <strong>Click to upload</strong>.</li>
            <li>Adjust <strong>Quality</strong> and <strong>Max width</strong> to balance size and clarity.</li>
            <li>Click <strong>Compress</strong> and compare before/after file sizes.</li>
            <li>Download optimized files when you are satisfied with the results.</li>
          </ol>
        </article>
        <article class="seo-block" id="faq">
          <h2>FAQ</h2>
          <div class="faq-list">${faq}</div>
        </article>
      </section>`;
}

function renderJsonLd(page) {
  const url = `${SITE_URL}${page.canonical}`;
  const faq = getFaq(page);
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: page.h1,
          description: page.description,
          isPartOf: { "@id": `${SITE_URL}/#website` },
        },
        {
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        },
      ],
    },
    null,
    2
  );
}

/** Build full HTML document for a page config. */
export function renderPage(page) {
  const css = assetPath(page.assetPrefix, "styles.css");
  const js = assetPath(page.assetPrefix, "src/main.js");
  const canonical = `${SITE_URL}${page.canonical}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="robots" content="index, follow">
  <meta name="googlebot" content="index, follow">
  <meta name="theme-color" content="#6ab04c">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:image" content="${SITE_URL}/assets/og-image.svg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${css}">
  <script type="application/ld+json">${renderJsonLd(page)}</script>
</head>
<body class="has-site-header" data-page-id="${page.id}" data-active-nav="${page.activeNav}">
  <div id="site-header" class="site-header-host"></div>
  <main class="app">
    <div class="container">
${renderTool(page)}
${renderSeo(page)}
      <div id="site-related"></div>
      <footer class="footer">
        <p>All processing happens on your device. Nothing is uploaded to a server.</p>
        <nav id="site-footer-links" class="footer-legal" aria-label="Legal"></nav>
      </footer>
    </div>
  </main>
  <script type="module" src="${js}"></script>
</body>
</html>
`;
}
