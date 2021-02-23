import axios from 'axios'

// const API_URL = 'http://localhost:8000/api/color_palettes/'
const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_COLORPALETTE : process.env.REACT_APP_PRO_URL_COLORPALETTE


export const createColorPalette = (color, palette) => {
    return axios.post(API_URL, {color, palette}, {withCredentials: true})
}

export const deleteColorPalette = id => {
    return axios.delete(API_URL + id, {withCredentials: true})
}