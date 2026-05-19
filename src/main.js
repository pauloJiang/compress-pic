/**
 * Entry point — bootstraps the image compressor app.
 */
import { AppController } from "./app/controller.js";
import { mountSiteChrome } from "./ui/site-chrome.js";

document.addEventListener("DOMContentLoaded", () => {
  mountSiteChrome();
  // Only init compressor on tool pages (not About/Privacy/etc.)
  if (document.getElementById("dropzone")) {
    new AppController();
  }
});
