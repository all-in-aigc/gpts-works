"use client";

interface Props {
  count: number;
}

export default ({ count }: Props) => {
  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-4 mt-12 md:mt-24">
        <div className="mx-auto w-full max-w-6xl text-center">
          <h2 className="text-3xl font-bold md:text-7xl">
            Third-party GPTs store
          </h2>
          <p className="mt-4 mb-4 md:mt-12 md:mb-8 text:lg md:text-4xl">
            <span className="text-primary font-bold">{count}</span> fantastic
            GPTs stored
            <a
              href="https://github.com/all-in-aigc/gpts-works/issues/5"
              target="_blank"
              className="text-sm text-primary mx-2"
            >
              Submit yours 👉
            </a>
          </p>
        </div>
      </div>
      <img
        src="/bgstar.svg"
        alt=""
        className="absolute bottom-[auto] left-[auto] right-0 top-24 -z-10 inline-block max-[767px]:hidden"
      />
      <img
        src="/bgstar.svg"
        alt=""
        className="absolute bottom-[auto] right-[auto] left-0 top-60 -z-10 inline-block max-[767px]:hidden"
      />
    </section>
  );
};
