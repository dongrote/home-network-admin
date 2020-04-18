'use strict';
const _ = require('lodash'),
  env = require('../../env'),
  lookupByName = require('./lookupByName'),
  emitState = require('./emitState'),
  pihole = require('../pihole');

exports = module.exports = serviceName => Promise
  .all([
    pihole.session(env.piholeUri(), env.piholeWebpassword()),
    lookupByName(serviceName),
  ])
  .then(([piholeSession, service]) => pihole.blacklist(piholeSession)
    .then(blacklist => new Promise((resolve, reject) => {
      (function next(i) {
        if (i < _.size(service.domains)) {
          const domain = service.domains[i];
          if (_.includes(blacklist, domain.regex)) {
            pihole.subRegex(piholeSession, domain.regex)
              .then(() => next(i + 1))
              .catch(reject);
          } else {
            next(i + 1);
          }
        } else {
          resolve();
        }
      }(0));
    })))
  .then(() => emitState());
