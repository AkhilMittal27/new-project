import axios, { InternalAxiosRequestConfig } from "axios"
import { API_BASE_URL } from "./constants"

const apiFetch = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

apiFetch.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token")

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default apiFetch