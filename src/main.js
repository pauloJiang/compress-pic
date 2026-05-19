/**
 * Entry point — bootstraps the image compressor app.
 */
import { AppController } from "./app/controller.js";
import { mountSiteChrome } from "./ui/site-chrome.js";
import { initI18n, applyPageTranslations } from "./i18n/index.js";

/** @type {AppController | null} */
let app = null;

document.addEventListener("DOMContentLoaded", () => {
  initI18n();
  mountSiteChrome();

  if (document.getElementById("dropzone")) {
    app = new AppController();
  }
});

document.addEventListener("localechange", () => {
  applyPageTranslations();
  mountSiteChrome();
  app?.refreshLocale();
});
