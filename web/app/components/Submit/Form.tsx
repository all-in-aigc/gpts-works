"use client";

import { useEffect, useState } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";

export default () => {
  const [showForm, setShowForm] = useState(false);
  const [visitUrl, setVisitUrl] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!visitUrl || !visitUrl.startsWith("https://chat.openai.com/g/g-")) {
      setErrmsg("invalid GPTs visit url");
      return;
    }

    try {
      const uri = "/api/gpts/submit";
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
          setShowForm(false);
          window.location.href = `/g/` + res.data.uuid;
          return;
        }
      }

      setErrmsg("submit GPTs failed");
    } catch (e) {
      console.log("search failed: ", e);
      setErrmsg("submit failed");
    }
  };

  useEffect(() => {
    setErrmsg("");
  }, [showForm]);

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <a
        onClick={() => setShowForm(true)}
        className="text-sm text-primary pt-4 mx-2"
      >
        Submit Your Awesome GPTs 👉
      </a>

      <dialog className="modal" open={showForm}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Submit Your Awesome GPTs</h3>
          <div className="text-center text-md">
            <div>
              <p className="text-sm my-2">input GPTs visit url</p>
              <input
                type="text"
                placeholder="https://chat.openai.com/g/g-xxx"
                className="input input-bordered w-full max-w-xs"
                value={visitUrl}
                onChange={(e) => setVisitUrl(e.target.value)}
              />
              <p className="my-2">
                {loading ? (
                  <p className="text-green-200 text-sm">Waiting...</p>
                ) : (
                  <button
                    className="bg-primary text-white rounded-md px-4 py-2 text-sm cursor-pointer"
                    onClick={submit}
                  >
                    Submit
                  </button>
                )}
              </p>
              {errmsg && <p className="text-red-300 text-sm">{errmsg}</p>}
            </div>
          </div>
          <button
            className="absolute top-4 right-4"
            onClick={() => setShowForm(false)}
          >
            <AiOutlineCloseCircle className="text-md" />
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setShowForm(false)}>close</button>
        </form>
      </dialog>
    </div>
  );
};
