import { BsDownload } from "react-icons/bs";
import Image from "next/image";
import extensionSrc from "@/public/extension.png";

export default () => {
  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        <h2 className="mb-4 text-3xl font-bold md:text-7xl text-center mt-8 md:mt-24">
          Third-party GPTs shows on browser sidebar
          <p className="mt-8">
            <a
              href="https://gpts-works.s3.us-west-1.amazonaws.com/extension/gpts-works_1.0.3.zip"
              className="inline-block px-4 md:px-8 py-2 md:py-4 bg-slate-50 border border-primary rounded-md text-lg"
            >
              <span className="flex items-center ">
                <BsDownload className="mr-2 font-bold" />
                Download extension
              </span>
            </a>
          </p>
        </h2>
        <div className="mt-8 md:mt-16">
          <Image src={extensionSrc} alt="extension" className="" />
        </div>
      </div>
    </section>
  );
};
