'use strict';
const _ = require('lodash'),
  env = require('../../env'),
  pihole = require('../pihole'),
  available = require('./available');

exports = module.exports = () => Promise.all([available(), pihole.blacklist({uri: env.piholeUri()})])
  .then(([services, blacklist]) => _.each(services, service => _.set(service, 'blocked', _.every(_.get(service, 'domains', []), d => _.includes(blacklist, d.regex)))));
