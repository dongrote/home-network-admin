'use strict';
const logs = require('./logs');

exports = module.exports = (name, size, period) => logs[name] = {name, size, period, entries: []};
