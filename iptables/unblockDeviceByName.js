'use strict';
const dns = require('dns'),
  checkRuleExists = require('./checkRuleExists'),
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
  const rule = {
    chain: 'FORWARD',
    proto: 'tcp',
    src: addr,
    target: 'REJECT',
    extra: ['--reject-with', 'tcp-reset']
  };
  return checkRuleExists(rule)
    .then(exists => {
      console.log(`rule ${exists ? 'exists' : 'does not exist'}`);
      console.dir(rule);
      return exists;
    })
    .then(exists => exists ? deleteRule(rule) : null);
})
.then(() => save());
