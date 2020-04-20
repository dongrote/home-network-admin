'use strict';
const _ = require('lodash'),
  available = require('./available'),
  devices = require('../devices'),
  log = require('debug-logger')('core:wol:state');

exports = module.exports = () => available()
  .then(hosts => new Promise((resolve, reject) => {
    log.debug(`collecting state on ${_.size(hosts)} hosts`);
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
