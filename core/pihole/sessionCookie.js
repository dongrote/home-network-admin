'use strict';
const _ = require('lodash'),
  rp = require('request-promise-native');

exports = module.exports = piholeUri => rp
  .get({
    uri: `${piholeUri}/admin/`,
    resolveWithFullResponse: true,
  })
  .then(res => {
    const cookies = _.map(_.get(res.headers, 'set-cookie', []), c => rp.cookie(c));
    return _.find(cookies, c => _.get(c, 'key') === 'PHPSESSID');
  });
