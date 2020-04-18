'use strict';
let server;

exports = module.exports = newServer => {
  if (newServer) {
    server = newServer;
  }
  return server;
};
