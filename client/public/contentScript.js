// /*global chrome*/

// // content.js
// window.addEventListener("message", (event) => {
//     // Ensure it comes from your own page, not a random iframe
//     if (event.source !== window) return;
//     if (event.data.type === "GOOGLE_LOGIN_SUCCESS") {
//         console.log("Content script")
        
//         localStorage.setItem("token", event.data.token);
//         console.log("Local storage, ", event.data.token)
//         chrome.runtime.sendMessage(
//             "ifhimppppnnffofkmagbggildngckaol",
//         {
//             type: "GOOGLE_LOGIN",
//             token: event.data.token
//         });
//     }
// });
  