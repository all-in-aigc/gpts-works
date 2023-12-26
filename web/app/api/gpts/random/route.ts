import { getRandRows } from "@/app/models/gpts";

export const maxDuration = 120;

export async function GET() {
  try {
    const data = await getRandRows(0, 50);

    return Response.json({ code: 0, message: "ok", data: data });
  } catch (e) {
    console.log("get gpts failed: ", e);
    return Response.json({
      code: -1,
      message: "failed",
    });
  }
}
