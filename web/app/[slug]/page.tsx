import { BsDownload } from "react-icons/bs";
import { Gpts } from "@/app/types/gpts";
import GptsDetail from "@/app/components/GptsDetail";
import Image from "next/image";
import type { Metadata } from "next";
import extensionSrc from "@/public/extension.png";
import { findByUuid } from "@/app/models/gpts";

async function getData(slug: string): Promise<Gpts | undefined> {
  console.log("slug", slug);
  if (!slug || !slug.includes("g-")) {
    return;
  }

  let uuid = "";

  const arr = slug.split("-");
  if (!arr || arr.length < 3) {
    if (arr.length === 2 && arr[0] === "g") {
      uuid = slug;
    } else {
      return;
    }
  } else {
    const arrLen = arr.length;
    uuid = arr[arrLen - 2] + "-" + arr[arrLen - 1];
  }

  if (!uuid.startsWith("g-")) {
    return;
  }

  const gpts = await findByUuid(uuid);

  return gpts;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let title = "";
  let description = "";
  let authorName = "";
  const data = await getData(params.slug);
  if (data) {
    title = data.name;
    description = data.description;
    authorName = data.author_name;
  }

  return {
    title: title,
    description: `${description} View ${title} in Third-party GPT store, Powered by ${
      authorName || "-"
    }`,
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}/${params.slug}`,
    },
  };
}

export default async ({ params }: { params: { slug: string } }) => {
  const data = await getData(params.slug);

  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        {data ? <GptsDetail gpts={data} /> : <>no data</>}
      </div>
    </section>
  );
};
