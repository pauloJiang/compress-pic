/**
 * @typedef {"pending" | "processing" | "done" | "error"} ItemStatus
 */

/**
 * @typedef {Object} FileItem
 * @property {string} id
 * @property {File} file
 * @property {string} previewUrl - Object URL for original preview
 * @property {Blob | null} compressed
 * @property {string} [compressedUrl] - Object URL for compressed preview
 * @property {string} [outputMime]
 * @property {ItemStatus} status
 * @property {string} [error]
 */

/** In-memory store for uploaded / compressed files. */
export class FileStore {
  constructor() {
    /** @type {Map<string, FileItem>} */
    this.items = new Map();
    this._nextId = 0;
  }

  get size() {
    return this.items.size;
  }

  get(id) {
    return this.items.get(id);
  }

  /** @returns {string[]} */
  ids() {
    return [...this.items.keys()];
  }

  /** @returns {FileItem[]} */
  values() {
    return [...this.items.values()];
  }

  /** Create item from File and register in store. */
  add(file) {
    const id = String(++this._nextId);
    const item = {
      id,
      file,
      previewUrl: URL.createObjectURL(file),
      compressed: null,
      status: "pending",
    };
    this.items.set(id, item);
    return id;
  }

  remove(id) {
    const item = this.items.get(id);
    if (!item) return false;
    this.revokeUrls(item);
    this.items.delete(id);
    return true;
  }

  clear() {
    for (const id of this.ids()) this.remove(id);
  }

  /** Release object URLs to avoid memory leaks. */
  revokeUrls(item) {
    URL.revokeObjectURL(item.previewUrl);
    if (item.compressedUrl) {
      URL.revokeObjectURL(item.compressedUrl);
      item.compressedUrl = undefined;
    }
  }

  /** Attach compressed blob and preview URL. */
  setCompressed(item, blob, mime) {
    if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
    item.compressed = blob;
    item.outputMime = mime;
    item.compressedUrl = URL.createObjectURL(blob);
  }

  clearCompressed(item) {
    item.compressed = null;
    item.outputMime = undefined;
    if (item.compressedUrl) {
      URL.revokeObjectURL(item.compressedUrl);
      item.compressedUrl = undefined;
    }
  }

  isProcessing() {
    return this.values().some((i) => i.status === "processing");
  }
}
