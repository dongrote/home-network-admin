'use strict';
const _ = require('lodash'),
  available = require('./available'),
  blocked = require('./isBlocked');

exports = module.exports = () => available()
  .then(devices => new Promise((resolve, reject) => {
    (function next(i) {
      if (i < _.size(devices)) {
        const device = devices[i];
        blocked(device.name)
          .then(blocked => {
            device.blocked = blocked;
            next(i + 1);
          })
          .catch(reject);
      } else {
        resolve(devices);
      }
    }(0));
  }));
