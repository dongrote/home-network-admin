'use strict';
const _ = require('lodash'),
  available = require('./available');

exports = module.exports = () => available().then(devices => _.map(devices, d => _.set(d, 'online', false)));
