import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import "@/app/[locale]/globals.css";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { getFooter, getGlobal, getHeader } from "@/lib/strapiService";
import { generateSeoMetadata } from "@/lib/seo";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ReactNode } from "react";
import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'

type PageParams = {
  locale: string;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const resolvedParams = await params;
  const global = await getGlobal(resolvedParams.locale) || { defaultSeo: {}, favicon: {} };

  return generateSeoMetadata({
    title: global?.defaultSeo?.title || "Default Title",
    description: global?.defaultSeo?.metaDescription || "Default description",
    ogImage: global?.defaultSeo?.ogImage?.url ? process.env.NEXT_PUBLIC_STRAPI_URL + global.defaultSeo.ogImage.url : undefined,
    favicon: global?.favicon?.url ? process.env.NEXT_PUBLIC_STRAPI_URL + global.favicon.url : undefined,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: global?.siteName || "Mile of Threads",
      url: "https://mileofthreads.com",
      description: global?.defaultSeo?.metaDescription || "Default description",
    },
  });
}

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<PageParams> }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const [header, footer, global] = await Promise.all([
    getHeader(locale),
    getFooter(locale),
    getGlobal(locale)
  ]);

  const headerData = header || { Logo: null, Navigation: [] };
  const footerData = footer || { Logo: null, Text: { body: '' }, Socials: [], FooterLists: [] };
  const globalData = global || {};

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          <Header data={headerData} globalData={globalData}/>
          <main>
            <div className="my-10"/>
            {children}
          </main>
          <Footer data={footerData} globalData={globalData}/>
          <Toaster/>
        </NextIntlClientProvider>

        
        {/* Google Analytics */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
