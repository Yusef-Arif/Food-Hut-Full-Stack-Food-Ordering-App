import 'server-only';

import { Locale } from '@/i18n.config';

const dictionaries = {
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

const getTrans = async (locale: Locale) => {
  return locale === "ar" ? dictionaries.ar() : dictionaries.en();
};

export default getTrans;