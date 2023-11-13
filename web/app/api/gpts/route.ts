import { getRandRows } from "@/app/models/gpts";

export async function GET() {
  const data = await getRandRows(0, 50);

  return Response.json({ data: data });
}
