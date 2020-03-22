'use strict';
const env = require('../../env'),
  lookupByName = require('./lookupByName'),
  {PiHoleController} = require('../../controllers');

exports = module.exports = serviceName => {
  const controller = new PiHoleController(env.piholeUri());
  return lookupByName(serviceName)
    .then(service => new Promise((resolve, reject) => {
      (function nextDomain(i) {
        if (i < service.domains.length) {
          const dom = service.domains[i];
          controller.removeRegexMatch(dom.regex)
            .then(() => nextDomain(i + 1))
            .catch(reject);
        } else {
          resolve();
        }
      }(0));
    }));
};
