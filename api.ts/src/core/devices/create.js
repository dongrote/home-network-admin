'use strict';
const available = require('./available'),
  persist = require('./persist'),
  emitState = require('./emitState');

exports = module.exports = device => {
  const storedDevice = {
    name: device.hostname,
    icon: 'computer',
    canonicalName: device.name,
  };
  return available()
    .then(devices => {
      devices.push(storedDevice);
      return persist(devices);
    })
    .then(() => emitState())
    .then(() => storedDevice);
};
