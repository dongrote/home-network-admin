'use strict';
const _ = require('lodash'),
  clients = require('./clients'),
  log = require('debug-logger')('core:Websockets:clientDisconnect');

exports = module.exports = client => {
  log.info(`client ${client.id} disconnected`);
  _.unset(clients, client.id);
};
