'use strict';
const cp = require('child_process'),
  dns = require('dns'),
  save = require('./save');

exports = module.exports = deviceName => new Promise((resolve, reject) => {
  dns.lookup(deviceName, (err, addr, family) => {
    if (err) {
      return reject(err);
    }
    cp.execFile('iptables', ['-A', 'FORWARD', '-p', 'tcp', '-s', addr, '-j', 'REJECT', '--reject-with', 'tcp-reset'], err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
})
.then(() => save());
