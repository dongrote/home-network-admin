'use strict';
const env = require('../../env'),
  url = require('url'),
  rp = require('request-promise-native');

exports = module.exports = (hostname, sampleTime) => {
  const queryParams = new url.URLSearchParams({hostname, sampleTime});
  return rp.get({
    json: true,
    uri: `${env.firewallApiUri()}/api/throttle/usage?${queryParams.toString()}`
  })
  .then(({bps}) => ({
    Mbps: bps > 1000000 ? Math.round(bps / 1000000) : null,
    Kbps: bps > 1000 ? Math.round(bps / 1000) : null,
    bps: Math.round(bps),
  }));
};
