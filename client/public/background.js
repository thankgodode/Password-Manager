/*global chrome*/
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "AUTH_COMPLETE") {
//     chrome.storage.local.set({ authToken: message.token }, () => {
//       console.log("Token stored!");
//     });
//   }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "greet") {
      sendResponse({ reply: "Hello from background!" });
      console.log("Communicating...")
  }
});