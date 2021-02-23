import axios from 'axios'

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_PALETTE : process.env.REACT_APP_PRO_URL_PALETTE

export const getAllPalettes = () => {
    return axios.get(`${API_URL}all`)
}

export const getOnePalette = id => {
    return axios.get(`${API_URL}${id}`)
}

export const getOnePaletteName = id => {
    return axios.get(`${API_URL}name/${id}`, {withCredentials: true})
}

export const getUserPalettes = () => {
    return axios.get(API_URL, {withCredentials: true})
}

export const createPalette = (name) => {
    return axios.post(`${API_URL}new`, {
        name
    },
        {withCredentials: true})
}

// still working on backend to make this so users can only edit their own palettes
export const updatePalette = (id, name) => {
    return axios.put(`${API_URL}${id}`, {
        name
    },
        {withCredentials: true})
}

// also needs better auth in backend
export const deletePalette = id => {
    return axios.delete(`${API_URL}${id}`, {withCredentials: true})
}

