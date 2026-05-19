import { detectMime, resolveOutputMime } from "./mime.js";
import { loadImage, scaleDimensions } from "./image-loader.js";

/**
 * @typedef {Object} CompressionOptions
 * @property {number} quality - 0–1
 * @property {number} maxWidth - 0 = no resize
 * @property {string} outputFormat - "auto" | MIME string
 */

/**
 * @typedef {Object} CompressionResult
 * @property {Blob} blob
 * @property {string} mime
 * @property {string} [note] - Optional user-facing note
 */

/** Encode canvas to Blob (quality only for JPEG/WebP). */
function canvasToBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => {
    const useQuality = mime === "image/jpeg" || mime === "image/webp";
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Compression failed"));
      },
      mime,
      useQuality ? quality : undefined
    );
  });
}

/** Draw image onto canvas with optional white background (JPEG). */
function drawToCanvas(img, width, height, outputMime) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available");

  if (outputMime === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img, 0, 0, width, height);
  return canvas;
}

/**
 * Compress a single image file in the browser.
 * @param {File} file
 * @param {CompressionOptions} options
 * @returns {Promise<CompressionResult>}
 */
export async function compressImage(file, options) {
  const originalMime = detectMime(file);
  const outputMime = resolveOutputMime(originalMime, options.outputFormat);
  const quality = options.quality;
  const maxWidth = options.maxWidth;

  const img = await loadImage(file);
  const { width, height } = scaleDimensions(
    img.naturalWidth,
    img.naturalHeight,
    maxWidth
  );

  const canvas = drawToCanvas(img, width, height, outputMime);
  let blob = await canvasToBlob(canvas, outputMime, quality);

  // Fallback: convert oversized PNG to JPEG when smaller
  if (outputMime === "image/png" && blob.size >= file.size) {
    const jpegCanvas = drawToCanvas(img, width, height, "image/jpeg");
    const jpegBlob = await canvasToBlob(jpegCanvas, "image/jpeg", quality);
    if (jpegBlob.size < blob.size) {
      return {
        blob: jpegBlob,
        mime: "image/jpeg",
        note: "PNG converted to JPG for better compression",
      };
    }
  }

  return { blob, mime: outputMime };
}
