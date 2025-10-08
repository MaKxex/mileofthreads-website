// lib/seo.ts
const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL;
const DEFAULT_OG_IMAGE = "/og-image.png";
const DEFAULT_FAVICON = "/favicon.ico";

interface SeoOptions {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  twitterHandle?: string;
  ogType?: "website" | "article";
  favicon?: string;
  jsonLd?: object;
}

export function generateSeoMetadata({
  title = "mile of Threads",
  description = "A portfolio by mile of Threads",
  ogImage = DEFAULT_OG_IMAGE,
  canonical = DOMAIN,
  twitterHandle = "@d__raptis",
  ogType = "website",
  favicon = DEFAULT_FAVICON,
  googleVerification = "your-google-verification-code",
  jsonLd,
}: SeoOptions) {
  return {
    title: {
      default: title,
      template: "%s | mile of Threads",
    },
    description,
    icons: {
      icon: favicon,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "mile of Threads",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: ogType,
      locale: "en_IE",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: twitterHandle,
    },
    robots: { index: true, follow: true },
    alternates: { canonical },
    // JSON-LD через custom script
    metadataBase: new URL(canonical), // нужно для корректного base URL
    // добавим json-ld как script
    ...(jsonLd
      ? {
          other: {
            "script.ld+json": JSON.stringify(jsonLd),
          },
        }
      : {}),
  };
}
