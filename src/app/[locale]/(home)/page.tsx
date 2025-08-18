import { getPage } from "@/lib/strapiService";
import { ComponentMap } from "@/components/ComponentMap";
import { notFound } from "next/navigation";

type PageParams = {
  locale: string;
};

export default async function Home({
  params,
}: {
  params: Promise<PageParams>
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  // Fetch the page data from Strapi
  const pageData = await getPage("home", locale);

  if (!pageData) {
    return notFound(); // or handle the case where the page data is not found
  }

  return (
    <>
      {pageData?.Sections?.map((section: any, index: number) => {
        const Component = ComponentMap[section.__component];
        
        if (!Component) {
          console.warn(`Component not found for section: ${section.__component}`);
          return null;
        }

        // Прокидываем все данные секции в компонент
        return (
          <Component
            key={index}
            {...section}
          />
        );
      })}
    </>
  );
}
