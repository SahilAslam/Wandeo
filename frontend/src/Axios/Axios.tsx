import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://localhost:5000",
    baseURL: "http://wandeo.website",
    
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

axiosInstance.interceptors.response.use(
    (response) => {
        if(response?.data?.message === "jwt expired") {
            localStorage.removeItem('token');
            window.location.replace("/login")
        }
        return response;
    },
    (error) => {
        console.error(error)
        return Promise.reject(error)
    }
)

export default axiosInstance;