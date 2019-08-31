'use strict';
const appendRule = require('./appendRule'),
  checkRuleExists = require('./checkRuleExists'),
  createBlockRule = require('./createBlockRule'),
  dns = require('dns'),
  save = require('./save');

exports = module.exports = deviceName => new Promise((resolve, reject) => {
  dns.lookup(deviceName, (err, addr) => err ? reject(err) : resolve(addr));
})
.then(addr => {
  const rule = createBlockRule(addr);
  return checkRuleExists(rule)
    .then(exists => exists ? null : appendRule(rule));
})
.then(() => save());
