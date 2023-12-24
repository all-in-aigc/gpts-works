"use client";

import { useEffect, useState } from "react";

import Cards from "@/app/(dashboard)/dashboard/_components/Cards";
import { Gpts } from "@/app/types/gpts";
import GptsTab from "@/app/(dashboard)/dashboard/_components/GptsTab";
import { usePathname } from "next/navigation";

export default () => {
  const [gptsList, setGptsList] = useState<Gpts[] | null>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const fetchUserGpts = async () => {
    setLoading(true);
    const uri = "/api/dashboard/user-gpts";
    const data = {
      is_promoted: true,
    };
    const resp = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
  }, [pathname]);

  return (
    <div>
      <h2 className="text-3xl font-medium mb-8">My GPTs</h2>
      <GptsTab is_promoted={true} />
      <Cards gptsList={gptsList} loading={loading} is_promoted={true} />
    </div>
  );
};
