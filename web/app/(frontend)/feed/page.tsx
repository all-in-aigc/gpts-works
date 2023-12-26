import Feeds from "@/app/components/Feeds";
import { Gpts } from "@/app/types/gpts";
import { Metadata } from "next";
import { getFeedGpts } from "@/app/models/user_gpts";

export const maxDuration = 120;

async function getData(page: number): Promise<Gpts[] | undefined> {
  const limit = 100;
  const gpts_list = await getFeedGpts(page, limit);

  return gpts_list;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "GPTs Feed",
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}/feed`,
    },
  };
}

export default async () => {
  let page = 1;
  const gpts_list = await getData(page);
  console.log("gpts list", gpts_list);

  return (
    <section className="relative">
      <div className="mx-auto max-w-3xl px-5 py-8 md:px-10 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold">GPTs Feed</h1>
        <h2 className="text-md md:text-xl mt-4 mb-8 font-normal">
          Latest submitted GPTs by users
        </h2>
        <Feeds gpts_list={gpts_list} />
      </div>
    </section>
  );
};
