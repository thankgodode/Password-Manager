/*global chrome*/

import axios from "axios"


const API = axios.create({
    baseURL: "http://localhost:5000",
    widthCredentials:true
})

API.interceptors.request.use(async (config) => {
    let token;
    if (typeof chrome !== undefined && chrome.tabs) {
        chrome.storage.local.get("token", async(result) => {
            if (result.token) {
                token = result.token
            }
        })
        
        // let token = localStorage.getItem("token")
        
        if (token) {
            config.headers.Authorization=`Bearer ${token}`
        }
    }
    
    console.log("Getting token from ls... ", token)
    return config
    
}, (err) => Promise.reject(err))


API.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("Interceptor error: ", error)
        if (error.response.status === 403) {
            try {
                const res = await axios.get("http://localhost:5000/refresh", { withCredentials: true });
                
                chrome.runtime.sendMessage(
                    "ifhimppppnnffofkmagbggildngckaol",
                    {
                        type: "UPDATE_TOKEN",
                        token: res.data.token
                    }
                )
                // localStorage.setItem("token", res.data.token);
                
                error.config.headers.Authorization = `Bearer ${res.data.token}`;

                return axios(error.config);
            } catch (refreshError) {
                console.log("Session expired. Redirecting to login...");
                // localStorage.removeItem("token");
                 chrome.runtime.sendMessage(
                    "ifhimppppnnffofkmagbggildngckaol",
                    {
                        type: "REMOVE_TOKEN",
                    }
                )
                // window.location.href = "/login";
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export default API