import { en } from './en';
import { uk } from './uk';

export type Language = 'en' | 'uk';

export const translations = {
  en,
  uk,
} as const;

export const getTranslation = (lang: Language) => translations[lang];
