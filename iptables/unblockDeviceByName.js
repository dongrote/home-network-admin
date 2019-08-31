'use strict';
const cp = require('child_process'),
  dns = require('dns');

exports = module.exports = deviceName => new Promise((resolve, reject) => {
  dns.lookup(deviceName, (err, addr, family) => {
    if (err) {
      return reject(err);
    }
    cp.execFile('iptables', ['-D', 'INPUT', '-s', addr, '-j', 'REJECT'], err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
});
