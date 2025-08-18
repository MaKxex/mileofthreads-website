'use client';

import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import LocaleSwitcherButton from './LocaleSwitcherSelect'; // уже с кнопкой

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  // Преобразуем список локалей в объекты с флагами и метками
  const locales = routing.locales.map((cur) => ({
    code: cur,
    label: t('locale', { locale: cur }),
    flag: cur === 'ru' ? '🇷🇺' : cur === 'en' ? '🇺🇸' : '🏳️', // добавь флаги для других языков
  }));

  return (
    <LocaleSwitcherButton
      defaultValue={locale}
      label={t('label')}
      locales={locales}
    />
  );
}
