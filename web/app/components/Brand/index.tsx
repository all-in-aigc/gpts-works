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
          <h1 className="text-primary text-3xl font-bold md:text-7xl">
            Third-party GPTs store
          </h1>
          <h2 className="mt-4 mb-4 md:mt-8 md:mb-4 md:text-4xl text-center">
            <span className="text-primary">{count}</span> awesome GPTs stored
          </h2>
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
