import { Gpts } from "@/app/types/gpts";
import GptsDetail from "@/app/components/GptsDetail";
import { findByUuid } from "@/app/models/gpts";
import { redirect } from "next/navigation";
import { renameShortUrl } from "@/app/utils/gpts";

async function getData(uuid: string): Promise<Gpts | undefined> {
  if (!uuid) {
    return;
  }

  const gpts = await findByUuid(uuid);

  return gpts;
}

export default async ({ params }: { params: { uuid: string } }) => {
  const data = await getData(params.uuid);
  if (data) {
    const url = renameShortUrl(data.short_url, data.uuid);
    redirect(`/${url}`);
  }

  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        {data && <GptsDetail gpts={data} />}
      </div>
    </section>
  );
};
