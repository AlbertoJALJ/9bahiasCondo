import './libs/auth'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from './models/User'
import './libs/helpers'
import flash from 'connect-flash'
var express = require('express')
var path = require('path')
var cors = require('cors')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var exphbs = require('express-handlebars')
var indexRouter = require('./routes')
var usersRouter = require('./routes/users')

var session = require('express-session')

var app = express()

// view engine setup
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutDir: path.join(app.set('views'), 'layout'),
  partialDir: path.join(app.set('views'), 'partials'),
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

var cors = require('cors')
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())

app.use('/', indexRouter)
app.use('/users', usersRouter)

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});

module.exports = app
