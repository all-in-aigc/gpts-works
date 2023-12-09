export function extractGptsUuid(url: string): string | null {
  const match = url.match(
    /https:\/\/chat\.openai\.com\/g\/(g-[a-zA-Z0-9]+)(?:-|$)/
  );
  return match ? match[1] : null;
}

export function renameShortUrl(shortUrl: string, uuid: string): string {
  let newUrl = shortUrl.replace(uuid, "");
  if (newUrl.startsWith("-")) {
    newUrl = newUrl.replace("-", "");
  }

  newUrl = newUrl + "-" + uuid;

  return newUrl;
}
