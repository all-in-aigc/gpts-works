import {
  getHotRows,
  getLatestRows,
  getRandRows,
  getRecommendedRows,
  getTotalCount,
} from "@/app/models/gpts";
import { respData, respErr } from "@/app/utils/resp";

export async function POST(req: Request) {
  try {
    if (req.body) {
      const params = await req.json();
      const { last_id, limit, tab } = params;

      const count = await getTotalCount();

      if (tab === "latest") {
        const rows = await getLatestRows(last_id, limit);
        return respData({
          rows: rows,
          count: count,
        });
      }

      if (tab === "recommended") {
        const rows = await getRecommendedRows(last_id, limit);
        return respData({
          rows: rows,
          count: count,
        });
      }

      if (tab === "hot") {
        const rows = await getRecommendedRows(last_id, limit);
        return respData({
          rows: rows,
          count: count,
        });
      }

      const rows = await getRandRows(last_id, limit);
      return respData({
        rows: rows,
        count: count,
      });
    }
  } catch (e) {
    console.log("get all gpts failed: ", e);
    return respErr("get gpts failed");
  }
}
