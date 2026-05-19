/**
 * Wire drag-and-drop and keyboard upload to a dropzone label.
 * @param {Object} options
 * @param {HTMLElement} options.dropzone
 * @param {HTMLInputElement} options.fileInput
 * @param {(files: FileList | File[]) => void} options.onFiles
 */
export function bindDropzone({ dropzone, fileInput, onFiles }) {
  let dragDepth = 0;

  dropzone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInput.click();
    }
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files?.length) onFiles(fileInput.files);
    fileInput.value = "";
  });

  dropzone.addEventListener("dragenter", (e) => {
    e.preventDefault();
    dragDepth += 1;
    dropzone.classList.add("dragover");
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  dropzone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dragDepth -= 1;
    if (dragDepth <= 0) {
      dragDepth = 0;
      dropzone.classList.remove("dragover");
    }
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dragDepth = 0;
    dropzone.classList.remove("dragover");
    if (e.dataTransfer?.files?.length) onFiles(e.dataTransfer.files);
  });
}
