import api from "../api/axios.js";

export const generateShortURL = async (url) => {
    const response = await api.post("/urls", { url })
    return response.data
}

export const getUserUrls = async () => {
    const response = await api.get("/urls")
    return response.data
}

export const getAnalytics = async (shortId) => {
    const response = await api.get(`/urls/analytics/${shortId}`)
    return response.data
}

export const deleteUrl = async (id) => {
    const response = await api.delete(`/urls/${id}`)
    return response.data
}

export const updateUrl = async (id, url) => {
    const response = await api.patch(`/urls/${id}`, { url })
    return response.data
}