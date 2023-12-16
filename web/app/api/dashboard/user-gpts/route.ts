import { respData, respErr } from "@/app/utils/resp";

import { User } from "@/app/types/user";
import { currentUser } from "@clerk/nextjs";
import { getUserGpts } from "@/app/models/user_gpts";
import { saveUser } from "@/app/services/user";

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("not login");
  }

  const email = user.emailAddresses[0].emailAddress;
  const nickname = user.firstName;
  const avatarUrl = user.imageUrl;
  const userInfo: User = {
    email: email,
    nickname: nickname || "",
    avatar_url: avatarUrl,
  };
  // console.log("user profile: ", userInfo);

  try {
    await saveUser(userInfo);

    const gpts = await getUserGpts(email, 1, 50);

    return respData(gpts || []);
  } catch (e) {
    console.log("get user gpts failed: ", e);
    return respErr("get user gpts failed");
  }
}
