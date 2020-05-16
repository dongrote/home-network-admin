'use strict';
const _ = require('lodash'),
  logs = require('./logs');

exports = module.exports = name => _.get(_.get(logs, name), 'entries', []);
