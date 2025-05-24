/*global chrome*/

chrome.runtime.onMessageExternal.addListener((message, sendResponse) => {
    if (message.type == "LOGIN") {
        chrome.storage.local.set({ token: message.token }, () => {
            console.log("Token saved")
            sendResponse({success:true})
        })
        
        return true
    }
})