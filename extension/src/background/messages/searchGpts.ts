import type { PlasmoMessaging } from "@plasmohq/messaging"

import { searchGpts } from "~services/gpts"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { question } = req.body
  const data = await searchGpts(question)
  console.log("search gpts in back", data)

  res.send({
    data
  })
}

export default handler
