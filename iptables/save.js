'use strict';
const cp = require('child_process'),
  fs = require('fs'),
  constants = require('./constants');

exports = module.exports = () => new Promise((resolve, reject) => {
  const filestream = fs.createWriteStream(constants.iptablesRulesPath);
  filestream
    .on('error', reject)
    .on('open', () => {
      const child = cp.spawn('iptables-save', {stdio: ['ignore', filestream, 'ignore']});
      child.on('exit', () => resolve());
      child.on('error', reject);
    });
});
