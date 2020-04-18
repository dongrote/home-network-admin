'use strict';
const _ = require('lodash'),
  server = require('./server');

exports = module.exports = (event, msg) => {
  const io = server();
  if (io) {
    io.sockets.emit(event, msg);
  }
};
