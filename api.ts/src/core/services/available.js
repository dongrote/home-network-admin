'use strict';
const _ = require('lodash'),
  env = require('../../env'),
  yaml = require('../yaml');

exports = module.exports = () => yaml(env.networkServicesYamlFile())
  .then(data => _.get(data, 'services', []));
