'use strict';
const logs = require('./logs');

exports = module.exports = (name, size) => logs[name] = {name, size, entries: []};
