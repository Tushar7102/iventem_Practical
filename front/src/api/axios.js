import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
export const api = axios.create({ baseURL });
export const getToken = () => localStorage.getItem("token");
export const authHeaders = () => {
  const token = getToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};
export default api;
