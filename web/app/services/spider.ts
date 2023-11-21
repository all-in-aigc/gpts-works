import { chromium } from "playwright";
import { sleep } from "@/app/utils/time";

export async function spiderGpts(url: string): Promise<any | undefined> {
  const match = url.match(/g-\w+/);
  if (!match) {
    console.log("invalid gpts url: ", url);
    return;
  }

  let attempts = 2;
  while (attempts > 0) {
    console.log("spider gpts with url:", url);
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
        const data = props["props"]["pageProps"]["gizmo"];
        console.log("spider gpts successed:", url);

        return data;
      }

      await browser.close();
    } catch (e) {
      console.error("spider gpts failed:", url, e);
      attempts--;
      if (attempts > 0) {
        console.log(`spider gpts retry, left times: ${attempts}`);
      } else {
        console.log("spider gpts finally failed: ", url);
      }
      await browser.close();
      await sleep(1000);
    }
  }

  return;
}
