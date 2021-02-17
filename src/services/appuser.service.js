import axios from 'axios'

const API_URL = 'http://localhost:8000/api/app_users/'

// SIGN UP
export const signup = (username, email, password) => {
    return axios.post(API_URL + 'signup', {
        username, email, password
    },
        {withCredentials: true}
    )
}

// LOG IN
export const login = (username, password) => {
    return axios.post(API_URL + 'login', {
        username, password
    },
        {withCredentials: true}
    )
}

// LOG OUT
export const logout = () => {
    return axios.get(API_URL + 'logout', {withCredentials: true})
}

// CURRENT USER
export const getCurrentUser = () => {
    return axios.get(API_URL + 'current', {withCredentials: true})
}