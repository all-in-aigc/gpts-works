import { getUuids, insertRow } from "@/app/models/gpts";

import { getGptsFromFile } from "@/app/services/gpts";

export async function POST() {
  try {
    const uuids = await getUuids();
    const allGpts = await getGptsFromFile();
    const allGptsCount = allGpts.length;

    console.log(
      `all gpts count: ${allGptsCount}, exist gpts count: ${uuids.length}`
    );

    let existCount = 0;
    let newCount = 0;
    let failedCount = 0;
    for (let i = 0; i < allGptsCount; i++) {
      const gpt = allGpts[i];
      if (!gpt.uuid) {
        continue;
      }

      if (uuids && uuids.includes(gpt.uuid)) {
        console.log("gpt exist: ", gpt.uuid, gpt.name);
        existCount += 1;
        continue;
      }

      try {
        await insertRow(gpt);
        newCount += 1;
        console.log(
          "insert new gpts: ",
          gpt.uuid,
          gpt.name,
          i,
          allGptsCount - i
        );
      } catch (e) {
        failedCount += 1;
        console.log("insert gpts failed: ", gpt.uuid, gpt.name, i, e);
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
