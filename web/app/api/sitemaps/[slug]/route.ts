import * as xmlbuilder from "xmlbuilder";

import { Gpts } from "@/app/types/gpts";
import { NextApiRequest } from "next";
import { getRows } from "@/app/models/gpts";
import { parse } from "url";
import { renameShortUrl } from "@/app/utils/gpts";
import { respErr } from "@/app/utils/resp";

export async function GET(req: NextApiRequest) {
  try {
    if (req.url) {
      const { pathname } = parse(req.url, true);
      if (
        pathname &&
        pathname.startsWith("/api/sitemaps/sitemap-") &&
        pathname.endsWith(".xml")
      ) {
        const batch_no = parseInt(
          pathname.replace("/api/sitemaps/sitemap-", "").replace(".xml", "")
        );
        if (!batch_no) {
          return respErr("invalid path");
        }

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

        return new Response(root.end({ pretty: true }), {
          status: 200,
          headers: { "Content-Type": "application/xml" },
        });
      }
    }

    return respErr("invalid path");
  } catch (e) {
    console.log("fetch sitemap failed: ", e);
    return respErr("fetch sitemap failed");
  }
}
