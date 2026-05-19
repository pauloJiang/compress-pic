const STORAGE_KEY = "compressjpg.locale";

/** @type {readonly ["en", "ja", "zh"]} */
export const LOCALES = ["en", "ja", "zh"];

/** @returns {"en" | "ja" | "zh"} */
export function detectLocale() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && LOCALES.includes(stored)) return stored;

  const lang = (navigator.language || "en").toLowerCase();
  if (lang.startsWith("ja")) return "ja";
  if (lang.startsWith("zh")) return "zh";
  return "en";
}

/** @param {"en" | "ja" | "zh"} locale */
export function setLocale(locale) {
  if (!LOCALES.includes(locale)) return;
  localStorage.setItem(STORAGE_KEY, locale);
}

export function getStoredLocale() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored && LOCALES.includes(stored) ? stored : null;
}
