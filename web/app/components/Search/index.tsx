"use client";

import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
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
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    if (!content) {
      return;
    }

    try {
      const uri = "/api/search";
      const params = {
        question: content,
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

  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-3xl px-5 py-2 md:px-10 pt-2 pb-8 md:pt-4 lg:pt-4 text-center">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 px-4 py-3 border-2 border-[#2752f4] bg-white rounded-lg"
            placeholder="chat for searching GPTs"
            ref={inputRef}
            value={content}
            disabled={inputDisabled}
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="-ml-8 cursor-pointer"
            onClick={handleSubmit}
          >
            <polyline points="9 10 4 15 9 20"></polyline>
            <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};
