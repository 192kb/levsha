const express = require('express')
const app = express()
const path = require('path')

const { productionPort, productionHomeURL } = require('./src/configuration')

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(productionPort, () => {
    console.log('Listening on localhost: '+productionPort)
    console.log('A production served now at '+productionHomeURL)
})