import axios from "axios";

/*
* Central Axios instance used across the app.
* Automatically attaches JWT token to every request
*/
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

/*
*Adds auth token to header if found in local storage
*/
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;