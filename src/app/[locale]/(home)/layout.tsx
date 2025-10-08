import { Geist, Geist_Mono } from "next/font/google";
import "@/app/[locale]/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { getFooter, getGlobal, getHeader } from "@/lib/strapiService";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from "react";
import { GoogleTagManager  } from '@next/third-parties/google'
import Script from 'next/script'
import { locales } from "@/i18n";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: { children: ReactNode; params: PageParams }) {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const [header, footer, global] = await Promise.all([
    getHeader(locale),
    getFooter(locale),
    getGlobal(locale)
  ]);

  const messages = await getMessages({locale});

  return (
    <html lang={locale}>
      {/* Google Analytics */}
      <GoogleTagManager  gtmId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GA_ID || ''}`}
        height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header data={header} globalData={global}/>
          <main>
            <div className="my-10"/>
            {children}
          </main>
          <Footer data={footer} globalData={global}/>
          <Toaster/>
        </NextIntlClientProvider>
      
      <Script id="Cookiebot" src={`https://consent.cookiebot.com/uc.js`} data-cbid={process.env.COOKIEBOT_ID} data-blockingmode="auto" type="text/javascript" strategy="beforeInteractive"/>
      </body>
    </html>
  );
}
