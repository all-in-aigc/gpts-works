"use client";

interface Props {
  count: number;
}

export default ({ count }: Props) => {
  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2 md:px-10 pt-8 md:pt-24 lg:pt-32">
        <div className="mx-auto mb-0 w-full max-w-6xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-7xl">
            Third-party GPTs store
            <p className="my-8 text:md md:text-4xl">
              <span className="text-[#2752f4]">{count}</span> fantastic GPTs
              stored
            </p>
          </h2>
        </div>
      </div>
      <img
        src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639174a3de7d11bdf3ccbf01_Frame%20427322885.svg"
        alt=""
        className="absolute bottom-[auto] left-[auto] right-0 top-16 -z-10 inline-block max-[767px]:hidden"
      />
      <img
        src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639174a3de7d11bdf3ccbf01_Frame%20427322885.svg"
        alt=""
        className="absolute bottom-[auto] right-[auto] left-0 top-40 -z-10 inline-block max-[767px]:hidden"
      />
    </section>
  );
};
