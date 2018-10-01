const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mysql = require('mysql');
let { credetials } = require('./credentials/db');
let { server_port } = require('./configuration');

const connection = mysql.createConnection({
  host     : credetials.host,
  user     : credetials.user,
  password : credetials.password,
  database : credetials.database
});
connection.connect();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/city', function (req, res) {
  connection.query('select * from city', function (err, result) {
    if (err) throw err
    
    return res.send(result); 
  });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(server_port, () => {
  console.log('Listening on localhost: '+server_port)
})
