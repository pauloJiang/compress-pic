import { renderCardHtml } from "./components/result-card.js";

/**
 * Renders file result cards into #file-list and delegates button clicks.
 */
export class FileListView {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.listEl - <ul id="file-list">
   * @param {HTMLElement} options.resultsSection - #results-section
   */
  constructor({ listEl, resultsSection }) {
    this.listEl = listEl;
    this.resultsSection = resultsSection;
    /** @type {{ onCompress?: (id: string) => void, onDownload?: (id: string) => void, onRemove?: (id: string) => void }} */
    this.handlers = {};

    this.listEl.addEventListener("click", (e) => {
      const card = e.target.closest(".file-card");
      if (!card?.dataset.id) return;
      const id = card.dataset.id;
      if (e.target.closest(".btn-compress")) this.handlers.onCompress?.(id);
      else if (e.target.closest(".btn-download")) this.handlers.onDownload?.(id);
      else if (e.target.closest(".btn-remove")) this.handlers.onRemove?.(id);
    });
  }

  on(handlers) {
    Object.assign(this.handlers, handlers);
  }

  showSection() {
    this.resultsSection.removeAttribute("hidden");
  }

  hideSection() {
    this.resultsSection.setAttribute("hidden", "");
  }

  /**
   * Create or update a card for the given id.
   * @param {import("../store/file-store.js").FileItem} item
   */
  render(item) {
    let card = document.getElementById(`file-${item.id}`);
    if (!card) {
      card = document.createElement("li");
      card.id = `file-${item.id}`;
      this.listEl.prepend(card);
    }

    card.dataset.id = item.id;
    const isDone = item.status === "done" && item.compressed;
    card.className = `file-card status-${item.status}${isDone ? " file-card--result" : ""}`;
    card.innerHTML = renderCardHtml(item);
  }

  /** Remove card node from DOM. */
  removeNode(id) {
    document.getElementById(`file-${id}`)?.remove();
  }
}
