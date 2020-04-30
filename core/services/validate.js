'use strict';
const dns = require('dns');

exports = module.exports = domain => new Promise(resolve => {
  dns.lookup(domain, err => resolve(!Boolean(err)));
});
