import { getRandRows, getRecommendedRows, getTotalCount } from "../models/gpts";

import Brand from "@/app/components/Brand";
import Categories from "@/app/components/Categories";
import { Gpts } from "@/app/types/gpts";
import GptsList from "@/app/components/GptsList";
import { Metadata } from "next";
import ProductHunt from "@/app/components/ProductHunt";
import Search from "@/app/components/Search";
import Tab from "../components/Tab";
import Tips from "@/app/components/Tips";
import { getPromotedGpts } from "../models/order";

export const maxDuration = 120;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Featured GPTs in Third-party GPT store | GPTs Works",
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}`,
    },
  };
}

export default async () => {
  const promoted_gpts = await getPromotedGpts();
  const recommended_gpts = await getRecommendedRows(1, 100);

  const gpts_count = await getTotalCount();

  return (
    <>
      <Brand count={gpts_count} />
      <ProductHunt />
      <Search />
      <Tips />
      {/* <Categories activeSlug="featured" /> */}
      <Tab />
      {promoted_gpts && <GptsList gpts={promoted_gpts} loading={false} />}
      {/* <div className="mx-auto max-w-7xl -mt-12">
        <h2 className="text-center font-bold text-3xl">Top Used GPTs</h2>
      </div> */}
      {recommended_gpts && <GptsList gpts={recommended_gpts} loading={false} />}
    </>
  );
};
