import texts from './texts.json';

type Dict = Record<string, any>;

const get = (key: string, dict: Dict = texts): string | undefined => {
  const parts = key.split('.');
  let cur: any = dict;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  if (typeof cur === 'string') return cur as string;
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

export default { t, tf };

