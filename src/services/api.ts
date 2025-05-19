// services/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://testelysia.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
