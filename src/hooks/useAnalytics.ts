'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const useAnalytics = () => {
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const analyticsConsent = Cookies.get('analytics-consent') === 'true';
      setIsAnalyticsEnabled(analyticsConsent);
      
      
      if (analyticsConsent && window.gtag && !window.ga) {
        const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
        if (GA_ID) {
          window.gtag('js', new Date());
          window.gtag('config', GA_ID, {
            page_path: window.location.pathname,
            anonymize_ip: true, // Анонимизируем IP для соответствия GDPR
          });
        }
      }
    };

    checkConsent();

    const cookieListener = () => {
      checkConsent();
    };

    window.addEventListener('cookie-consent-update', cookieListener);

    return () => {
      window.removeEventListener('cookie-consent-update', cookieListener);
    };
  }, []);
  

  return {
    isAnalyticsEnabled,
    trackEvent: (eventName: string, params?: Record<string, any>) => {
      if (isAnalyticsEnabled && window.gtag) {
        window.gtag('event', eventName, params);
      } else {
        console.debug('Analytics disabled or not initialized. Event not tracked:', eventName);
      }
    },
    trackPageView: (url: string) => {
      if (isAnalyticsEnabled && window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
          page_path: url,
        });
      } else {
        console.debug('Analytics disabled or not initialized. Page view not tracked:', url);
      }
    }
  };
};
