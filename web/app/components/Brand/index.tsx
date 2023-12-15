"use client";

import Form from "../Submit/Form";

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
          <div className="mt-12 mb-4 md:mt-12 md:mb-4 text:lg md:text-4xl">
            <span className="text-primary font-bold">{count}</span> fantastic
            GPTs stored
            <a
              href="/dashboard/submit-gpts"
              target="_self"
              className="block text-sm text-primary mx-2 mt-4"
            >
              Submit your awesome GPTs 👉
            </a>
            {/* <Form /> */}
          </div>
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
