/** Static legal / info pages (no compression tool). */
export const LEGAL_PAGES = [
  {
    id: "about",
    output: "about/index.html",
    assetPrefix: "..",
    canonical: "/about/",
    title: "About | compressjpg.pro",
    description: "Learn about compressjpg.pro — free browser-based image compression for JPG, PNG, and WebP.",
    h1: "About compressjpg.pro",
    content: `
      <p>compressjpg.pro is a free online image compression tool built for speed, privacy, and simplicity. We help you reduce JPG, PNG, and WebP file sizes directly in your browser—no account required and no files uploaded to our servers.</p>
      <p>Our mission is to offer a clean, modern experience similar to leading SaaS tools: fast uploads, clear before/after results, and compression that runs entirely on your device.</p>
      <h2>What we offer</h2>
      <ul class="legal-list">
        <li>Batch compression for JPG, PNG, and WebP</li>
        <li>Quality and resize controls</li>
        <li>Before/after size comparison and one-click download</li>
        <li>Format-specific landing pages for SEO and focused workflows</li>
      </ul>
      <p>Have questions? Visit our <a href="/contact/">Contact</a> page.</p>
    `,
    priority: "0.5",
  },
  {
    id: "privacy",
    output: "privacy/index.html",
    assetPrefix: "..",
    canonical: "/privacy/",
    title: "Privacy Policy | compressjpg.pro",
    description: "Privacy policy for compressjpg.pro. Your images are processed locally in your browser and are not uploaded to our servers.",
    h1: "Privacy Policy",
    content: `
      <p><strong>Last updated:</strong> May 19, 2026</p>
      <p>compressjpg.pro respects your privacy. This policy explains how our website works and what data we collect.</p>
      <h2>Local processing</h2>
      <p>Image compression happens entirely in your web browser using client-side technology (Canvas API). We do not upload, store, or access your image files on our servers.</p>
      <h2>Data we may collect</h2>
      <ul class="legal-list">
        <li><strong>Usage analytics</strong> — If enabled, anonymous traffic statistics (e.g. page views) may be collected by third-party analytics providers.</li>
        <li><strong>Hosting logs</strong> — Our hosting provider may log standard request metadata (IP address, browser type, pages visited) for security and performance.</li>
      </ul>
      <h2>Cookies</h2>
      <p>We use only essential cookies required for basic site functionality, unless you consent to additional analytics cookies where applicable by law.</p>
      <h2>Contact</h2>
      <p>For privacy-related questions, please use our <a href="/contact/">Contact</a> page.</p>
    `,
    priority: "0.4",
  },
  {
    id: "terms",
    output: "terms/index.html",
    assetPrefix: "..",
    canonical: "/terms/",
    title: "Terms of Service | compressjpg.pro",
    description: "Terms of service for using compressjpg.pro image compression tools.",
    h1: "Terms of Service",
    content: `
      <p><strong>Last updated:</strong> May 19, 2026</p>
      <p>By using compressjpg.pro, you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Service</h2>
      <p>compressjpg.pro provides free online image compression tools on an "as is" basis. We do not guarantee uninterrupted availability or specific compression results.</p>
      <h2>Your responsibility</h2>
      <ul class="legal-list">
        <li>You must have the right to compress and download any images you upload.</li>
        <li>You are responsible for backing up originals before processing.</li>
        <li>Lossy compression (e.g. JPG) may reduce quality; review output before use.</li>
      </ul>
      <h2>Limitation of liability</h2>
      <p>To the fullest extent permitted by law, compressjpg.pro is not liable for any loss or damage arising from use of the service, including data loss or quality degradation.</p>
      <h2>Changes</h2>
      <p>We may update these terms at any time. Continued use of the site constitutes acceptance of the revised terms.</p>
    `,
    priority: "0.4",
  },
  {
    id: "contact",
    output: "contact/index.html",
    assetPrefix: "..",
    canonical: "/contact/",
    title: "Contact | compressjpg.pro",
    description: "Contact compressjpg.pro for support, feedback, or partnership inquiries.",
    h1: "Contact",
    content: `
      <p>We'd love to hear from you. For support, feedback, or general inquiries about compressjpg.pro, reach out using the options below.</p>
      <h2>Email</h2>
      <p><a href="mailto:support@compressjpg.pro">support@compressjpg.pro</a></p>
      <h2>Response time</h2>
      <p>We aim to respond within 2–3 business days. Please include your browser and device type if reporting a technical issue.</p>
      <h2>Privacy</h2>
      <p>Do not email image attachments unless requested. Compression should be done on our <a href="/">online tool</a>, where files stay on your device.</p>
    `,
    priority: "0.5",
  },
];
