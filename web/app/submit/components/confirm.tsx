// /g/uuid/page.tsx
import { Gpts } from "@/app/types/gpts";
import GptsDetail from "@/app/components/GptsDetail";
import React from "react";

// 定义属性类型
interface Props {
  gptsData: Gpts;
}

const PageComponent = ({ gptsData }: Props) => {
  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        {gptsData && <GptsDetail gpts={gptsData} />}
      </div>
    </section>
  );
};

export default PageComponent;
