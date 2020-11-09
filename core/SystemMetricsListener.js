'use strict';
const EventEmitter = require('events');
function SystemMetricsListener (socket) {
  EventEmitter.call(this);
  this.socket = socket;
  this.socket.on('message', msg => this.handleMessage(msg));
}
exports = module.exports = SystemMetricsListener;

SystemMetricsListener.prototype = Object.create(EventEmitter.prototype);
Object.defineProperty(SystemMetricsListener.prototype, 'constructor', {
  value: SystemMetricsListener,
  enumerable: false,
  writable: true,
});

const log = require('debug-logger')('SystemMetricsListener'),
  dgram = require('dgram');

SystemMetricsListener.create = (publishAddress, publishPort) => {
  const socket = dgram.createSocket('udp4');
  return new Promise((resolve, reject) => {
    socket.bind(publishPort, err => {
      if (err) return reject(err);
      socket.addMembership(publishAddress);
      resolve(new SystemMetricsListener(socket));
    });
  });
};

SystemMetricsListener.prototype.handleMessage = function (msg) {
  let json;
  try {
    json = JSON.parse(msg.toString());
  } catch (e) {
    log.error(e);
    this.emit('error', e);
  }
  if (!json) return;
  this.emit('rx', json);
};