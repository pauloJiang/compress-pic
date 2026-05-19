import { $ } from "../utils/dom.js";

/**
 * Compression settings panel (quality, max width, output format).
 */
export class ControlsView {
  constructor() {
    this.panel = $("#controls");
    this.qualityInput = $("#quality");
    this.qualityValue = $("#quality-value");
    this.maxWidthSelect = $("#max-width");
    this.outputFormatSelect = $("#output-format");
    this.compressAllBtn = $("#compress-all");
    this.clearAllBtn = $("#clear-all");

    this.qualityInput.addEventListener("input", () => {
      this.qualityValue.textContent = `${this.qualityInput.value}%`;
    });
  }

  show() {
    this.panel.hidden = false;
  }

  hide() {
    this.panel.hidden = true;
  }

  /** Values passed to the compression engine. */
  getCompressionOptions() {
    return {
      quality: Number(this.qualityInput.value) / 100,
      maxWidth: Number(this.maxWidthSelect.value),
      outputFormat: this.outputFormatSelect.value,
    };
  }

  setCompressAllEnabled(enabled) {
    this.compressAllBtn.disabled = !enabled;
  }

  onCompressAll(handler) {
    this.compressAllBtn.addEventListener("click", handler);
  }

  onClearAll(handler) {
    this.clearAllBtn.addEventListener("click", handler);
  }
}
