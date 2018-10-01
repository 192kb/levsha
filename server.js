const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mysql = require('mysql');
import { credetials } from './credentials/db';

const connection = mysql.createConnection({
  host     : credetials.host,
  user     : credetials.user,
  password : credetials.password,
  database : credetials.database
});

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
