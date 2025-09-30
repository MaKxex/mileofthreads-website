import Cookies from 'js-cookie';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export interface Event {
  action: string;
  category: string;
  label: string;
  value?: number;
}

export const hasAnalyticsConsent = () => {
  return Cookies.get('analytics-consent') === 'true';
};

export const hasMarketingConsent = () => {
  return Cookies.get('marketing-consent') === 'true';
};

export const initGA = () => {
  if (hasAnalyticsConsent() && GA_TRACKING_ID) {
    // window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    });
  }
};

export const logEvent = ({ action, category, label, value }: Event) => {
  if (hasAnalyticsConsent() && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const logPageView = (url: string) => {
  if (hasAnalyticsConsent() && window.gtag) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    });
  }
};
