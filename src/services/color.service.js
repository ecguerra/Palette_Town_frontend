import axios from 'axios'

const COLOR_API =  'http://www.thecolorapi.com/id?'

export const getColorRGB = (red, green, blue) => {
    return axios.get(COLOR_API + `rgb=rgb(${red},${green},${blue})&format=json`)
}