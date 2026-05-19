/** Page definitions for static HTML generation. */
export const SITE_URL = "https://compressjpg.pro";

const STANDARD_FAQ = [
  {
    q: "Is image compression safe?",
    a: "Yes. This tool runs entirely in your browser. Your images are not uploaded to a server, so you keep full control of your files.",
  },
  {
    q: "Does compression reduce image quality?",
    a: "Lossy formats like JPG may remove fine detail at lower quality settings. At moderate quality (around 70–85%), changes are usually invisible on screens.",
  },
  {
    q: "Can I compress images on mobile?",
    a: "Yes. The tool works on modern mobile browsers. Open the page, upload photos from your gallery, and download compressed files.",
  },
];

export const PAGES = [
  {
    id: "home",
    output: "index.html",
    assetPrefix: "",
    activeNav: "",
    canonical: "/",
    title: "Compress Images Online – Free JPG, PNG & WebP Tool | Compress JPG Pro",
    description:
      "Reduce image size without losing quality. Free, secure, and processed locally in your browser. Compress JPG, PNG, and WebP online.",
    h1: "Compress Images Online",
    subtitle:
      "Reduce image size without losing quality. Free, secure, and processed locally in your browser.",
    dropzoneTitle: "Drop your images here",
    dropzoneHint: "or drag and drop · batch upload supported",
    formatBadges: ["JPG", "PNG", "WebP"],
    defaultFormat: "auto",
    seoWhatExtra:
      "Whether you need smaller JPG photos, optimized PNG graphics, or lightweight WebP assets, compressjpg.pro handles every format in one place.",
    seoHowLead: "Compress any supported image format in a few steps:",
    priority: "1.0",
  },
  {
    id: "compress-jpg",
    output: "compress-jpg/index.html",
    assetPrefix: "..",
    activeNav: "compress-jpg",
    canonical: "/compress-jpg/",
    title: "Compress JPG Online Free | compressjpg.pro",
    description:
      "Compress JPG images online for free without losing quality.",
    h1: "Compress JPG Online",
    subtitle:
      "Reduce JPG file size without losing quality. Free, secure, and processed locally in your browser.",
    dropzoneTitle: "Drop your JPG files here",
    dropzoneHint: "or drag and drop · batch upload supported",
    formatBadges: ["JPG", "JPEG"],
    defaultFormat: "image/jpeg",
    seoWhatExtra:
      "JPG (JPEG) is ideal for photographs. Lossy compression removes data the eye rarely notices, producing much smaller files for web and email.",
    seoHowLead: "Compress JPG files online in a few steps:",
    priority: "0.9",
  },
  {
    id: "compress-png",
    output: "compress-png/index.html",
    assetPrefix: "..",
    activeNav: "compress-png",
    canonical: "/compress-png/",
    title: "Compress PNG Online Free | compressjpg.pro",
    description:
      "Compress PNG images online for free. Reduce PNG file size while keeping transparency.",
    h1: "Compress PNG Online",
    subtitle:
      "Shrink PNG files for faster websites and easier sharing. Processed locally in your browser.",
    dropzoneTitle: "Drop your PNG files here",
    dropzoneHint: "or drag and drop · transparency supported",
    formatBadges: ["PNG"],
    defaultFormat: "image/png",
    seoWhatExtra:
      "PNG uses lossless compression and supports transparency, making it popular for logos, icons, and UI graphics.",
    seoHowLead: "Compress PNG images online in a few steps:",
    priority: "0.9",
  },
  {
    id: "compress-webp",
    output: "compress-webp/index.html",
    assetPrefix: "..",
    activeNav: "compress-webp",
    canonical: "/compress-webp/",
    title: "Compress WebP Online Free | compressjpg.pro",
    description:
      "Compress WebP images online for free. Modern format with excellent compression efficiency.",
    h1: "Compress WebP Online",
    subtitle:
      "Optimize WebP images for modern websites. Fast, free, and private browser-side processing.",
    dropzoneTitle: "Drop your WebP files here",
    dropzoneHint: "or drag and drop · batch upload supported",
    formatBadges: ["WebP"],
    defaultFormat: "image/webp",
    seoWhatExtra:
      "WebP offers strong compression for photos and graphics, often producing smaller files than JPG or PNG at similar visual quality.",
    seoHowLead: "Compress WebP files online in a few steps:",
    priority: "0.9",
  },
  {
    id: "jpg-to-200kb",
    output: "jpg-to-200kb/index.html",
    assetPrefix: "..",
    activeNav: "jpg-to-200kb",
    canonical: "/jpg-to-200kb/",
    title: "Compress JPG to 200KB Free | compressjpg.pro",
    description:
      "Compress JPG images to 200KB or less online. Free tool with quality and resize controls.",
    h1: "Compress JPG to 200KB",
    subtitle:
      "Hit upload limits and email caps by shrinking JPG files toward 200KB. Adjust quality until you reach your target.",
    dropzoneTitle: "Drop JPG files to compress under 200KB",
    dropzoneHint: "lower quality or resize width if the file is still too large",
    formatBadges: ["JPG", "200KB"],
    defaultFormat: "image/jpeg",
    seoWhatExtra:
      "Many forms, job portals, and email services cap attachments around 200KB. Compressing JPGs helps you stay within limits without abandoning the format.",
    seoHowLead: "Compress JPG to around 200KB in a few steps:",
    priority: "0.85",
  },
];

export function getFaq(page) {
  return STANDARD_FAQ;
}
