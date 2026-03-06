import api from "@/lib/api"

export const signup = async (data: any) => {
  const res = await api.post("/users/Signup", data)
  return res.data
}

export const login = async (data: any) => {
  const res = await api.post("/auth/login", data)
  return res.data
}

export const getMe = async () => {
  const res = await api.get("/auth/me")
  return res.data
}