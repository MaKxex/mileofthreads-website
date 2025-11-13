import { getGlobalMetadata } from "@/lib/metadata";
import {redirect, RedirectType } from "next/navigation";


type PageParams = {
  locale: string;
};

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const resolvedParams = await params;
  return getGlobalMetadata(resolvedParams.locale);
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const redirectTo = process.env.NEXT_REDIRECT_TO_;
  const redirectMode = process.env.NEXT_REDIRECT_MODE === 'true';
  if (redirectMode && redirectTo) {
      console.log(123);
      redirect(redirectTo, RedirectType.replace)
      
  }
  return <>{children}</>;
}