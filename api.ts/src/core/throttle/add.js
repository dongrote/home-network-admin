'use strict';
const env = require('../../env'),
  url = require('url'),
  emitState = require('./emitState'),
  rp = require('request-promise-native');

exports = module.exports = (token, hostname) => {
  const queryParams = new url.URLSearchParams({hostname});
  return rp.get({
    uri: `${env.firewallApiUri()}/api/throttle/hosts/add?${queryParams.toString()}`,
    headers: {Authorization: `Bearer ${token}`},
  })
  .then(() => emitState());
};
