'use strict';
const pushRule = require('./pushRule'),
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
    .then(exists => exists ? null : pushRule(rule));
})
.then(() => save());
