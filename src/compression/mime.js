import { ACCEPT_TYPES } from "../config/constants.js";

/** Whether the file is a supported image (by MIME or extension). */
export function isValidImage(file) {
  if (ACCEPT_TYPES.has(file.type)) return true;
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "webp";
}

/** Resolve MIME type from File metadata or filename. */
export function detectMime(file) {
  if (ACCEPT_TYPES.has(file.type)) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  return "image/jpeg";
}

/**
 * Resolve output MIME from user setting.
 * @param {string} originalMime
 * @param {string} formatOption - "auto" or explicit MIME
 */
export function resolveOutputMime(originalMime, formatOption) {
  if (formatOption !== "auto") return formatOption;
  return originalMime;
}
