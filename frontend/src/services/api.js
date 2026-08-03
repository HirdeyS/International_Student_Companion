import axios from "axios";

/*
 * Central Axios instance used across the app.
 * Connects React frontend to Express backend.
 */

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});


/*
 * Attach JWT token if available
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


/*
 * Global API error logging
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);


export default api;