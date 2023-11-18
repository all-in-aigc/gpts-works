import type { Gpts } from "../types/gpts"

export const getGpts = async (): Promise<Gpts[]> => {
  try {
    const uri = `${process.env.PLASMO_PUBLIC_INDEX_API_BASE_URI}/gpts/random?from=extension`
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

export const searchGpts = async (question: string): Promise<Gpts[]> => {
  const uri = `${process.env.PLASMO_PUBLIC_INDEX_API_BASE_URI}/gpts/search`
  const data = {
    question: question
  }
  console.log("search request with params:", uri, data)

  try {
    const resp = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PLASMO_PUBLIC_INDEX_API_KEY}`
      },
      body: JSON.stringify(data)
    })
    const res = await resp.json()
    if (res.data) {
      return res.data
    }
  } catch (e) {
    console.log("request gpts search failed: ", e)
  }

  return []
}
