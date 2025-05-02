/*global chrome*/
console.log("Content script loaded")
// chrome.runtime.sendMessage({type:"PAGE_LOADED"})
chrome.runtime.sendMessage({ action: "greet" }, (response) => {
    console.log(response.reply)
})