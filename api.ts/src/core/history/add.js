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
  log.localMin = _.min(entries);
  log.localMax = _.max(entries);
  if (isNaN(log.min)) {
    log.min = log.localMin;
  } else {
    log.min = log.localMin < log.min ? log.localMin : log.min;
  }
  if (isNaN(log.max)) {
    log.max = log.localMax;
  } else {
    log.max = log.localMax > log.max ? log.localMax : log.max;
  }
};
