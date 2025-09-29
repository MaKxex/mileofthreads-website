"use client"

import { getProject } from "@/lib/strapiService";
import { notFound } from "next/navigation";

type PageParams = {
  locale: string;
  slug: string;
};

export default async function Page({
  params,
}: {
  params: PageParams;
}) {
  const { slug, locale } = await Promise.resolve(params);
  const project = await getProject(slug, locale);
  
  console.log('Project data:', project);
  if (!slug || project === undefined || project === null) {
    return notFound();
  }


  return (
    <>
      Hello World
      <br />
      <br />
      <br />
      <br />
      {slug}
      <br />
      {locale}
    </>
  );
}
