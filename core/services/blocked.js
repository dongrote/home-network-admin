'use strict';
const _ = require('lodash'),
  env = require('../../env'),
  lookupByName = require('./lookupByName'),
  {PiHoleController} = require('../../controllers');

exports = module.exports = serviceName => {
  const controller = new PiHoleController(env.piholeUri());
  return lookupByName(serviceName)
    .then(service => controller.domainsAreBlocked(_.map(_.get(service, 'domains', []), d => d.regex)));
};
