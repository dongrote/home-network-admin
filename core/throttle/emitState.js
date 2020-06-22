'use strict';
const state = require('./state'),
  Websockets = require('../Websockets');

exports = module.exports = () => state().then(throttle => Websockets.emit('throttle', throttle));
