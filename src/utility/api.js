import endpoints from './endpoints';
const axios = require('axios');
axios.defaults.withCredentials = true;

export function apiAvailableCities() {
    return axios.get(endpoints.getAllCities)
}

export function apiLogin(payload) {
    return axios.post(endpoints.login, payload)
}

export function apiRegister(payload) {
    return axios.post(endpoints.register, payload)
}

export function apiGetCurrentUserProfile() {
    return axios.get(endpoints.user);
}

export function apiGetUserProfileById(id = 0) {
    if (id > 0) {
        return axios.get(endpoints.user + id)
    }

    throw new Error('userID is wrong')
}