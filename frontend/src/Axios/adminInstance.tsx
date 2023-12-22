import axios from "axios";

const adminInstance = axios.create({
    // baseURL: "http://localhost:5000/admin",
    baseURL: "https://wandeo.website",
    
});

adminInstance.interceptors.request.use(
    (config) => {
        const tokenString = localStorage.getItem("adminToken")
        if(tokenString) {
            try {
                const token = JSON.parse(tokenString)

                config.headers.authorization = `Bearer ${token}`
            } catch(error) {
                console.error("Error while parsing token: ", error)
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

adminInstance.interceptors.response.use(
    (response) => {
        if(response?.data?.message === "jwt expired") {
            localStorage.removeItem("adminToken");
            window.location.replace("/admin/login")
        }
        return response;
    },
    (error) => {
        console.error(error)
        return Promise.reject(error)
    }
)

export default adminInstance;