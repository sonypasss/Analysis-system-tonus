import axios from "axios";

const api = axios.create({
  baseURL: "https://analysis-system-tonus-backend.onrender.com/api"
});

export default api;