"use client";

import { BsDownload } from "react-icons/bs";
import Image from "next/image";
import extensionSrc from "@/public/extension.png";
import Submit from "./components/submit"

import { useEffect, useState } from "react";
import { Gpts } from "../types/gpts";

export default () => {
  const [gpts, setGpts] = useState<Gpts[]>([]);
  const [gptsCount, setGptsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchGpts = async (tab: string) => {
    const params = {
      last_id: 0,
      limit: 50,
      tab: tab,
    };

    setLoading(true);
    const resp = await fetch("/api/gpts/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    setLoading(false);

    if (resp.ok) {
      const res = await resp.json();
      if (res.data) {
        setGptsCount(res.data.count);
        setGpts(res.data.rows);
      }
    }
  };

  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        <h2 className="mb-4 text-3xl font-bold md:text-7xl text-center mt-8 md:mt-24">
          Submit Your GPTs!
        </h2>
        <Submit setGpts={setGpts} setLoading={setLoading} />
        
      </div>
    </section>
  );
};
