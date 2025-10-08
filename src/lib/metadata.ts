import { Metadata } from "next";
import { getGlobal } from "./strapiService";
import { generateSeoMetadata } from "./seo";

export let globalMetadata: Metadata;

export async function getGlobalMetadata(locale: string): Promise<Metadata> {
  if (!globalMetadata) {
    const global = await getGlobal(locale);
    
    globalMetadata = generateSeoMetadata({
      title: global?.defaultSeo.metaTitle,
      description: global?.defaultSeo?.metaDescription,
      ogImage: process.env.NEXT_PUBLIC_STRAPI_URL + global?.defaultSeo?.ogImage?.url,
      favicon: process.env.NEXT_PUBLIC_STRAPI_URL + global?.favicon?.url,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: global?.siteName,
        url: process.env.NEXT_PUBLIC_SITE_URL,
        description: global?.defaultSeo?.metaDescription,
      },
    });
  }
  return globalMetadata;
}