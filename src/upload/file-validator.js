import { isValidImage } from "../compression/mime.js";

/**
 * Filter a FileList / array to supported images only.
 * @param {FileList | File[]} fileListLike
 * @returns {File[]}
 */
export function pickValidImages(fileListLike) {
  return Array.from(fileListLike).filter(isValidImage);
}
