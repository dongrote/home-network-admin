'use strict';
const fs = require('fs');

exports = module.exports = () => new Promise((resolve, reject) => {
  fs.readFile('/proc/loadavg', (err, data) => {
    if (err) return reject(err);
    resolve(data.toString().split(' ').slice(0,3).map(n => Number(n)));
  });
});