const { serverApi } = require('../configuration')

export default {
    login: serverApi+'/login/',
    logout: serverApi+'/logout/',
    register: serverApi+'/register/',
    city: serverApi+'/city/',
    category: serverApi+'/category/',
    user: serverApi+'/user/',
    location: function(city_id) {
        return this.city+city_id+'/locations/'
    }
}