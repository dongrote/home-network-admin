'use strict';
const express = require('express'),
  app = express();
exports = module.exports = app;
const _ = require('lodash'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  log = require('debug-logger')('app'),
  indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static('./public'));
app.use('/api', indexRouter);
app.use((req, res, next) => next(_.set(new Error('File Not Found'), 'statusCode', 404)));
app.use((err, req, res, next) => {
  log.error(err);
  res.status(_.get(err, 'statusCode', 500)).json({err});
});
