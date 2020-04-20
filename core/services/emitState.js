'use strict';
const state = require('./state'),
  Websockets = require('../Websockets');

exports = module.exports = () => Websockets.hasClients()
  ? state().then(services => Websockets.emit('services', services))
  : Promise.resolve();
