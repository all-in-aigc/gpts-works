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
import ProductHunt from "@/app/components/ProductHunt";
import Search from "@/app/components/Search";
import Tips from "@/app/components/Tips";
import { findCategoryBySlug } from "@/app/models/categories";
import { mergeGptsList } from "@/app/utils/gpts";
import { searchGpts } from "@/app/services/gpts";

async function getData(slug: string): Promise<Gpts[] | undefined> {
  console.log("gpts slug:", slug);

  if (slug === "featured") {
    const gpts_list = await getRecommendedRows(1, 100);
    return gpts_list;
  }

  if (slug === "latest") {
    const gpts_list = await getLatestRows(1, 100);
    return gpts_list;
  }

  if (slug === "random") {
    const gpts_list = await getRandRows(1, 100);
    return gpts_list;
  }

  let question: string = "";

  if (slug.startsWith("query-")) {
    question = decodeURIComponent(slug.replace("query-", ""));
  } else {
    const category = await findCategoryBySlug(slug);
    if (!category || !category.name) {
      return;
    }

    question = `Which GPTs can be categorized as '${category.name}'?`;
  }

  console.log("query question:", question);

  const dbData = await getRowsByName(question);
  const vectorData = await searchGpts(question);
  console.log("gpts in db", dbData);
  console.log("gpts in vector", vectorData);

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
      <Categories activeSlug={currentSlug} />
      {/* <Tab tabValue={tabValue} setTabValue={setTabValue} /> */}
      {gpts_list && <GptsList gpts={gpts_list} loading={false} />}
    </>
  );
};
