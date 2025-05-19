// services/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001", // หรือ URL ที่ถูกต้อง
  headers: {
    "Content-Type": "application/json",
  },
});
