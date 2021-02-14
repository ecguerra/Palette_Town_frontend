import axios from 'axios'

const API_URL = 'http://localhost:8000/api/palettes/'

export const getAllPalettes = () => {
    return axios.get(API_URL + 'all')
}

export const getOnePalette = id => {
    return axios.get(API_URL + id)
}

export const getUserPalettes = () => {
    return axios.get(API_URL, {withCredentials: true})
}

export const createPalette = (name, app_user) => {
    return axios.post(API_URL + 'new', {
        name,
        app_user
    },
        {withCredentials: true})
}

// still working on backend to make this so users can only edit their own palettes
export const updatePalette = (id, name) => {
    return axios.put(API_URL + id, {
        name
    },
        {withCredentials: true})
}

// also needs better auth in backend
// might need to change to method:DELETE like in P3
export const deletePalette = id => {
    return axios.delete(API_URL + id, {withCredentials: true})
}

