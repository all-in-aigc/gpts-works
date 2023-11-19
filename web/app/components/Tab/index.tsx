import { Dispatch, SetStateAction } from "react";

import { Tab } from "@/app/types/tab";

interface Props {
  tabValue: string;
  setTabValue: Dispatch<SetStateAction<string>>;
}

export default ({ tabValue, setTabValue }: Props) => {
  const tabs: Tab[] = [
    {
      name: "hot",
      title: "Hot 🔥",
    },
    {
      name: "recommended",
      title: "Recommended",
    },
    {
      name: "latest",
      title: "Latest",
    },
    {
      name: "random",
      title: "Random",
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
                className={`tab ${
                  tabValue === tab.name ? "bg-primary text-white" : ""
                }`}
                onClick={() => setTabValue(tab.name)}
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
