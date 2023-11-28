// apiClient.ts
import { ApifyClient } from "apify-client";
import { Gpts } from "@/app/types/gpts";
import { log } from "console";

const apifyToken: string = "apify_api_gRAX7rAHiRU7MtXNF0hupPnpc5t2zL3SkPgv";
const client = new ApifyClient({ token: apifyToken });

// 构造apify请求函数
export async function runActorWithGizmoIds(gizmoIds: string[]): Promise<any[]> {
  const input = {
    gizmoIds: gizmoIds,
    retries: 5,
    proxies: {
      useApifyProxy: true,
    },
  };

  console.log("发生apify请求");
  const run = await client.actor("yDtaN0U3fpH757efF").call(input);
  console.log("Results from dataset");
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  return items;
}

// 提取guzmoIds
function extractGizmoIds(urls: string[]): string[] {
  return urls.map((url) => {
    const parts = url.split("/");
    const lastSegment = parts.pop() || "";
    const fixedLength = 11; // 假设需要提取的固定长度是 11
    if (lastSegment.length >= fixedLength) {
      return lastSegment.substring(0, fixedLength);
    }
    return ""; // 如果不满足条件，则返回空字符串或其他适当的值
  });
}

// 发送url
export async function fetchItemsWithGizmoIds(
  inputUrls: string[]
): Promise<void> {
  try {
    const gizmoIds = extractGizmoIds(inputUrls);
    const items = await runActorWithGizmoIds(gizmoIds);
    console.log("输出items");

    items.forEach((item) => {
      console.log("输出item");
      console.dir(item);

      //构造GPTs
      var gpts = constructGptsFromres(item);
      console.log(gpts);
    });
  } catch (error) {
    console.error("Error running actor: ", error);
  }
}

// 构造GPTs
function constructGptsFromres(res: any): Gpts {
  return {
    uuid: res.id,
    org_id: res.org_id,
    name: res.name,
    description: res.description,
    avatar_url: res.avatar_url,
    short_url: res.short_url,
    author_id: res.author_id,
    author_name: res.author_name,
    created_at: res.crawled_at, // 假设 crawled_at 是创建时间
    updated_at: res.detail.gizmo.updated_at,
    detail: res.detail,
    visit_url: res.full_url, // 假设 full_url 是访问 URL
    // rating 属性根据需要可加可不加，或者设定一个默认值
    rating: res.rating || 0, // 假设存在 rating 字段，如果没有则默认为 0
  };
}
