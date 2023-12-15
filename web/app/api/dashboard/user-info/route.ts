import { respData, respErr } from "@/app/utils/resp";

import { currentUser } from "@clerk/nextjs";

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      return respErr("not login");
    }

    return respData(user);
  } catch (e) {
    console.log("get user info failed: ", e);
    return respErr("get user info failed");
  }
}
