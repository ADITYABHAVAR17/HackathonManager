// File: frontend/src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Update with your backend URL
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;