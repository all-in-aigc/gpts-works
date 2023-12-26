import { respData, respErr } from "@/app/utils/resp";

import { Gpts } from "@/app/types/gpts";
import { User } from "@/app/types/user";
import { currentUser } from "@clerk/nextjs";
import { getUserGpts } from "@/app/models/user_gpts";
import { getUserPromotedGpts } from "@/app/models/order";

export const maxDuration = 120;

export async function POST(req: Request) {
  const { is_promoted } = await req.json();

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
    let gpts: Gpts[] | undefined = [];
    if (is_promoted) {
      gpts = await getUserPromotedGpts(email);
    } else {
      gpts = await getUserGpts(email, 1, 50);
    }

    return respData(gpts || []);
  } catch (e) {
    console.log("get user gpts failed: ", e);
    return respErr("get user gpts failed");
  }
}
