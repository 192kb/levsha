export var baseDomainName = 'levsha.online'

module.exports = {
    clientPort: 4000,
    serverPort: 4001,
    productionPort: 4002,
    serverApi: 'https://api.'+baseDomainName,
    productionHomeURL: 'https://.'+baseDomainName,
    minPassword_length: 4,
    allowedOrigins: [
        'http://localhost:4000',
        'https://dev.'+baseDomainName, 
        'https://'+baseDomainName
    ],
    cookieMaxAge: 3600000,
    brand: 'Levsha',
}