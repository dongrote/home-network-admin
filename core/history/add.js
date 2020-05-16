'use strict';
const _ = require('lodash'),
  logs = require('./logs');

exports = module.exports = (name, value) => {
  const log = _.get(logs, name, {}),
    entries = _.get(log, 'entries', []);
  if (entries.length === log.size) {
    entries.shift();
  }
  entries.push(value);
};
