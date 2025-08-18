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


type PageParams = {
  locale: string;
};

interface LayoutProps {
  children: ReactNode;
  params: Promise<PageParams>;
}

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
  const global = await getGlobal(resolvedParams.locale);

  return generateSeoMetadata({
    title: global?.defaultSeo?.title,
    description: global?.defaultSeo?.metaDescription,
    ogImage: process.env.NEXT_PUBLIC_STRAPI_URL + global?.defaultSeo?.ogImage?.url,
    favicon: process.env.NEXT_PUBLIC_STRAPI_URL + global?.favicon?.url,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: global?.siteName,
      url: "https://mileofthreads.com",
      description: global?.defaultSeo?.metaDescription,
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

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          <Header data={header} globalData={global}/>
          <main>
            <div className="my-10"/>
            {children}
          </main>
          <Footer data={footer} globalData={global}/>
          <Toaster/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
