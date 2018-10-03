const { server_api } = require('../configuration')

export default {
    login: server_api+'/login/',
    register: server_api+'/register/',
    getAllCities: server_api+'/city/',

}