'use strict';
const fs = require('fs'),
  path = require('path'),
  methods = {};

fs.readdirSync(__dirname)
  .filter(fname => fname !== 'index.js' && fname.endsWith('.js'))
  .map(fname => path.basename(fname, '.js'))
  .each(fname => {
    methods[fname] = require(`./${fname}`);
  });

exports = module.exports = methods;
