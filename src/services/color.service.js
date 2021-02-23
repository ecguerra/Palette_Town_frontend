import axios from 'axios'

const COLOR_API =  'http://www.thecolorapi.com/id?'
// const API_URL = 'http://localhost:8000/api/colors/'
const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_COLOR : process.env.REACT_APP_PRO_URL_COLOR

export const getColorRGB = (red, green, blue) => {
    return axios.get(COLOR_API + `rgb=rgb(${red},${green},${blue})&format=json`)
}

export const createColor = (name, hex_name, rgb_name, hsl_name, cmyk_name) => {
    return axios.post(API_URL + 'new', {
        name,
        hex_name,
        rgb_name,
        hsl_name,
        cmyk_name
    })
    // .then(created => {
    //     console.log(created)
    // })
    // .catch(err => {
    //     console.log(err)
    // })
}
