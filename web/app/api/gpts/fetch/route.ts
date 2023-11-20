import { respData, respErr } from "@/app/utils/resp";

import { crawlGpts } from "@/app/services/crawl";

export async function POST(req: Request) {
  try {
    if (req.body) {
      const params = await req.json();
      const { visit_url } = params;

      const gpts = await crawlGpts(visit_url);

      return respData(gpts);
    }
  } catch (e) {
    console.log("fetch gpts failed: ", e);
    return respErr("fetch gpts failed");
  }
}
