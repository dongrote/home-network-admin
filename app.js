'use strict';
const express = require('express'),
  app = express();
exports = module.exports = app;
const _ = require('lodash'),
  env = require('./env'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  log = require('debug-logger')('app'),
  jwtInit = require('./middleware/jwtInit'),
  core = require('./core'),
  indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(jwtInit(env.jwtKey()));
app.use('/', express.static('./public'));
app.use('/api', indexRouter);
app.use((req, res, next) => next(_.set(new Error('File Not Found'), 'statusCode', 404)));
app.use((err, req, res, next) => {
  log.error(err);
  res.status(_.get(err, 'statusCode', 500)).json({err});
});

core.history.create('load', env.maxLoadHistory());
core.history.create('temp', env.maxTempHistory());
setInterval(() => core.system.loadavg()
  .then(([load]) => core.history.add('load', load))
  .catch(log.error), env.loadPollPeriod());
setInterval(() => core.system.temp()
  .then(temp => core.history.add('temp', temp.celsius))
  .catch(log.error), env.tempPollPeriod());
