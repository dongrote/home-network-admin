'use strict';
const cp = require('child_process'),
  fs = require('fs'),
  constants = require('./constants');

exports = module.exports = new Promise((resolve, reject) => {
  const child = cp.spawn('iptables-save', {stdio: ['ignore', fs.createWriteStream(constants.iptablesRulesPath), 'ignore']});
  child.on('exit', () => resolve());
  child.on('error', reject);
});
