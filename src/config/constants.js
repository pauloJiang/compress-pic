/** Supported input MIME types. */
export const ACCEPT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

/** File extension by output MIME type (for downloads). */
export const EXT_MAP = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** File input accept attribute value. */
export const FILE_INPUT_ACCEPT =
  "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp";
