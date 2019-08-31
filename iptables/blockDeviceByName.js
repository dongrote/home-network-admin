'use strict';
const appendRule = require('./appendRule'),
  checkRuleExists = require('./checkRuleExists'),
  dns = require('dns'),
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
  const rule = {
    chain: 'FORWARD',
    proto: 'tcp',
    src: addr,
    target: 'REJECT',
    extra: ['--reject-with', 'tcp-reset']
  };
  return checkRuleExists(rule)
    .then(exists => exists ? null : appendRule(rule));
})
.then(() => save());
