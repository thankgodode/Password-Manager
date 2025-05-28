/*global chrome*/

chrome.runtime.onMessageExternal.addListener((message, sendResponse) => {
    if (message.type == "LOGIN_SUCCESS") {
        chrome.storage.local.set({ token: message.token }, () => {
            console.log("Token saved")
            sendResponse({success:true})
        })
        
        return true
    }
})

chrome.runtime.onMessageExternal.addListener((message, sendResponse) => {
    console.log("Message received!")
    if (message.type == "LOGOUT_SUCCESS") {
        chrome.storage.local.remove("token", () => {
            var error = chrome.runtime.lastError;


            if (error) {
                console.error(error)
            }
        })

        return true
    }
})

chrome.runtime.onMessageExternal.addListener((message, sendResponse) => {
    if (message.type = "GOOGLE_LOGIN") {
        chrome.storage.local.set({ token: message.token }, () => {
            console.log("Google auth token saved!")
            sendResponse({success:true})
        })
    }
})