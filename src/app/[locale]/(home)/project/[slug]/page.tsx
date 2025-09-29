import { ProjectDetails } from "@/components/product/ProjectDetails";
import { getProject } from "@/lib/strapiService";
import { notFound } from "next/navigation";
import { IProject } from "@/types/Project";

type PageParams = {
  locale: string;
  slug: string;
};

export default async function Page({
  params,
}: {
  params: PageParams;
}) {
  const { slug, locale } = params;
  const project: IProject | null | undefined = await getProject(slug, locale);

  if (!project) {
    return notFound();
  }

  return <ProjectDetails project={project} />;
}