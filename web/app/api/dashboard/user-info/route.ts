import { respData, respErr } from "@/app/utils/resp";

import { User } from "@/app/types/user";
import { currentUser } from "@clerk/nextjs";
import { saveUser } from "@/app/services/user";

export const maxDuration = 120;

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

  await saveUser(userInfo);

  return respData(userInfo);
}
