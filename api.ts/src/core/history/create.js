'use strict';
const logs = require('./logs');

exports = module.exports = (name, size, period) => {
  logs[name] = {
    name,
    size,
    period,
    entries: [],
    localMin: Number(undefined),
    localMax: Number(undefined),
    min: Number(undefined),
    max: Number(undefined),
  };
};
