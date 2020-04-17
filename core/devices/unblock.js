'use strict';
const env = require('../../env'),
  url = require('url'),
  rp = require('request-promise-native');

exports = module.exports = hostname => {
  const queryParams = new url.URLSearchParams({action: 'unblock', hostname});
  return rp.get({
    json: true,
    uri: `${env.firewallApiUri()}/api/inet4?${queryParams.toString()}`,
  });
};
