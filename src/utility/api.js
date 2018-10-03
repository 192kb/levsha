import endpoints from './endpoints';
const axios = require('axios');

export function apiAvailableCities() {
    return axios.get(endpoints.getAllCities)
}

export function apiLogin(payload) {
    return axios.post(endpoints.login, payload)
}

export function apiRegister(payload) {
    return axios.post(endpoints.register, payload)
}