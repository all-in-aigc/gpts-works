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
      name: "featured",
      title: "Featured 🔥",
      route: "/",
      active:
        pathname === "/" || pathname === "/" || pathname === "/gpts/featured",
    },
    {
      name: "latest",
      title: "Latest",
      route: "/gpts/latest",
      active: pathname === "/gpts/latest",
    },
    {
      name: "random",
      title: "Random",
      route: "/gpts/random",
      active: pathname === "/gpts/random",
    },
  ];

  return (
    <section className="relative mt-4">
      <div className="mx-auto max-w-7xl px-2 py-4 md:px-8 md:py-4 text-center">
        <div role="tablist" className="mx-auto">
          {tabs.map((tab: Tab, idx: number) => {
            return (
              <a
                role="tab"
                key={idx}
                className={`border text-sm rounded-md px-3 py-1 mx-1 ${
                  tab.active ? "bg-primary border-primary text-white" : ""
                }`}
                // onClick={() => router.push(`/gpts/${tab.name}`)}
                href={`${tab.route}`}
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
