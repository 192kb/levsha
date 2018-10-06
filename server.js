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
const { sessionSecret, passwordHashFunction } = require('./credentials/salt')
const { serverPort, allowedOrigins, cookieMaxAge, serverApi, productionHomeURL } = require('./src/configuration')

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
  secret: sessionSecret,
  resave: false,
  secure: true,
  saveUninitialized: true
}))

/// CORS

app.use(function(req, res, next) {
  if (!allowedOrigins.includes(req.headers.origin)) {
    next();
    return;
  }
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  next();
}); 

/// AUTH

app.use(passport.initialize());
app.use(passport.session({cookie: { maxAge : cookieMaxAge }}));

passport.use(new LocalStrategy( { usernameField: 'phone', passwordField: 'password', session: true }, (phone, password, done) => {
    const passwordHash = passwordHashFunction(password)
    const sql = sqlString.format('select id, city_id from user where phone = ? and password_hash = ? and is_deleted = 0 limit 1', [phone, passwordHash])
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
  const sql = sqlString.format('select * from user where id = ? limit 1', userID)
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

app.get('/logout', function(req, res){
  req.logout()
  res.send({status: 'logged-out'})
})

app.post('/register', (req, res, next) => {
  var query = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    password_hash: passwordHashFunction(req.body.password),
    city_id: req.body.city_id
  }
  var sql = sqlString.format('insert into user set ?', query)
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

app.get('/city/:city_id/locations', function (req, res) {
  const sql = sqlString.format('select * from location where city_id = ?', req.params.city_id)
  connection.query(sql, function (err, result) {
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

app.get('/user', checkAuthentication, function (req, res) {
  const sql = sqlString.format('select id, photo_link, phone, firstname, lastname, secondname, vk_profile, ok_profile, fb_profile, ig_profile, tw_profile, yt_profile, be_profile, li_profile, hh_profile, phone_confirmed, email, email_confirmed from user where id = ? LIMIT 1', req.session.passport.user)

  connection.query(sql, function (err, result) {
    if (err) return res.send(err)
    
    return res.send(result[0])
  })
})

app.get('/user/:userID', function (req, res) {
  const sql = sqlString.format('select id, photo_link, phone, firstname, lastname, surname, vk_profile, ok_profile, fb_profile, ig_profile, tw_profile, yt_profile, be_profile, li_profile, hh_profile from user where id = ? AND is_deleted = 0 LIMIT 1', req.params.userID)
    connection.query(sql, function (err, result) {
      if (err) return res.send(err)
      
      return res.send(result)
  })
})

app.get('/', function (req, res) {
  res.redirect(productionHomeURL)
})

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
    next()
  } else {
    res.status(401).send({status: 'no-auth'})
  }
}

/// APPLICATION AVALIBILITY

app.listen(serverPort, () => {
  console.log('Listening on localhost: '+serverPort)
  console.log('A api now available at '+serverApi)
})
