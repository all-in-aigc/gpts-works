"use client";

export default () => {
  return (
    <footer className="block">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="flex flex-row justify-between max-[767px]:flex-col max-[767px]:items-start">
          <div className="max-[767px]: w-full max-w-[560px] max-[991px]:mr-4 max-[991px]:flex-initial">
            <p className="text-lg md:text-3xl font-normal md:leading-relaxed">
              Third-party GPTs store. Collect awesome GPTs, Seach GPTs by
              chatting.
            </p>
          </div>
          <div className="max-[767px]: max-[991px]:ml-4 max-[991px]:flex-none max-[767px]:mt-8">
            <div className="mb-4 flex max-w-[272px] items-start justify-start">
              <p className="text-[#636262] max-[479px]:text-sm">Contact me</p>
            </div>
            <div className="mb-4 flex max-w-[272px] items-start justify-start">
              <img
                src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f6e24e55dd49a541fd06_EnvelopeSimple-3.svg"
                alt="image"
                className="mr-3 inline-block"
              />
              <p className="text-[#636262] max-[479px]:text-sm">me@idoubi.cc</p>
            </div>
          </div>
        </div>
        <div className="mb-14 mt-16 w-full [border-bottom:1.7px_solid_rgb(0,_0,_0)]"></div>
        <div className="flex flex-row justify-between max-[991px]:items-center max-[767px]:flex-col max-[767px]:items-start max-[479px]:flex-col-reverse">
          <div className="max-[991px]: text-left font-semibold max-[991px]:py-1 max-[479px]:mb-4">
            <p>Credit to</p>
            <p>
              <a
                href="https://www.gptshunter.com/"
                className="inline-block py-1.5 font-normal text-[#276EF1] transition hover:text-[#276EF1]"
                target="_blank"
              >
                GPTsHunter
              </a>
            </p>
          </div>
          <div className="max-[991px]: text-left font-semibold max-[991px]:py-1 max-[479px]:mb-4">
            <p>Friends</p>
            <p>
              <a
                href="https://monica.im/"
                className="inline-block py-1.5 font-normal text-[#276EF1] transition hover:text-[#276EF1]"
                target="_blank"
              >
                Monica
              </a>
            </p>
          </div>
          <div className="max-[991px]: text-left font-semibold max-[991px]:py-1 max-[479px]:mb-4">
            <p>Products</p>
            <p>
              <a
                href="https://aicover.design/"
                className="inline-block py-1.5 font-normal text-[#276EF1] transition hover:text-[#276EF1]"
                target="_blank"
              >
                AI Cover
              </a>
            </p>
            <p>
              <a
                href="https://aiwallpaper.shop/"
                className="inline-block py-1.5 font-normal text-[#276EF1] transition hover:text-[#276EF1]"
                target="_blank"
              >
                AI Wallpaper
              </a>
            </p>
            <p>
              <a
                href="https://gptalk.net/chat/new"
                className="inline-block py-1.5 font-normal text-[#276EF1] transition hover:text-[#276EF1]"
                target="_blank"
              >
                GPTalk
              </a>
            </p>
            <p>
              <a
                href="https://readknown.cn/"
                className="inline-block py-1.5 font-normal text-[#276EF1] transition hover:text-[#276EF1]"
                target="_blank"
              >
                zKnown
              </a>
            </p>
          </div>
          <div className="max-[991px]:flex-none">
            <p className="text-[#636262] max-[479px]:text-sm pb-8">
              {" "}
              © Copyright{" "}
              <a className="text-primary" href="https://gpts.works">
                gpts.works
              </a>
              . All rights reserved.{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
