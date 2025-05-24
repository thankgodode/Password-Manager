/*global chrome*/

var data =""

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "API_SUCCESS") {
        console.log("Received in content script: ", message.payload)
        data = message.payload

        sendResponse({ status: "received" })
        
        return true;
    }
})

chrome.runtime.sendMessage("<ifhimppppnnffofkmagbggildngckaol>", {
    type: "LOGIN",
    token: data
})