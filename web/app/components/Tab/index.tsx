"use client";

import { Dispatch, SetStateAction } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Tab } from "@/app/types/tab";

interface Props {
  tabValue: string;
  setTabValue: Dispatch<SetStateAction<string>>;
}

export default () => {
  const pathname = usePathname();
  const router = useRouter();

  const tabs: Tab[] = [
    {
      name: "random",
      title: "Random",
      active:
        pathname === "/" || pathname === "/" || pathname === "/gpts/random",
    },
    {
      name: "featured",
      title: "Featured 🔥",
      active: pathname === "/gpts/featured",
    },
    {
      name: "latest",
      title: "Latest",
      active: pathname === "/gpts/latest",
    },
  ];

  return (
    <section className="relative mt-4">
      <div className="mx-auto max-w-7xl px-2 py-4 md:px-8 md:py-4 text-center">
        <div
          role="tablist"
          className="tabs tabs-boxed tabs-sm md:tabs-md inline-block mx-auto"
        >
          {tabs.map((tab: Tab, idx: number) => {
            return (
              <a
                role="tab"
                key={idx}
                className={`tab ${tab.active ? "bg-primary text-white" : ""}`}
                // onClick={() => router.push(`/gpts/${tab.name}`)}
                href={`/gpts/${tab.name}`}
              >
                {tab.title}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
