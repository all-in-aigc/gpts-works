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
          <div className="mt-12 mb-4 md:mt-12 md:mb-4 text:lg md:text-4xl text-center">
            <span className="text-primary font-bold">{count}</span> fantastic
            GPTs stored
            <div className="flex flex-col md:flex-row items-center justify-center mx-auto text-center">
              <a
                href="/dashboard/submit-gpts"
                target="_self"
                className="inline-block text-sm text-primary mx-2 mt-4"
              >
                Submit your awesome GPTs 👉
              </a>
              <a
                href="/dashboard/promote-gpts"
                target="_self"
                className="inline-block text-sm text-primary mx-2 mt-4"
              >
                Promote your GPTs 👉
              </a>
            </div>
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
