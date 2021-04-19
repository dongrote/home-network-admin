'use strict';
const env = require('../../env'),
  generateKeys = require('./generateKeys'),
  fs = require('fs-extra');

exports = module.exports = () => fs.access(env.publickeyPath(), fs.constants.R_OK)
  .catch(() => generateKeys())
  .then(() => fs.readFile(env.publickeyPath()))
  .then(data => data.toString());
