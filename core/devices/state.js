'use strict';
const _ = require('lodash'),
  available = require('./available'),
  blocked = require('./isBlocked'),
  online = require('./online');

exports = module.exports = () => available()
  .then(devices => new Promise((resolve, reject) => {
    (function next(i) {
      if (i < _.size(devices)) {
        const device = devices[i];
        Promise.all([blocked(device.name), online(device.name)])
          .then(([blocked, online]) => {
            device.blocked = blocked;
            device.online = online;
            next(i + 1);
          })
          .catch(reject);
      } else {
        resolve(devices);
      }
    }(0));
  }));
