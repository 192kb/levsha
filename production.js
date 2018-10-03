const express = require('express')
const app = express()
const path = require('path')

const { production_port } = require('./src/configuration')

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(production_port, () => {
    console.log('Listening on localhost: '+production_port)
    console.log('A api now available at https://api.levsha.online/')
})