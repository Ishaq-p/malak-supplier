export const SUPPORTED_LANGS = ["en", "tr"];
export const DEFAULT_LANG = "en";

// Next 15 passes `searchParams` to pages as a Promise — always await it
// before calling this. See app/page.js etc. for the pattern.
export function resolveLang(searchParams) {
  const lang = searchParams?.lang;
  return SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
}
