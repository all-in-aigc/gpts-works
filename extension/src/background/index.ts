import { sendToContentScript } from "@plasmohq/messaging"

export {}

console.log(
  "Live now; make now always the most precious time. Now will never come again."
)

chrome.action.onClicked.addListener((tab) => {
  console.log("tab clicked", tab)
  if (tab.id) {
    sendToContentScript({
      name: "showSidebar",
      body: {}
    })
  }
})
