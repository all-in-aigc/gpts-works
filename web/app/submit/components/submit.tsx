"use client";

import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { Gpts } from "@/app/types/gpts";
import { fetchItemsWithGizmoIds } from "@/app/api/submit/route";
import GptsDetail from "@/app/components/GptsDetail";

// 属性窗口
interface Props {
  setGpts: Dispatch<SetStateAction<Gpts[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

// 输入GizmoIds
export default ({ setGpts, setLoading }: Props) => {
  const [inputDisabled, setInputDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [content, setContent] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gptsData, setGptsData] = useState<Gpts[]>([]); // 存储加载的数据

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    handleFetchItems();
  };

  const handleFetchItems = async () => {
    setIsPopupOpen(true);
    setIsLoading(true);
    const data = await fetchItemsWithGizmoIds([content]);
    setGptsData(data);
    setIsLoading(false);
    setLoading(false);
  };

  useEffect(() => {
    if (content) {
      // handleSubmit(content, "");
    }
  }, [content]);

  return (
    <section className="relatve mt-4 md:mt-8">
      <div className="mx-auto w-full max-w-2xl px-6 text-center">
        <div className="flex items-center relative">
          <input
            type="text"
            className="flex-1 px-4 py-3 border-2 border-primary bg-white rounded-lg pr-20" // 增加右侧内边距以容纳按钮
            placeholder="GPTs Share Link"
            ref={inputRef}
            value={content}
            disabled={inputDisabled}
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
          />
          <button
            className="absolute right-0 mr-3 px-4 py-2 text-white bg-primary rounded-lg"
            style={{ top: "50%", transform: "translateY(-50%)" }} // 垂直居中按钮
            onClick={() => handleFetchItems}
          >
            Submit
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          {isLoading ? (
            <div>
              Loading...
              <button className="cancel-button">Cancel</button>
              <button className="continue-button" disabled>
                Continue
              </button>
            </div>
          ) : (
            <div>
              {/* 这里展示 gptsData 的内容 */}
              <section className="relatve">
                <div className="mx-auto w-full max-w-7xl px-5 py-2">
                  {gptsData && <GptsDetail gpts={gptsData[0]} />}
                </div>
              </section>
              <button className="cancel-button">Cancel</button>
              <button className="continue-button">Continue</button>
            </div>
          )}
        </div>
      )}{" "}
    </section>
  );
};
