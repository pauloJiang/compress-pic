/**
 * Decode a File into an HTMLImageElement.
 * @param {File} file
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Unable to read image"));
    };
    img.src = url;
  });
}

/**
 * Scale dimensions to a maximum width (preserve aspect ratio).
 */
export function scaleDimensions(width, height, maxWidth) {
  if (!maxWidth || width <= maxWidth) return { width, height };
  const ratio = maxWidth / width;
  return {
    width: maxWidth,
    height: Math.round(height * ratio),
  };
}
