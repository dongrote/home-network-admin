'use strict';
const dns = require('dns'),
  createBlockRule = require('./createBlockRule'),
  checkRuleExists = require('./checkRuleExists');

exports = module.exports = name => new Promise((resolve, reject) => {
  dns.lookup(name, (err, addr) => err ? reject(err) : resolve(addr));
})
.then(addr => checkRuleExists(createBlockRule(addr)));
