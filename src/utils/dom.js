/** Shorthand for document.querySelector. */
export function $(selector, root = document) {
  return root.querySelector(selector);
}
