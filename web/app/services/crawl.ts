import { Gpts } from "@/app/types/gpts";
import { chromium } from "playwright";
import { formatGptsFromJson } from "./gpts";
import { sleep } from "@/app/utils/time";

export async function crawlGpts(url: string): Promise<Gpts | undefined> {
  const match = url.match(/g-\w+/);
  if (!match) {
    console.log("invalid gpts url: ", url);
    return;
  }

  let attempts = 2;
  while (attempts > 0) {
    console.log("crawl gpts with url:", url);
    const browser = await chromium.launch({ headless: false, slowMo: 50 });
    try {
      const page = await browser.newPage();
      await page.goto(url);
      await page.waitForLoadState("networkidle");

      const propsString = await page.evaluate(() => {
        try {
          const script = document.querySelector("#__NEXT_DATA__");
          return script ? script.innerHTML : null;
        } catch (e) {
          console.error("crawl gpts failed:", e);
          return null;
        }
      });

      if (propsString) {
        const props = JSON.parse(propsString);
        const json = {
          created_at:
            props["props"]["pageProps"]["gizmo"]["gizmo"]["updated_at"],
          updated_at:
            props["props"]["pageProps"]["gizmo"]["gizmo"]["updated_at"],
          data: props["props"]["pageProps"]["gizmo"],
        };
        console.log("Successfully Processed URL :", url);

        const gpt = formatGptsFromJson(json);
        return gpt;
      }

      await browser.close();
    } catch (e) {
      console.error("crawl gpts failed:", url, e);
      attempts--;
      if (attempts > 0) {
        console.log(`crawl gpts retry, left times: ${attempts}`);
      } else {
        console.log("crawl gpts finally failed: ", url);
      }
      await browser.close();
      await sleep(1000);
    }
  }

  return;
}
