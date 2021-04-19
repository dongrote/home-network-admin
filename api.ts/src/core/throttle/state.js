'use strict';
const env = require('../../env'),
  rp = require('request-promise-native');

exports = module.exports = () => rp.get({
  json: true,
  uri: `${env.firewallApiUri()}/api/throttle`,
});
