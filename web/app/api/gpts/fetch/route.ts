import { respData, respErr } from "@/app/utils/resp";

import { spiderGpts } from "@/app/services/spider";

export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    if (req.body) {
      const params = await req.json();
      const { visit_url } = params;

      const data = await spiderGpts(visit_url);

      return respData(data);
    }
  } catch (e) {
    console.log("fetch gpts failed: ", e);
    return respErr("fetch gpts failed");
  }
}
