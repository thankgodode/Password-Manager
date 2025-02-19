import axios from "axios"


const API = axios.create({
    baseURL: "http://localhost:5000",
    widthCredentials:true
})

// const handleRefreshToken = async () => {
//     console.log("Requesting for access token...")
//     try {
//         const response = await axios.get("/refresh")
//         console.log("Refreshing ", response)

//         if (!response.data.token) {
//             throw new Error("No new token found")
//         }

//         localStorage.setItem("token", response.data.token);
//         return response.data.token;
    
//     } catch (error) {
//         localStorage.removeItem("token")
//         window.location.href = "/login"

//         return Promise.reject(error)
//     }
// }

API.interceptors.request.use(async (config) => {
    let token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization=`Bearer ${token}`
    }

    return config
}, (err) => Promise.reject(err))


API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 403) {
            try {
                const res = await axios.get("http://localhost:5000/refresh", { withCredentials: true });
                
                localStorage.setItem("token", res.data.token);
                error.config.headers.Authorization = `Bearer ${res.data.token}`;

                return axios(error.config);
            } catch (refreshError) {
                console.log("Session expired. Redirecting to login...");
                localStorage.removeItem("token");
                // window.location.href = "/login";
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export default API