'use strict';
const env = require('../../env'),
  url = require('url'),
  rp = require('request-promise-native');

exports = module.exports = hwaddr => {
  const queryParams = new url.URLSearchParams({hwaddr});
  return rp.get(`${env.firewallApiUri()}/api/ethernet/wol?${queryParams.toString()}`);
};
