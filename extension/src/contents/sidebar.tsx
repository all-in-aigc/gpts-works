import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import { useEffect, useRef, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import { useMessage } from "@plasmohq/messaging/hook"

import GptsList from "~components/GptsList"
import Search from "~components/Search"
import type { Gpts } from "~types/gpts"

export const config: PlasmoCSConfig = {
  // matches: ["https://chat.openai.com/*"]
  matches: ["<all_urls>"]
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
  const [showButton, setShowButton] = useState(true)
  const toggleRef = useRef(null)

  const fetchGpts = async () => {
    setLoading(true)
    const resp = await sendToBackground({
      name: "getGpts",
      body: {
        category: "all"
      }
    })
    setLoading(false)
    if (resp && resp.data) {
      setGpts(resp.data)
    }
  }

  useMessage<string, string>(async (req, res) => {
    if (req.name === "showSidebar") {
      if (toggleRef && toggleRef.current) {
        fetchGpts()
        toggleRef.current.checked = true
      }
    }
  })

  useEffect(() => {
    if (window.location.href.startsWith("https://chat.openai.com/")) {
      fetchGpts()
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [window.location.href])

  return (
    <div className="fixed top-0 right-0">
      <div className="drawer open drawer-end">
        <input
          ref={toggleRef}
          id="gpts-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {showButton && (
            <label
              htmlFor="gpts-drawer"
              className="text-sm btn btn-primary m-8">
              Third-party GPTs
            </label>
          )}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="gpts-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"></label>

          <div className="bg-slate-50 fixed top-0 bottom-0 overflow-y-auto text-black px-4">
            <div className="flex items-center px-4 pt-10 pb-4">
              <h2
                className="text-2xl mr-2 font-bold cursor-pointer"
                onClick={() => {}}>
                Third-party GPTs
              </h2>
              <div className="flex-1"></div>
              <a
                className="text-primary"
                href="https://gpts.works"
                target="_blank">
                View more 👉
              </a>
            </div>

            <Search setGpts={setGpts} setLoading={setLoading} />

            <GptsList gpts={gpts} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}
