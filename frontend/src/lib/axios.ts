import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoggedIn = localStorage.getItem("user");
      if (isLoggedIn) {
        // Only redirect if session expired, not on failed login attempt
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error); // ← rethrow original, keeps error.response intact
  },
);

export default api;
