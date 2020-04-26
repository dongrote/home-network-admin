'use strict';
const env = require('../../env'),
  generateKeys = require('./generateKeys'),
  fs = require('fs-extra');

exports = module.exports = () => fs.access(env.privatekeyPath(), fs.constants.R_OK)
  .catch(() => generateKeys())
  .then(() => fs.readFile(env.privatekeyPath()))
  .then(data => data.toString());
