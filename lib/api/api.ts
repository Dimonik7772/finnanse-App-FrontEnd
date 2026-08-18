import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});
export const refreshApi = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});
