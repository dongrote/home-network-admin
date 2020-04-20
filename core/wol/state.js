'use strict';
const _ = require('lodash'),
  available = require('./available'),
  devices = require('../devices');

exports = module.exports = () => available()
  .then(hosts => new Promise((resolve, reject) => {
    (function next(i) {
      if (i < _.size(hosts)) {
        const host = hosts[i];
        devices.online(host.hostname)
          .then(online => {
            host.online = online;
            next(i + 1);
          })
          .catch(reject);
      } else {
        resolve(hosts);
      }
    }(0));
  }));
