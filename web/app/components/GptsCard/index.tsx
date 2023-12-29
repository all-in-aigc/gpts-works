import { Gpts } from "@/app/types/gpts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import moment from "moment";
import { renameShortUrl } from "@/app/utils/gpts";

interface Props {
  gpts: Gpts;
}

export default ({ gpts }: Props) => {
  return (
    <Link href={`/${renameShortUrl(gpts.short_url, gpts.uuid)}`} target="_self">
      <div className="mb-6 gap-6 overflow-hidden rounded-2xl border border-solid border-[#7e7e7e] bg-white p-8">
        <div className="mb-4 flex flex-row">
          {gpts.avatar_url && (
            <LazyLoadImage
              src={gpts.avatar_url}
              placeholderSrc={`/logo.png`}
              alt=""
              className="mr-4 inline-block h-16 w-16 object-cover rounded-full"
            />
          )}
          <div className="flex flex-col">
            <p className="text-base font-semibold">{gpts.name}</p>
            <p className="text-sm text-[#636262]">{gpts.author_name}</p>
          </div>
        </div>
        <p className="mb-4 text-sm text-[#636262]">{gpts.description}</p>

        <div className="flex items-center">
          {gpts.rating &&
            Array.from({ length: 5 }).map((_, idx: number) => (
              <img
                key={idx}
                src="/star.svg"
                alt=""
                className="mr-1.5 inline-block w-4 flex-none"
              />
            ))}
          <div className="flex-1"></div>

          <p className="text-slate-500 text-sm">
            {moment(gpts.created_at).fromNow()}
          </p>
        </div>
      </div>
    </Link>
  );
};
