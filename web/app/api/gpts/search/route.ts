import { searchGpts } from "@/app/services/gpts";

export async function POST(req: Request) {
  const json = await req.json();
  const question = json.question;
  if (!question) {
    return Response.json({
      code: -1,
      message: "invalid params",
    });
  }

  const res = await searchGpts(question);

  return Response.json({ code: 0, message: "ok", data: res });
}
