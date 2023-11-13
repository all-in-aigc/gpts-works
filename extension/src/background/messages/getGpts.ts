import type { PlasmoMessaging } from "@plasmohq/messaging"

import { getGpts } from "~services/gpts"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const data = await getGpts()
  console.log("get gpts in back", data)

  res.send({
    data
  })
}

export default handler
