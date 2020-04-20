'use strict';
const env = require('../../env'),
  cp = require('child_process');

exports = module.exports = hostname => new Promise((resolve, reject) => {
  cp.spawn('ping', ['-w', `${env.pingTimeout()}`, '-c', `${env.pingCount()}`, hostname], {stdio: 'ignore'})
    .on('error', reject)
    .on('exit', code => resolve(code === 0));
});
