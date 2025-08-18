import "@/app/[locale]/globals.css"
import { generateSeoMetadata } from "@/lib/seo";
import { getGlobal } from "@/lib/strapiService";
import { NextIntlClientProvider, hasLocale } from 'next-intl';


type PageParams = {
  locale: string;
};

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
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