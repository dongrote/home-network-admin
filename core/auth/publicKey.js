'use strict';
const env = require('../../env'),
  fs = require('fs');

exports = module.exports = () => new Promise((resolve, reject) => {
  fs.readFile(env.publickeyPath(), (err, data) => err ? reject(err) : resolve(data.toString()));
});
