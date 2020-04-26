'use strict';
const env = require('../../env'),
  cp = require('child_process');

exports = module.exports = () => new Promise((resolve, reject) => {
  cp.execFile('openssl', [
    'genpkey',
    '-outform',
    'PEM',
    '-algorithm',
    'RSA',
    '-out',
    env.privatekeyPath(),
  ], err => {
    if (err) return reject(err);
    resolve();
  });
})
.then(() => new Promise((resolve, reject) => {
  cp.execFile('openssl', [
    'pkey',
    '-in',
    env.privatekeyPath(),
    '-outform',
    'PEM',
    '-pubout',
    '-out',
    env.publickeyPath(),
  ], err => {
    if (err) return reject(err);
    resolve();
  })
}));
