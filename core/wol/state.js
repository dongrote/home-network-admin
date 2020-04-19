'use strict';
const _ = require('lodash'),
  available = require('./available'),
  env = require('../../env'),
  rp = require('request-promise-native');

exports = module.exports = () => Promise
  .all([available(), rp.get({json: true, uri: `${env.firewallApiUri()}/api/ethernet/online`})])
  .then(([devices, online]) => _.map(devices, d => _.set(d, 'online', _.includes(online, _.get(d, 'hwaddress')))));
