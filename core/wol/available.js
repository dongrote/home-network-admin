'use strict';
const _ = require('lodash'),
  env = require('../../env'),
  yaml = require('../yaml');

exports = module.exports = () => yaml(env.wolDevicesYamlFile())
  .then(data => _.get(data, 'wol', []));
