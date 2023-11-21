import { findByUuid, insertRow } from "@/app/models/gpts";
import { respData, respErr } from "@/app/utils/resp";

import { fetchGpts } from "@/app/services/gpts";

export async function POST(req: Request) {
  try {
    if (req.body) {
      const params = await req.json();
      const { visit_url } = params;

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
