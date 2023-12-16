import * as xmlbuilder from "xmlbuilder";

import { getRows, getUuids, insertRow } from "@/app/models/gpts";

import { Gpts } from "@/app/types/gpts";
import { renameShortUrl } from "@/app/utils/gpts";
import { respData } from "@/app/utils/resp";
import { writeFile } from "fs";

export async function POST() {
  try {
    let batch_no = 1;
    let page_step = 5;
    let limit = 1000;

    let start_page = (batch_no - 1) * page_step + 1;
    let end_page = start_page + page_step - 1;
    let page = start_page;
    let total = 0;

    const root = xmlbuilder.create("urlset", {
      version: "1.0",
      encoding: "UTF-8",
    });
    root.att("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");

    while (true) {
      const gpts_list = await getRows(page, limit);
      const gpts_len = gpts_list.length;
      console.log("batch get gpts:", page, gpts_len);
      page += 1;
      total += gpts_len;

      gpts_list.forEach((gpts: Gpts) => {
        const urlElement = root.ele("url");
        urlElement.ele(
          "loc",
          "https://gpts.works/" + renameShortUrl(gpts.short_url, gpts.uuid)
        );
        // urlElement.ele("lastmod", moment(gpts.updated_at).format("YYYY-MM-DD"));
        // urlElement.ele("changefreq", "monthly");
        // urlElement.ele("priority", "0.6");
      });

      if (page > end_page || gpts_len === 0) {
        break;
      }
    }

    const xmlString = root.end({ pretty: true });

    const fileName = `public/sitemaps/sitemap-${batch_no}.xml`;
    writeFile(fileName, xmlString, (err) => {
      if (err) {
        console.error("write sitemap failed:", err);
        return;
      }
    });

    return respData({
      start_page: start_page,
      end_page: end_page,
      page: page,
      limit: limit,
      total: total,
    });
  } catch (e) {
    console.log("update sitemap failed: ", e);
    return Response.json({ error: e });
  }
}
