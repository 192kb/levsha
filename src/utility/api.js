import endpoints from './endpoints';
const axios = require('axios');
const client = axios.create()

client.defaults.withCredentials = true
client.interceptors.response.use(undefined, err => {
    if (err.response.data.status === 'no-auth') {
        window.localStorage.clear()
        window.location.reload()
        return Promise.reject(err)
    } 
})

export const userID = 'userID'
export const user = 'user'

export function apiAvailableCities() {
    return client.get(endpoints.city)
}

export function apiAvailableCatrgories() {
    return client.get(endpoints.category)
}

export function apiAvailableLocations(city_id) {
    return client.get(endpoints.location(city_id))
}

export function apiLogin(payload) {
    return client.post(endpoints.login, payload).then(res => {
        if (res.data.success) {
            window.localStorage.setItem(userID, res.data.user.id)
            window.localStorage.setItem(user, JSON.stringify(res.data.user))
            window.location.reload()
        }
    })
}

export function apiLogout() {
    return client.get(endpoints.logout).then(res => {
        window.localStorage.clear()
        window.location.reload()
    })
}

export function apiRegister(payload) {
    return client.post(endpoints.register, payload)
}

export function apiGetCurrentUserProfile() {
    if (!window.localStorage.getItem(userID)) {
        return Promise.reject(undefined)
    }
    return client.get(endpoints.user);
}

export function apiGetUserProfileById(id = 0) {
    if (id > 0) {
        return client.get(endpoints.user + id)
    }

    throw new Error('userID is wrong')
}