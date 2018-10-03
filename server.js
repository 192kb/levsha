const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const mysql = require('mysql')
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const sqlString = require('sqlstring')

const { credetials } = require('./credentials/db')
const { session_secret, password_hash_function } = require('./credentials/salt')
const { server_port } = require('./src/configuration')

const connection = mysql.createConnection({
  host     : credetials.host,
  user     : credetials.user,
  password : credetials.password,
  database : credetials.database
})
connection.connect()

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 

/// SESSION

app.use(session({
  genid: () => {
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: session_secret,
  resave: false,
  saveUninitialized: true
}))

/// CORS

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/// AUTH

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy( { usernameField: 'phone', passwordField: 'password', session: true }, (phone, password, done) => {
    const password_hash = password_hash_function(password)
    
    const sql = sqlString.format('SELECT id FROM user WHERE phone = ? AND password_hash = ? LIMIT 1', [phone, password_hash])
    connection.query(sql, function (err, users) {
      if (err) return done(err)
      if (!users[0]) { return done(null, false); }
      
      return done(null, users[0])
    })
  }
))

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(function(userID, done) {
  const sql = sqlString.format('SELECT id FROM user WHERE id = ? LIMIT 1', userID)
  connection.query(sql, function (err, users) {
    if (err) return done(err)
    done(null, users[0])
  })
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) console.log(err)
    if (info) console.log(info)

    req.login(user, (err) => {
      if (err || !user) return res.send({
        success: false,
        error: info
      })

      return res.send({
        success: true,
        user: user
      })
    })
  })(req, res, next)
})

app.post('/register', (req, res, next) => {
  var query = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    password_hash: password_hash_function(req.body.password),
    city_id: req.body.city_id
  }
  var sql = sqlString.format('INSERT INTO user SET ?', query)
  connection.query(sql, function (err, result) {
    if (err) return res.send(err)
    
    return res.send(result)
  })
})

/// ROUTING

app.get('/ping', function (req, res) {
  return res.send('pong')
})

app.get('/city', function (req, res) {
  connection.query('select * from city', function (err, result) {
    if (err) return res.send(err)
    
    return res.send(result)
  })
})

app.get('/location', function (req, res) {
  connection.query('select * from location', function (err, result) {
    if (err) return res.send(err)
    
    return res.send(result)
  })
})

app.get('/category', function (req, res) {
  connection.query('select * from category order by sorting', function (err, result) {
    if (err) return res.send(err)
    
    return res.send(result)
  })
})

app.get('/', function (req, res) {
  res.redirect('https://levsha.online')
})

app.get('/authrequired', (req, res) => {
  auth_control(req, res, {
    
  })
})

function auth_control(req, res, completion) {
  if(req.isAuthenticated()) {
    completion()
  } else {
    res.send(401, 'Unauthorized')
  }
}

/// APPLICATION AVALIBILITY

app.listen(server_port, () => {
  console.log('Listening on localhost: '+server_port)
  console.log('A api now available at https://api.levsha.online/')
})
