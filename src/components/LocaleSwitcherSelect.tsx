'use client';

import { useState, useTransition } from 'react';
import { Locale } from 'next-intl';
import clsx from 'clsx';
import { Globe } from 'lucide-react';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';


type LocaleOption = {
  code: Locale;
  label: string;
  flag: string;
};

type Props = {
  defaultValue: Locale;
  locales: LocaleOption[];
  label: string;
};

export default function LocaleSwitcherButton({ defaultValue, locales, label }: Props) {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<Locale>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function handleLocaleChange(localeCode: Locale) {
    setCurrentLocale(localeCode);
    setIsOpen(false);

    const nextLocale = localeCode;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: nextLocale}
      );
    });
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-label={label}
        className={clsx(
          'border-2 border-foreground bg-card hover:bg-accent hover:text-accent-foreground shadow-[3px_3px_0px_0px_#000000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:scale-110 transition-all duration-300 group px-2 py-2',
          isPending && 'opacity-50 pointer-events-none'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe size={16} className="text-foreground transition-transform duration-300 group-hover:rotate-180" />
        {/* <span className="text-sm">{currentLocaleData?.label}</span> */}
        {/* <span className="text-lg">{currentLocaleData?.flag}</span> */}
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 z-50 bg-card border-4 border-foreground shadow-[8px_8px_0px_0px_#000000] min-w-[120px]">
          {locales.map((locale, index) => (
            <li key={locale.code}>
              <button
                type="button"
                onClick={() => handleLocaleChange(locale.code)}
                className={clsx(
                  'w-full px-4 py-3 flex items-center space-x-3 font-bold uppercase text-sm tracking-wide transition-all duration-200',
                  locale.code === currentLocale
                    ? 'bg-primary text-primary-foreground shadow-none'
                    : index % 2 === 0
                    ? 'bg-card text-card-foreground hover:bg-secondary hover:text-secondary-foreground'
                    : 'bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* <span className="text-lg">{locale.flag}</span> */}
                <span>{locale.label}</span>
                {/* {locale.code === currentLocale && (
                  <span className="ml-auto w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                )} */}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
