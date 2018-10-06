let password_salt = (() => { throw Error('Please configure password salt') })() // the salt, let it be like password
let confirmationSalt = (() => { throw Error('Please configure confirmation salt') })() // the another salt, make it strong

module.exports = {
    sessionSecret: (() => { throw Error('Please configure session secret salt') })(),
    passwordHashFunction: function(password) { throw Error('Please create hash function') },
    confirmationHashFunction: function(email)  { throw Error('Please create hash function') },
}