import { Gpts } from "@/app/types/gpts";
import fs from "fs";

export const getGptsFromFile = async (): Promise<Gpts[]> => {
  try {
    const dataFile = process.env.GPTS_DATA_FILE;
    if (!dataFile) {
      return [];
    }

    const data = fs.readFileSync(dataFile, "utf8");
    const jsonData = JSON.parse(data);

    let gpts: Gpts[] = [];
    jsonData.map((v: any) => {
      gpts.push({
        uuid: v["data"]["gizmo"]["id"],
        org_id: v["data"]["gizmo"]["organization_id"],
        name: v["data"]["gizmo"]["display"]["name"],
        description: v["data"]["gizmo"]["display"]["description"],
        avatar_url: v["data"]["gizmo"]["display"]["profile_picture_url"],
        short_url: v["data"]["gizmo"]["short_url"],
        author_id: v["data"]["gizmo"]["author"]["user_id"],
        author_name: v["data"]["gizmo"]["author"]["display_name"],
        created_at: v["created_at"],
        updated_at: v["data"]["gizmo"]["updated_at"],
        detail: JSON.stringify(v),
      });
    });

    return gpts;
  } catch (err) {
    console.error("Error loading JSON file:", err);
    return [];
  }
};

export const searchGpts = async (question: string): Promise<Gpts[]> => {
  const uri = `${process.env.INDEX_API_BASE_URI}/gpts/search`;
  const data = {
    question: question,
  };

  try {
    const resp = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.INDEX_API_KEY}`,
      },
      body: JSON.stringify(data),
    });
    const res = await resp.json();
    if (res.data) {
      return res.data;
    }
  } catch (e) {
    console.log("request gpts search failed: ", e);
  }

  return [];
};
