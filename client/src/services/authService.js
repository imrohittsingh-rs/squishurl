import api from "../api/axios.js";

export const register = async (userData) => {
    const response = await api.post("/users/register", userData)
    return response.data
}

export const login = async (userData) => {
    const response = await api.post("/users/login", userData)
    return response.data
}

export const logout = async () => {
    const response = await api.post("/users/logout")
    return response.data
}

export const getCurrentUser = async () => {
    const response = await api.get("/users/me")
    return response.data
}