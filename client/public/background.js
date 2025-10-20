/*global chrome*/

chrome.runtime.onMessageExternal.addListener((message, sendResponse) => {
    if (message.type === "LOGIN_SUCCESS" || message.type === "GOOGLE_LOGIN") {
        chrome.storage.local.set({ token: message.token }, () => {
            console.log("Token saved")
        })
        
        return true
    }
})

chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if (message.type === "LOGOUT_SUCCESS") {
        chrome.storage.local.remove("token", () => {
            localStorage.removeItem("token")
            console.log("Token removed!")
            sendResponse({success:true})
        })
        

        return true
    }
})

chrome.runtime.onMessageExternal.addListener((message,sender,sendResponse) => {
    if (message.type == "UPDATE_TOKEN") {
        chrome.storage.local.set({ token: message.token }, () => {
            console.log("Token updated!")
            sendResponse({success:true})
        })
    }
})

chrome.runtime.onMessageExternal.addListener((message,sender,sendResponse) => {
    if (message.type == "REMOVE_TOKEN") {
        chrome.storage.local.remove("token", () => {
            var error = chrome.runtime.lastError;

            if (error) {
                console.error(error)
            }
        })
    }
})

chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {
    if (message.type === "USER_FORM_INFO") {
        // chrome.storage.local.get("token", async (result) => {
        //     if (!result.token) {
        //         console.log("User is not logged in!")
        //         sendResponse({ success: false, message: "User is not logged in!" })
        //         return
        //     } 

        //     const validateToken = await validateUserLogin(result.token)

        //     if (!validateToken) {
        //         console.log("Token invalid!")
        //         sendResponse({ success: false, message: "User is not logged in!" })
        //         return
        //     }

        //     console.log("User is logged in!")
        //     console.log(message.payload)

        //     await sendInputToBackend(message.payload,result.token)

        //     sendResponse({ success: true, message: "Data stored" });
        // })
        
        console.log(message.payload)
    }

    return true
});

const validateUserLogin = async(token) => {
    try {
        const request = await fetch("http://localhost:5000/dashboard", {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })

        const response = await request.json()

        return response.valid
    } catch (error) {
        return false
    }
}

const sendInputToBackend = async (data,token) => {
    try {
        await fetch("http://localhost:5000/dashboard/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                },
                credentials:"include",
                body: JSON.stringify(data)
            }
        )

        console.log("Password successfully added!")
    } catch (error) {
        console.log(error)
    }
}