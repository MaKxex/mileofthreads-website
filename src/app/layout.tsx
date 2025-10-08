import { getGlobalMetadata } from "@/lib/metadata";

type PageParams = {
  locale: string;
};

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const resolvedParams = await params;
  return getGlobalMetadata(resolvedParams.locale);
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}