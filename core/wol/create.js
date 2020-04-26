'use strict';
const available = require('./available'),
  persist = require('./persist'),
  emitState = require('./emitState');

exports = module.exports = device => {
  const storedDevice = {
    hostname: device.hostname,
    name: device.name,
    hwaddress: device.hwaddr,
  };
  return available()
    .then(devices => {
      devices.push(storedDevice);
      return persist(devices);
    })
    .then(() => emitState())
    .then(() => storedDevice);
};
