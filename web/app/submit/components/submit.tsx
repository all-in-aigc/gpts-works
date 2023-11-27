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

interface Props {
  setGpts: Dispatch<SetStateAction<Gpts[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default ({ setGpts, setLoading }: Props) => {
  const [inputDisabled, setInputDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [content, setContent] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        handleSubmit("", content);
      }
    }
  };

  const handleSubmit = async (keyword: string, question: string) => {
    try {
      const uri = "/api/submit";
      const params = {
        keyword: keyword,
        question: question,
      };

      setLoading(true);
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });
      setLoading(false);

      if (resp.ok) {
        const res = await resp.json();
        if (res.data) {
          setGpts(res.data);
        }
      }
    } catch (e) {
      console.log("search failed: ", e);
    }
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
    style={{ top: '50%', transform: 'translateY(-50%)' }} // 垂直居中按钮
    onClick={() => console.log("按钮触发")} // 修改了 onClick 事件处理器
  >
    Submit
  </button>
</div>


      </div>
    </section>
  );
};
