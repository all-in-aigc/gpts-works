import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import GptsList from "~components/GptsList"
import Search from "~components/Search"
import type { Gpts } from "~types/gpts"

export const config: PlasmoCSConfig = {
  matches: ["https://chat.openai.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector("main")

export default () => {
  const [gpts, setGpts] = useState<Gpts[]>([])
  const [loading, setLoading] = useState(false)

  const fetchGpts = async () => {
    const resp = await sendToBackground({
      name: "getGpts",
      body: {
        category: "all"
      }
    })
    if (resp && resp.data) {
      setGpts(resp.data)
    }
  }

  useEffect(() => {
    console.log("init contens")
    fetchGpts()
  }, [])

  return (
    <div className="fixed top-0 right-0">
      <div className="drawer drawer-end">
        <input id="gpts-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="gpts-drawer" className="text-sm btn btn-primary m-8">
            Third-party GPTs
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="gpts-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"></label>

          <div className="bg-slate-50 h-full text-black px-4">
            <div className="flex items-center px-4 pt-10 pb-4">
              <h2 className="text-2xl mr-2 font-bold">Third-party GPTs</h2>
              <div className="flex-1"></div>
              <a
                className="text-primary"
                href="https://gpts.works"
                target="_blank">
                View more 👉
              </a>
            </div>

            {/* <Search setGpts={setGpts} setLoading={setLoading} /> */}

            <GptsList gpts={gpts} />
          </div>
        </div>
      </div>
    </div>
  )
}
