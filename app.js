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

core.SystemMetricsListener.create(env.publishAddress(), env.publishPort())
  .then(systemMetricsListener => systemMetricsListener
    .on('rx', msg => {
      log.info('received system-metrics message from', msg.hostname);
      core.Websockets.emit('system-metrics', msg);
    })
    .on('error', err => log.error('systemMetricsListener', err)))
  .catch(err => log.error('SystemMetricsListener.create', err));


core.history.create('load', env.maxLoadHistory(), env.loadPollPeriod());
core.history.create('temp', env.maxTempHistory(), env.tempPollPeriod());
setInterval(() => core.system.loadavg()
  .then(([load]) => {
    core.history.add('load', load);
    core.Websockets.emit('load', {load, history: core.history.get('load')});
  })
  .catch(log.error), env.loadPollPeriod());
setInterval(() => core.system.temp()
  .then(temp => {
    core.history.add('temp', temp.celsius);
    core.Websockets.emit('temp', {temp, history: core.history.get('temp')});
  })
  .catch(log.error), env.tempPollPeriod());
