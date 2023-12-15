"use client";

import { useEffect, useState } from "react";

import Card from "./Card";
import Empty from "./Empty";
import { Gpts } from "@/app/types/gpts";

export default () => {
  const [gptsList, setGptsList] = useState<Gpts[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserGpts = async () => {
    setLoading(true);
    const uri = "/api/dashboard/user-gpts";
    const resp = await fetch(uri, {
      method: "GET",
      headers: {},
    });
    setLoading(false);

    if (resp.ok) {
      const res = await resp.json();
      if (res.data) {
        setGptsList(res.data);
        return;
      }
    }
  };

  useEffect(() => {
    fetchUserGpts();
  }, []);

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
