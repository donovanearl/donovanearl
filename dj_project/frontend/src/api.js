import axios from "axios"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants"

// export const getBaseURL = () => {
//   // Check if we're on localhost (desktop development)
//   if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
//     return 'http://localhost:8000';
//   }
//   // Otherwise use your computer's IP (for mobile testing)
//   return 'http://192.168.70.71:8000'; // Replace with your actual IP
// };

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    // creates axios instance with // baseURL:import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config)=>{
        const token= localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization= `Bearer ${token}`
        } return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response?.status === 401){
            try {
                const refresh = localStorage.getItem(REFRESH_TOKEN)
                const res = await api.post("/api/token/refresh/", {
                    refresh: refresh
                })
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                error.config.headers.Authorization = `Bearer ${res.data.access}`
                return axios(error.config)
            } catch(err) {
                localStorage.clear()
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export default api