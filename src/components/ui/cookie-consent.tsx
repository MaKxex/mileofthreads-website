'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button } from './button';
import { Card } from './card';
import { useTranslations } from 'next-intl';

export const CookieConsent = () => {
  const t = useTranslations('cookieConsent');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const updateConsent = (analytics: boolean, marketing: boolean) => {
    Cookies.set('cookie-consent', 'true', { expires: 365, secure: true });
    Cookies.set('analytics-consent', String(analytics), { expires: 365, secure: true });
    Cookies.set('marketing-consent', String(marketing), { expires: 365, secure: true });
    
    // Отправляем событие об обновлении согласия
    window.dispatchEvent(new Event('cookie-consent-update'));
    
    setIsVisible(false);
  };

  const acceptAll = () => {
    updateConsent(true, true);
  };

  const acceptNecessary = () => {
    updateConsent(false, false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="mx-auto max-w-4xl bg-background/95 backdrop-blur">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">🍪 {t('title')}</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            {t('description')}
          </p>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button onClick={acceptAll} variant="default">
              {t('acceptAll')}
            </Button>
            <Button onClick={acceptNecessary} variant="outline">
              {t('acceptNecessary')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
