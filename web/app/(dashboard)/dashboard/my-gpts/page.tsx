"use client";

import { useEffect, useState } from "react";

import Cards from "../_components/Cards";
import { Gpts } from "@/app/types/gpts";
import { usePathname } from "next/navigation";

export default () => {
  const [gptsList, setGptsList] = useState<Gpts[] | null>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const fetchUserGpts = async () => {
    setLoading(true);
    const uri = "/api/dashboard/user-gpts";
    const resp = await fetch(uri, {
      method: "GET",
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
      <Cards gptsList={gptsList} loading={loading} />
    </div>
  );
};
