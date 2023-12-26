import { BsBrowserChrome, BsDownload } from "react-icons/bs";

import Image from "next/image";
import { Metadata } from "next";
import extensionSrc from "@/public/extension.png";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "GPTs Extension",
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}/extension`,
    },
  };
}

export default () => {
  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        <div className="mb-4 font-bold text-center mt-8 md:mt-24">
          <h1 className="text-3xl md:text-5xl font-bold">GPTs Extension</h1>
          <h2 className="text-md md:text-xl mt-4 mb-8 font-normal">
            Show Third-party GPTs on browser sidebar
          </h2>
          <p className="mt-8">
            <a
              href="https://chromewebstore.google.com/detail/gpts-works/jhodoncnaefppnpeaaoholdenlcmcjgh"
              className="inline-block mb-4 md:mb-0 px-4 mr-8 md:px-8 py-2 md:py-4 bg-slate-50 border-2 border-primary rounded-xl text-lg"
              target="_blank"
            >
              <span className="flex items-center ">
                <BsBrowserChrome className="text-primary mr-2 font-bold" />
                Add To Chrome
              </span>
            </a>
            <a
              href="https://gpts-works.s3.us-west-1.amazonaws.com/extension/gpts-works_1.0.3.zip"
              className="inline-block px-4 md:px-8 py-2 md:py-4 bg-slate-50 border-2 border-gray-500 rounded-xl text-lg"
            >
              <span className="flex items-center ">
                <BsDownload className="text-primary mr-2 font-bold" />
                Download extension
              </span>
            </a>
          </p>
        </div>
        <div className="mt-8 md:mt-16">
          <Image src={extensionSrc} alt="extension" className="" />
        </div>
      </div>
    </section>
  );
};
