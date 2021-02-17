import axios from 'axios'

const API_URL = 'http://localhost:8000/api/color_palettes/'

export const createColorPalette = (color, palette) => {
    return axios.post(API_URL, {color, palette}, {withCredentials: true})
}

export const deleteColorPalette = id => {
    return axios.delete(API_URL + id, {withCredentials: true})
}