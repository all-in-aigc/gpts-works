import { downloadAndUploadImage, downloadImage } from "@/app/utils/s3";
import {
  getNoAvatarCdnUrlUuids,
  getUuids,
  insertRow,
  updateAvatarCdnUrl,
} from "@/app/models/gpts";

import { getGptsFromFile } from "@/app/services/gpts";

export async function POST() {
  try {
    const uuids = await getNoAvatarCdnUrlUuids();
    const allGpts = await getGptsFromFile();
    const allGptsCount = allGpts.length;

    console.log(
      `all gpts count: ${allGptsCount}, no avatar_cdn_url gpts count: ${uuids.length}`
    );

    if (uuids.length === 0) {
      return Response.json({ code: 0, message: "ok" });
    }

    let existCount = 0;
    let newCount = 0;
    let failedCount = 0;
    for (let i = 0; i < allGptsCount; i++) {
      const gpt = allGpts[i];
      if (!gpt.uuid) {
        continue;
      }

      if (!uuids.includes(gpt.uuid)) {
        console.log("gpt has avatar_cdn_url: ", gpt.uuid, gpt.name);
        existCount += 1;
        continue;
      }

      try {
        // const res = await downloadAndUploadImage(
        //   gpt.avatar_url,
        //   "gpts-works",
        //   `avatars/${gpt.uuid}.png`
        // );
        // const avatarCdnUrl = res.Location;

        const avatarFile = `avatars/${gpt.uuid}.png`;
        const avatarUrl = `${process.env.GPTS_AVATAR_PATH}/${avatarFile}`;
        await downloadImage(gpt.avatar_url, avatarUrl);

        await updateAvatarCdnUrl(gpt.uuid, avatarFile);

        newCount += 1;
        console.log(
          "download gpts avatar_url: ",
          gpt.uuid,
          gpt.name,
          i,
          allGptsCount - i,
          avatarUrl
        );
      } catch (e) {
        failedCount += 1;
        console.log(
          "download gpts avatar_url failed: ",
          gpt.uuid,
          gpt.name,
          gpt.avatar_url,
          i,
          e
        );
      }
    }

    return Response.json({
      data: {
        all_count: allGptsCount,
        exist_count: existCount,
        new_count: newCount,
        failed_count: failedCount,
      },
    });
  } catch (e) {
    console.log("update gpts failed: ", e);
    return Response.json({ error: e });
  }
}
