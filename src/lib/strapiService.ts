// lib/strapiService.ts

import { cache } from "react";
import { fetchAPI } from "./api";

const getGlobal = cache(async (locale: string) => {
  const response = await fetchAPI("/global", locale, { populate: "*" });
  return response.data;
});

const getHeader = cache(async (locale: string) => {
  const response = await fetchAPI("/header", locale, { populate: "*" });
  return response.data;
});

const getFooter = cache(async (locale: string) => {
  const response = await fetchAPI("/footer", locale, { populate: "all" });
  return response.data;
});

const getPage = cache(async (slug: string, locale: string) => {
  const response = await fetchAPI(`/${slug}`, locale, { populate: "all" });
  return response.data;
});

export { getGlobal, getHeader, getFooter, getPage };