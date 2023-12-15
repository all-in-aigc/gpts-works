"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default () => {
  const [showForm, setShowForm] = useState(false);
  const [visitUrl, setVisitUrl] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    if (!visitUrl || !visitUrl.startsWith("https://chat.openai.com/g/g-")) {
      setErrmsg("invalid GPTs visit url");
      return;
    }

    try {
      const uri = "/api/dashboard/submit-gpts";
      const params = {
        visit_url: visitUrl,
      };

      setLoading(true);
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });
      setLoading(false);

      if (resp.ok) {
        const res = await resp.json();
        if (res.data) {
          router.push("/dashboard/my-gpts");
          return;
        }
      }

      setErrmsg("submit GPTs failed");
    } catch (e) {
      console.log("submit failed: ", e);
      setErrmsg("submit failed");
    }
  };

  useEffect(() => {
    setErrmsg("");
  }, [showForm]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                input visit url of your GPTs
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="https://chat.openai.com/g/g-xxx"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={visitUrl}
                  onChange={(e) => setVisitUrl(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={submit}
                disabled={loading}
              >
                Submit
              </button>
            </div>

            {errmsg && <p className="text-red-300 text-sm">{errmsg}</p>}
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            you can now submit your GPTs
            <span className="ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              for free
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
