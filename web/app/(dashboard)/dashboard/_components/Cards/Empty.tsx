"use client";

import { CurrencyDollarIcon, PlusIcon } from "@heroicons/react/20/solid";

import { useRouter } from "next/navigation";

interface Props {
  is_promoted?: boolean;
}

export default ({ is_promoted }: Props) => {
  const router = useRouter();

  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No GPTs</h3>
      <p className="mt-1 text-sm text-gray-500">
        {is_promoted
          ? "You have not promote GPTs yet."
          : "You have not submit GPTs yet."}
      </p>
      <div className="mt-6">
        {is_promoted ? (
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => router.push("/dashboard/promote-gpts")}
          >
            <CurrencyDollarIcon
              className="-ml-0.5 mr-1.5 h-5 w-5"
              aria-hidden="true"
            />
            Promote GPTs
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => router.push("/dashboard/submit-gpts")}
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Submit GPTs
          </button>
        )}
      </div>
    </div>
  );
};
