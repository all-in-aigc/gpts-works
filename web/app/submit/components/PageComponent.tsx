// PopupComponent.tsx
import React, { useState } from "react";
import PageComponent from "./confirm"; // 导入Page组件
import { Gpts } from "@/app/types/gpts";

const PopupComponent = (data: Gpts) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>打开弹窗</button>

      {isOpen && (
        <div className="popup">
          <button onClick={() => setIsOpen(false)}>关闭</button>
          <PageComponent gptsData={data} />
        </div>
      )}
    </div>
  );
};

export default PopupComponent;
