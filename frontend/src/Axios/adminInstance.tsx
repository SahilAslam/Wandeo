import axios from "axios";
const arr = ["http://localhost:5000/admin","https://wandeo.website/admin"]
const adminInstance = axios.create({
    baseURL: arr[0]
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