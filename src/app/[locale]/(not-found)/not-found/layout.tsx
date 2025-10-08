import "@/app/[locale]/globals.css"
import { Metadata } from "next";
import {NextIntlClientProvider } from 'next-intl';
import { getTranslations } from "next-intl/server";

type PageParams = {
  locale: string;
};


export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  

  const t = await getTranslations('404');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}


export default async function NotFoundLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<PageParams>
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}