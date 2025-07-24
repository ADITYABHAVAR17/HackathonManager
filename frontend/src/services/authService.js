import axios from "axios";

const API_URL = "/api/auth"; // Update with your backend URL

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const verifyToken = async (token) => {
  const response = await axios.get(`${API_URL}/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.user;
};
