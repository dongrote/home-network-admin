'use strict';
const env = require('../../env'),
  url = require('url'),
  rp = require('request-promise-native');

exports = module.exports = (session, wildcard) => {
  const queryParams = new url.URLSearchParams({list: 'wild', add: wildcard});
  return rp.get({
    jar: session.cookieJar,
    uri: `${session.uri}/admin/api.php?${queryParams.toString()}`,
  })
  .then(() => new Promise(resolve => setTimeout(() => resolve(), env.piholeDnsRestartGracePeriod())));
};
