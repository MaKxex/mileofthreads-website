import { Suspense } from "react";
import { getPage } from "@/lib/strapiService";
import { SectionMap } from "@/components/SectionMap";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";

type PageParams = {
  locale: string;
  slug?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const pageData = await getPage(resolvedParams.slug!, resolvedParams.locale);

  return {
    title: pageData?.Seo?.metaTitle,
    description: pageData?.Seo?.metaDescription,
  }
}


export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  const pageData = await getPage(slug!, locale);
  

  if (!pageData) {
    return notFound();
  }

  return (
    <>
      {pageData?.Sections?.map((section: any, index: number) => {
        const Component = SectionMap[section.__component];
        
        if (!Component) {
          console.warn(`Component not found for section: ${section.__component}`);
          return null;
        }
        
        return (
          <Suspense key={index} fallback={
                      <div className="space-y-8 p-8">
              <Skeleton className="h-12 w-[300px]" />
              <div className="space-y-6">
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[85%]" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-[200px] w-full" />
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                </div>
              </div>
            </div>
          }>
            <Component {...section} />
          </Suspense>
        );
      })}
    </>
  );
}
