import {
  getLatestRows,
  getRandRows,
  getRecommendedRows,
  getRowsByName,
  getTotalCount,
} from "@/app/models/gpts";

import Brand from "@/app/components/Brand";
import Categories from "@/app/components/Categories";
import { Gpts } from "@/app/types/gpts";
import GptsList from "@/app/components/GptsList";
import { Metadata } from "next";
import ProductHunt from "@/app/components/ProductHunt";
import Search from "@/app/components/Search";
import Tab from "@/app/components/Tab";
import Tips from "@/app/components/Tips";
import { findCategoryBySlug } from "@/app/models/categories";
import { mergeGptsList } from "@/app/utils/gpts";
import { searchGpts } from "@/app/services/gpts";

export const maxDuration = 120;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;

  let title = "Category GPTs";

  if (!slug.startsWith("query-")) {
    const category = await findCategoryBySlug(slug);
    if (category && category.name) {
      title = `${category.name} GPTs`;
    }
  }

  return {
    title: title,
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}/gpts/${params.slug}`,
    },
  };
}

async function getData(slug: string): Promise<Gpts[] | undefined> {
  console.log("gpts slug:", slug);

  if (slug === "featured") {
    const gpts_list = await getRecommendedRows(1, 50);
    return gpts_list;
  }

  if (slug === "latest") {
    const gpts_list = await getLatestRows(1, 50);
    return gpts_list;
  }

  if (slug === "random") {
    const gpts_list = await getRandRows(1, 50);
    return gpts_list;
  }

  let question: string = "";
  let top_k: number = 10;
  let min_score: number = 0.8;

  if (slug.startsWith("query-")) {
    question = decodeURIComponent(slug.replace("query-", ""));
    top_k = 20;
  } else {
    const category = await findCategoryBySlug(slug);
    if (!category || !category.name) {
      return;
    }

    question = `Which GPTs can be categorized as '${category.name}'?`;
    top_k = 50;
    min_score = 0.7;
  }

  console.log("query question:", question);

  const dbData = await getRowsByName(question);
  const vectorData = await searchGpts(question, top_k, min_score);
  console.log("gpts in db count", dbData.length);
  console.log("gpts in vector count", vectorData.length);

  const gpts_list = mergeGptsList(dbData, vectorData);

  return gpts_list;
}

export default async ({ params }: { params: { slug: string } }) => {
  const currentSlug = params.slug || "featured";
  const gpts_list = await getData(currentSlug);
  const gpts_count = await getTotalCount();

  let query = "";
  if (currentSlug.startsWith("query-")) {
    query = decodeURIComponent(currentSlug.replace("query-", ""));
  }

  return (
    <>
      <Brand count={gpts_count} />
      <ProductHunt />
      <Search query={query} />
      <Tips />
      {/* <Categories activeSlug={currentSlug} /> */}
      <Tab />
      {gpts_list && <GptsList gpts={gpts_list} loading={false} />}
    </>
  );
};
