'use strict';
const _ = require('lodash'),
  available = require('./available'),
  blocked = require('./blocked');

exports = module.exports = () => available()
  .then(services => new Promise((resolve, reject) => {
    (function next(i) {
      if (i < _.size(services)) {
        const service = services[i];
        blocked(service.name)
          .then(blocked => {
            service.blocked = blocked;
            next(i + 1);
          })
          .catch(reject);
      } else {
        resolve(services);
      }
    }(0));
  }));
