'use strict';
const env = require('../../env'),
  url = require('url'),
  rp = require('request-promise-native');

exports = module.exports = (token, hwaddr) => {
  const queryParams = new url.URLSearchParams({hwaddr});
  return rp.get({
    uri: `${env.firewallApiUri()}/api/ethernet/wol?${queryParams.toString()}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
