'use strict';
const _ = require('lodash'),
  rp = require('request-promise-native');

exports = module.exports = session => rp
  .get({
    json: true,
    uri: `${session.uri}/admin/api.php?list=black`,
  })
  .then(res => _.flatten(res));
