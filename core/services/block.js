'use strict';
const _ = require('lodash'),
  env = require('../../env'),
  lookupByName = require('./lookupByName'),
  pihole = require('../pihole'),
  log = require('debug-logger')('core:services:block');

exports = module.exports = serviceName => Promise
  .all([
    pihole.session(env.piholeUri(), env.piholeWebpassword()),
    lookupByName(serviceName),
  ])
  .then(([piholeSession, service]) => pihole.blacklist(piholeSession)
    .then(blacklist => new Promise((resolve, reject) => {
      log.debug('blacklist', blacklist);
      log.debug('domains', service.domains);
      (function next(i) {
        if (i < _.size(service.domains)) {
          const domain = service.domains[i];
          if (_.includes(blacklist, domain.regex)) {
            next(i + 1);
          } else {
            pihole.addWildcard(piholeSession, domain.wildcard)
              .then(() => next(i + 1))
              .catch(reject);
          }
        } else {
          resolve();
        }
      }(0));
    })));
