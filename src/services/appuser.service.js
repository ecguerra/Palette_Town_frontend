import axios from 'axios'
import {setItem, getItem, removeItem} from '../utilities/localStorage.utilities'

const API_URL = 'http://localhost:8000/api/app_users/'

// SIGN UP
export const signup = (username, email, password) => {
    return axios.post(API_URL + 'signup', {
        username, email, password
    })
}

// LOG IN
export const login = (username, password) => {
    return axios.post(API_URL + 'login', {
        username, password
    })
}

// LOG OUT
export const logout = () => {
    return axios.get(API_URL + 'logout')
}