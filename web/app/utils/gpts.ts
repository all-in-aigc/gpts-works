export function extractGptsUuid(url: string): string | null {
  const match = url.match(
    /https:\/\/chat\.openai\.com\/g\/(g-[a-zA-Z0-9]+)(?:-|$)/
  );
  return match ? match[1] : null;
}
