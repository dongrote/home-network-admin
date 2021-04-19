'use strict';
exports = module.exports = {};
const fs = require('fs'),
  path = require('path');

fs.readdirSync(__dirname)
  .filter(fname => fname !== path.basename(__filename))
  .map(fname => path.basename(fname, '.js'))
  .forEach(fname => {
    exports[fname] = require(`./${fname}`);
  });
