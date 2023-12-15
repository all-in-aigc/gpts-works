"use client";

import Card from "./Card";
import Empty from "./Empty";
import { Gpts } from "@/app/types/gpts";

interface Props {
  gptsList: Gpts[] | null;
  loading: boolean;
}

export default ({ gptsList, loading }: Props) => {
  return (
    <>
      {loading ? (
        <div className="text-lg my-8">loading...</div>
      ) : (
        <>
          {gptsList && gptsList.length > 0 ? (
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {gptsList &&
                gptsList.map((gpts: Gpts, idx: number) => (
                  <li
                    key={idx}
                    className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow p-1"
                  >
                    <Card gpts={gpts} />
                  </li>
                ))}
            </ul>
          ) : (
            <div className="mt-16">
              <Empty />
            </div>
          )}
        </>
      )}
    </>
  );
};
