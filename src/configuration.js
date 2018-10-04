module.exports = {
    clientPort: 4000,
    serverPort: 4001,
    productionPort: 4002,
    serverApi: 'https://api.levsha.online',
    minPassword_length: 4,
    allowedOrigins: [
        'http://localhost:4000', 
        'https://dev.levsha.online', 
        'https://levsha.online'
    ],
    cookieMaxAge: 3600000,
}