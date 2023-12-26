import { Gpts } from "@/app/types/gpts";
import moment from "moment";
import { renameShortUrl } from "@/app/utils/gpts";

interface Props {
  gpts_list: Gpts[] | undefined;
}

export default ({ gpts_list }: Props) => {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {gpts_list &&
          gpts_list.map((gpts: Gpts, idx: number) => (
            <>
              <li key={idx}>
                <div className="relative pb-8">
                  <span
                    className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start space-x-3">
                    <>
                      <div className="relative">
                        <img
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                          src={
                            gpts.avatar_cdn_url
                              ? gpts.avatar_cdn_url
                              : gpts.avatar_url
                          }
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <a
                              href={`/${renameShortUrl(
                                gpts.short_url,
                                gpts.uuid
                              )}`}
                              className="font-medium text-gray-900"
                            >
                              {gpts.name}
                            </a>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            created by{" "}
                            <span className="text-gray-500">
                              {gpts.author_name}
                            </span>
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <p>{gpts.description}</p>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </li>
              <li key={gpts.uuid}>
                <div className="relative pb-8">
                  <div className="relative flex items-start space-x-3">
                    <div>
                      <div className="relative px-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                          <img
                            src={gpts.submitted_user?.avatar_url}
                            className="rounded-full"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div className="text-sm text-gray-500">
                        <a className="font-medium text-gray-900">
                          {gpts.submitted_user?.nickname}
                        </a>{" "}
                        submitted{" "}
                        <span className="whitespace-nowrap">
                          {moment(gpts.submitted_at || 0).fromNow()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </>
          ))}
      </ul>
    </div>
  );
};
