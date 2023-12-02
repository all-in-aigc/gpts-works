import { findByUuid, insertRow } from "@/app/models/gpts";
import { respData, respErr } from "@/app/utils/resp";

import { extractGptsUuid } from "@/app/utils/gpts";
import { fetchGpts } from "@/app/services/gpts";

export async function POST(req: Request) {
  try {
    if (req.body) {
      const params = await req.json();
      const { visit_url } = params;

      const uuid = extractGptsUuid(visit_url);
      console.log("uuid", uuid, visit_url);
      if (!uuid || !uuid.startsWith("g-")) {
        return respErr("invalid visit_url");
      }

      const existGpt = await findByUuid(uuid);
      if (existGpt) {
        console.log("gpt exist: ", existGpt.name, visit_url);
        return respData(existGpt);
      }

      console.log("submit new gpt:", visit_url);

      const gpts = await fetchGpts(visit_url);
      if (!gpts || !gpts.uuid) {
        return respErr("fetch gpts failed");
      }

      const existGpts = await findByUuid(gpts.uuid);
      if (existGpts) {
        console.log("gpts exist: ", gpts.name, gpts.uuid);
        return respData(existGpts);
      }

      console.log("insert new gpts: ", gpts.name, gpts.uuid);
      await insertRow(gpts);

      return respData(gpts);
    }
  } catch (e) {
    console.log("submit gpts failed: ", e);
    return respErr("submit gpts failed");
  }
}
