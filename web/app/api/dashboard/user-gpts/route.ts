import { respData, respErr } from "@/app/utils/resp";

import { currentUser } from "@clerk/nextjs";
import { getUserGpts } from "@/app/models/user_gpts";

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      return respErr("not login");
    }

    const email = user.emailAddresses[0].emailAddress;

    const gpts = await getUserGpts(email, 1, 50);

    return respData(gpts || []);
  } catch (e) {
    console.log("get user gpts failed: ", e);
    return respErr("get user gpts failed");
  }
}
