import { getCount, getRandRows } from "@/app/models/gpts";

export async function POST(req: Request) {
  try {
    if (req.body) {
      const params = await req.json();
      const { last_id, limit } = params;

      const rows = await getRandRows(last_id, limit);
      const count = await getCount();

      return Response.json({
        code: 0,
        message: "ok",
        data: {
          rows: rows,
          count: count,
        },
      });
    }
  } catch (e) {
    return Response.json({ code: -1, message: e });
  }
}
