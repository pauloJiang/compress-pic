import { EXT_MAP } from "../config/constants.js";
import { compressImage } from "../compression/compress.js";
import { detectMime } from "../compression/mime.js";
import { pickValidImages } from "../upload/file-validator.js";
import { bindDropzone } from "../upload/dropzone.js";
import { FileStore } from "../store/file-store.js";
import { ControlsView } from "../ui/controls-view.js";
import { FileListView } from "../ui/file-list-view.js";
import { $ } from "../utils/dom.js";

/**
 * Application controller: connects upload, compression, store, and UI.
 */
export class AppController {
  constructor() {
    this.store = new FileStore();
    this.controls = new ControlsView();
    this.fileList = new FileListView({
      listEl: $("#file-list"),
      resultsSection: $("#results-section"),
    });

    bindDropzone({
      dropzone: $("#dropzone"),
      fileInput: $("#file-input"),
      onFiles: (files) => this.handleUpload(files),
    });

    this.fileList.on({
      onCompress: (id) => this.compressOne(id),
      onDownload: (id) => this.download(id),
      onRemove: (id) => this.remove(id),
    });

    this.controls.onCompressAll(() => this.compressAll());
    this.controls.onClearAll(() => this.clearAll());
  }

  /** Handle files from dropzone or file input. */
  handleUpload(fileListLike) {
    const files = pickValidImages(fileListLike);
    if (files.length === 0) return;

    for (const file of files) {
      const id = this.store.add(file);
      this.fileList.render(this.store.get(id));
    }

    this.controls.show();
    this.fileList.showSection();
    this.syncCompressAllButton();
  }

  async compressOne(id) {
    const item = this.store.get(id);
    if (!item || item.status === "processing") return;

    item.status = "processing";
    item.error = undefined;
    this.store.clearCompressed(item);
    this.fileList.render(item);
    this.syncCompressAllButton();

    try {
      const result = await compressImage(item.file, this.controls.getCompressionOptions());
      this.store.setCompressed(item, result.blob, result.mime);
      item.status = "done";
      if (result.note) item.error = result.note;
    } catch (e) {
      item.status = "error";
      item.error = e instanceof Error ? e.message : "Compression failed";
    }

    this.fileList.render(item);
    this.syncCompressAllButton();
  }

  async compressAll() {
    const ids = this.store.ids().filter((id) => this.store.get(id)?.status !== "processing");
    for (const id of ids) {
      await this.compressOne(id);
    }
  }

  download(id) {
    const item = this.store.get(id);
    if (!item?.compressed) return;

    const mime = item.outputMime || detectMime(item.file);
    const ext = EXT_MAP[mime] || "jpg";
    const baseName = item.file.name.replace(/\.[^.]+$/, "");
    const url = URL.createObjectURL(item.compressed);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}-compressed.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  remove(id) {
    if (!this.store.remove(id)) return;
    this.fileList.removeNode(id);

    if (this.store.size === 0) {
      this.controls.hide();
      this.fileList.hideSection();
    }
    this.syncCompressAllButton();
  }

  clearAll() {
    for (const id of [...this.store.ids()]) this.remove(id);
  }

  syncCompressAllButton() {
    const enabled = !this.store.isProcessing() && this.store.size > 0;
    this.controls.setCompressAllEnabled(enabled);
  }
}
