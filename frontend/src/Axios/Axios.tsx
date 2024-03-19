import axios from "axios";
import { toast } from "react-toastify";

const arr = ["http://localhost:5000","https://wandeo.website"]
const axiosInstance = axios.create({
    baseURL: arr[1]
});

axiosInstance.interceptors.request.use(
    (config) => {
        const tokenString = localStorage.getItem('token');
        
        if(tokenString) {
            try {
                const token = JSON.parse(tokenString);
                config.headers.authorization = `Bearer ${token}`;
            } catch (error) {
                console.error("Error parsing token:", error);
            }
        }
        return config
    }, 
    (error) => {
        return Promise.reject(error);
    }
)

let toastDisplayed = false;

axiosInstance.interceptors.response.use(
    (response) => {
        if(response?.data?.message === "jwt expired") {
            localStorage.removeItem('token');
            window.location.replace("/login")
        }
        return response;
    },
    (error) => {
        const userToken = localStorage.getItem("token");
        if(!userToken) {
            localStorage.removeItem("userData");
            if(!toastDisplayed) {
                toast.error("Coudn't find token! Please login again")
                toastDisplayed = true;
            }
            setTimeout(() => {
                window.location.replace("/login");
            },3000)
        }
        console.error(error)
        return Promise.reject(error)
    }
)

export default axiosInstance;