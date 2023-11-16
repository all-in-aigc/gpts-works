import type { PlasmoMessaging } from "@plasmohq/messaging"

import { getGpts } from "~services/gpts"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log(
    "debug",
    process.env.PLASMO_BROWSER,
    process.env.PLASMO_INDEX_API_BASE_URI
  )
  const data = await getGpts()
  console.log("get gpts in back", data)

  res.send({
    data
  })
}

export default handler
