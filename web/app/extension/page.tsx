import Image from "next/image";
import extensionSrc from "@/public/extension.png";

export default () => {
  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2 md:px-10 pt-8 md:pt-24 lg:pt-32">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl text-center">
          Show Third-party GPTs beside ChatGPT
          {/* <p className="my-8">
            <a
              href="javascript:;"
              className="px-8 py-4 bg-[#2752f4] text-white border border-gray-100 rounded-md text-lg"
            >
              Install Extension 👉
            </a>
          </p> */}
          <p className="text-3xl font-normal pt-8 text-slate-500">
            coming soon...
          </p>
        </h2>
        <div className="md:pt-24">
          <Image src={extensionSrc} alt="extension" className="" />
        </div>
      </div>
    </section>
  );
};
