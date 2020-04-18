'use strict';
const env = require('../../env'),
  url = require('url'),
  rp = require('request-promise-native'),
  emitState = require('./emitState');

exports = module.exports = hostname => {
  const queryParams = new url.URLSearchParams({action: 'block', hostname});
  return rp.get({
    json: true,
    uri: `${env.firewallApiUri()}/api/inet4?${queryParams.toString()}`,
  })
  .then(() => emitState());
};
