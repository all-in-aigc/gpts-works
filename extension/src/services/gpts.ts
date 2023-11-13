import type { Gpts } from "../types/gpts"

export const getGpts = async (): Promise<Gpts[]> => {
  try {
    const uri = "https://gpts.works/api/gpts?from=extension"
    const resp = await fetch(uri)
    if (resp.ok) {
      const json = await resp.json()
      return Promise.resolve(json.data)
    }
  } catch (err) {
    console.error("Error loading JSON file:", err)
  }

  return Promise.resolve([])
}
