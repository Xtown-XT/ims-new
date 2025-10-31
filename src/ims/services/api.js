import axios from "axios";

// ✅ Base API configuration
const api = axios.create({
  baseURL: "http://192.168.1.7:3000/ims_api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
