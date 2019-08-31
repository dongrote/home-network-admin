'use strict';
const cp = require('child_process'),
  ruleToArgs = require('./ruleToArgs');

exports = module.exports = (command, rule) => new Promise((resolve, reject) => {
  cp.execFile('iptables', ruleToArgs(command, rule), err => err ? reject(err) : resolve(0));
});
