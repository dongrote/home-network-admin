'use strict';
const _ = require('lodash'),
  url = require('url'),
  rp = require('request-promise-native');

exports = module.exports = (session, regex) => {
  const queryParams = new url.URLSearchParams({list: 'regex', sub: regex});
  return rp.get({
    jar: session.cookieJar,
    uri: `${session.uri}/admin/api.php?${queryParams.toString()}`,
  });
};
