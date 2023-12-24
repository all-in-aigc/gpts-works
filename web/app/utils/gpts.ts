import { Gpts } from "../types/gpts";

export function extractGptsUuid(url: string): string | null {
  const match = url.match(
    /https:\/\/chat\.openai\.com\/g\/(g-[a-zA-Z0-9]+)(?:-|$)/
  );
  return match ? match[1] : null;
}

export function renameShortUrl(shortUrl: string, uuid: string): string {
  if (!shortUrl) {
    return uuid;
  }

  let newUrl = shortUrl.replace(uuid, "");
  if (newUrl.startsWith("-")) {
    newUrl = newUrl.replace("-", "");
  }

  newUrl = newUrl + "-" + uuid;

  return newUrl;
}

export function mergeArraysUnique<T>(arr1: T[], arr2: T[]): T[] {
  return Array.from(new Set([...arr1, ...arr2]));
}

export function mergeGptsList(list1: Gpts[], list2: Gpts[]): Gpts[] {
  let mergedGptsList: Gpts[] = [];
  let uniqueUuids: string[] = [];

  list1.forEach((gpts) => {
    mergedGptsList.push(gpts);
    uniqueUuids.push(gpts.uuid);
  });

  list2.forEach((gpts) => {
    if (!uniqueUuids.includes(gpts.uuid)) {
      mergedGptsList.push(gpts);
      uniqueUuids.push(gpts.uuid);
    }
  });

  return mergedGptsList;
}
