import en from './en';
import zh from './zh';

type DeepDictionary = {
  [key: string]: string | DeepDictionary | Array<any>;
};

export const LANGUAGES: Record<string, DeepDictionary> = {
  en,
  zh
};

export type Language = keyof typeof LANGUAGES;

export const defaultLang = 'zh';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in LANGUAGES) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = LANGUAGES[lang];
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    if (typeof value === 'string') return value;
    return key;
  };
}

export function getLocalizedPath(lang: Language, path: string): string {
  const [, ...rest] = path.split('/');
  
  // 检查第一部分是否是语言代码
  if (Object.keys(LANGUAGES).includes(rest[0])) {
    rest.shift(); // 移除语言代码
  }
  
  return lang === defaultLang ? `/${rest.join('/')}` : `/${lang}/${rest.join('/')}`;
}
