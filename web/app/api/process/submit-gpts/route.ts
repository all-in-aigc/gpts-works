import { fetchGpts, getGptsUrlsFromFile } from "@/app/services/gpts";
import { getUuids, insertRow } from "@/app/models/gpts";

import { extractGptsUuid } from "@/app/utils/gpts";
import { respErr } from "@/app/utils/resp";
import { sleep } from "@/app/utils/time";

export async function POST() {
  try {
    const uuids = await getUuids();
    const urls = await getGptsUrlsFromFile();
    const allCount = urls.length;

    console.log(
      `all gpts urls count: ${allCount}, exist gpts count: ${
        uuids.length
      }, submit gpts count: ${allCount - uuids.length}`
    );

    let existCount = 0;
    let newCount = 0;
    let failedCount = 0;
    for (let i = 0; i < allCount; i++) {
      const url = urls[i];
      const uuid = extractGptsUuid(url);
      if (!uuid || !uuid.startsWith("g-")) {
        console.log("url with invalid uuid: ", url);
        continue;
      }

      if (uuids && uuids.includes(uuid)) {
        // console.log("gpt exist: ", uuid, url);
        existCount += 1;
        continue;
      }

      try {
        const gpts = await fetchGpts(url);
        if (!gpts || !gpts.uuid) {
          console.log("fetch gpts failed: ", uuid, url);
          failedCount += 1;
          continue;
        }

        await insertRow(gpts);

        newCount += 1;
        console.log("submit new gpts: ", gpts.name, uuid, url, i, allCount - i);
      } catch (e) {
        failedCount += 1;
        console.log("submit gpts failed: ", uuid, url, i, e);
      }

      sleep(3000);
    }

    return Response.json({
      data: {
        all_count: allCount,
        exist_count: existCount,
        new_count: newCount,
        failed_count: failedCount,
      },
    });
  } catch (e) {
    console.log("submit gpts failed: ", e);
    return Response.json({ error: e });
  }
}
