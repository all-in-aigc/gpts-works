import { respData, respErr } from "@/app/utils/resp";

import { crawlGpts } from "@/app/services/crawl";
import { fetchGpts } from "@/app/services/gpts";

export async function POST(req: Request) {
  try {
    if (req.body) {
      const params = await req.json();
      const { visit_url } = params;

      const gpts = await fetchGpts(visit_url);

      return respData(gpts);
    }
  } catch (e) {
    console.log("submit gpts failed: ", e);
    return respErr("submit gpts failed");
  }
}
