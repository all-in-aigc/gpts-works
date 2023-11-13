import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import type { Gpts } from "~types/gpts"

export const config: PlasmoCSConfig = {
  matches: ["https://chat.openai.com/gpts/discovery"]
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

          <div className="bg-white px-4">
            <div className="flex items-center px-4 pt-10 pb-4">
              <h2 className="text-2xl font-bold">Third-party GPTs</h2>
              <div className="flex-1"></div>
              <a
                className="text-[#324ffe]"
                href="https://gpts.works"
                target="_blank">
                View more 👉
              </a>
            </div>

            <ul className="menu overflow-auto text-base-content">
              {/* Sidebar content here */}
              {gpts.length > 0 &&
                gpts.map((item: Gpts, idx: number) => {
                  return (
                    <>
                      {item.avatar_url && item.author_name && (
                        <li key={idx} className="max-w-[480px] overflow-hidden">
                          <a
                            href={item.visit_url}
                            className="flex items-center rounded-none  border-t border-gray-100 px-2 py-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-transparent">
                            <img
                              src={item.avatar_url}
                              className="h-10 w-10 rounded-full"
                              alt="GPT"
                            />
                            <div className="max-w-[200px] flex-1 ml-2 mr-24">
                              <h3 className="text-md font-semibold truncate">
                                {item.name}
                              </h3>
                              <p className="text-sm line-clamp-2 truncate">
                                {item.description}
                              </p>
                            </div>
                            <div className="text-sm text-token-text-tertiary text-left truncate">
                              By {item.author_name || "-"}
                            </div>
                          </a>
                        </li>
                      )}
                    </>
                  )
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
