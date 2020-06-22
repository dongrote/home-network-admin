'use strict';
const env = require('../../env'),
  url = require('url'),
  emitState = require('./emitState'),
  rp = require('request-promise-native');

exports = module.exports = (token, bandwidth) => {
  const queryParams = new url.URLSearchParams({bandwidth});
  return rp.post({
    uri: `${env.firewallApiUri()}/api/throttle/bandwidth?${queryParams.toString()}`,
    headers: {Authorization: `Bearer ${token}`},
  })
  .then(() => emitState());
};
