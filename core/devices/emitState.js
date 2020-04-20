'use strict';
const state = require('./state'),
  Websockets = require('../Websockets');

exports = module.exports = () => state().then(devices => Websockets.emit('devices', devices));
