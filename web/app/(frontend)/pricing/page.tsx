import { CheckIcon } from "@heroicons/react/20/solid";
import { Metadata } from "next";

const includedFeatures = [
  "Featured in home page",
  "Marked as recommended",
  "Rank at the top",
  "Five-star rating",
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "GPTs Promote Pricing",
    alternates: {
      canonical: `${process.env.WEB_BASE_URI}/pricing`,
    },
  };
}

export default function () {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Promotional Pricing
          </h1>
          <h2 className="mt-6 text-lg leading-8 text-gray-600">
            Choose a promotional plan to get your GPTs seen by more people.
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <p className="mt-6 text-base leading-7 text-gray-600"></p>
            <div className="mt-10 flex items-center gap-x-4">
              <p className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                Your GPTs will be promoted
              </p>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">
                  Standard plan
                </p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $9.9
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                    / month
                  </span>
                </p>
                <a
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  href="/dashboard/promote-gpts"
                >
                  Ready to Promote GPTs
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
