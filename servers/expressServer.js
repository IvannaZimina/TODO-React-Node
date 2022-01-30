const createError = require('http-errors');
const path = require('path');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authFormRoute = require('../routes/authFormRoute');
const profileRoute = require('../routes/profileRoute');

const expressServer = express(); // listen port 5000

expressServer.use(logger('dev'));
expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: false }));
expressServer.use(cookieParser());
expressServer.use(express.static(path.join(__dirname, '../public')));

// it allows to send sessions through client server requests
expressServer.use(cors({
  origin: 'http://localhost:3000', // for the react app
  methods: 'GET, POST, PUT, DELETE',
  credentials: true
}))

// routes
expressServer.use('/authForm', authFormRoute);
expressServer.use('/profile', profileRoute);

// catch 404 and forward to error handler
expressServer.use(function(req, res, next) {
  next(createError(404));
});

// error handler
expressServer.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = expressServer;
