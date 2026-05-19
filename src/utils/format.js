/**
 * Human-readable file size (B, KB, MB, GB).
 * @param {number} bytes
 */
export function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value < 10 && i > 0 ? value.toFixed(1) : Math.round(value)} ${sizes[i]}`;
}

/**
 * Savings percentage (negative if file grew).
 * @param {number} originalSize
 * @param {number | null} compressedSize
 */
export function calcSavedPercent(originalSize, compressedSize) {
  if (compressedSize === null) return null;
  return Math.round((1 - compressedSize / originalSize) * 100);
}
