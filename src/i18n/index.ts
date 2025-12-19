import idTexts from './texts.json';
import enTexts from './texts.en.json';

type Dict = Record<string, any>;
type Locale = 'id' | 'en';

const availableLocales: Locale[] = ['id', 'en'];
let currentLocale: Locale = (import.meta as any).env?.VITE_LOCALE === 'en' ? 'en' : 'id';
const dicts: Record<Locale, Dict> = { id: idTexts as any, en: enTexts as any };
const listeners: Array<(locale: Locale) => void> = [];

export const getLocale = (): Locale => currentLocale;
export const setLocale = (locale: Locale) => {
  currentLocale = locale;
  try { localStorage.setItem('bj_locale', locale); } catch {}
  for (const fn of listeners) { try { fn(locale); } catch {} }
};
export const onLocaleChange = (fn: (locale: Locale) => void): (() => void) => {
  listeners.push(fn);
  return () => { const i = listeners.indexOf(fn); if (i >= 0) listeners.splice(i, 1); };
};
try {
  const stored = localStorage.getItem('bj_locale');
  if (stored === 'en' || stored === 'id') currentLocale = stored as any;
} catch {}

const get = (key: string): string | undefined => {
  const dict: Dict = dicts[currentLocale] ?? dicts['id'] ?? {};
  const parts = key.split('.');
  let cur: any = dict;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  if (typeof cur === 'string') return cur as string;
  if (dicts['id']) {
    let curId: any = dicts['id'];
    for (const p of parts) {
      if (curId == null) return undefined;
      curId = curId[p];
    }
    if (typeof curId === 'string') return curId as string;
  }
  return undefined;
};

export const t = (key: string, fallback?: string): string => {
  const v = get(key);
  return v != null ? v : (fallback ?? key);
};

export const tf = (key: string, params: Record<string, string | number>, fallback?: string): string => {
  const base = t(key, fallback);
  return Object.keys(params).reduce((s, k) => s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(params[k])), base);
};

export default { t, tf, getLocale, setLocale, onLocaleChange, availableLocales };
