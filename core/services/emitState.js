'use strict';
const state = require('./state'),
  Websockets = require('../Websockets');

exports = module.exports = () => state()
  .then(services => Websockets.emit('services', services));
