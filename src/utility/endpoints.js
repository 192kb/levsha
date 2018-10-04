const { serverApi } = require('../configuration')

export default {
    login: serverApi+'/login/',
    register: serverApi+'/register/',
    getAllCities: serverApi+'/city/',
    user: serverApi+'/user/',
}