//installed third party packages


let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


//modules for authentication
let session = require('express-session');
let passport = require('passport');

// let passportJWT = require('passport-jwt');
//let JWTStrategy = passportJWT.Strategy;
//let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//database setup
let mongoose = require('mongoose');
let DB = require('./db');
// point mongoose to the db uri
mongoose.connect(DB.URI, {useNewurlParser: true, useUnifiedTopology: true});


let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to mongoDB...');
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let booksRouter = require('../routes/book');

let app = express();

// view engine setup

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');  //express engine

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// create user mode session
let userModel = require('../models/user')
let User = userModel.User

// implement a User Authentication Strategy
passport.use(User.createStrategy());


// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact-List', booksRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'Error'});
});








// initialize passport


// passport user configuration


















module.exports = app;
