'use strict';
const dns = require('dns'),
  checkRuleExists = require('./checkRuleExists'),
  createBlockRule = require('./createBlockRule'),
  deleteRule = require('./deleteRule'),
  save = require('./save');

exports = module.exports = deviceName => new Promise((resolve, reject) => {
  dns.lookup(deviceName, (err, addr, family) => {
    if (err) {
      return reject(err);
    }
    resolve(addr);
  });
})
.then(addr => {
  const rule = createBlockRule(addr);
  return checkRuleExists(rule)
    .then(exists => exists ? deleteRule(rule) : null);
})
.then(() => save());
