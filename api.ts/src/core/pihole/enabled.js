'use strict';
const _ = require('lodash'),
  env = require('../../env'),
  rp = require('request-promise-native');

exports = module.exports = () => rp.get({
  json: true,
  uri: `${env.piholeUri()}/admin/api.php?status`,
})
.then(res => _.toLower(_.get(res, 'status', 'disabled')) === 'enabled');
