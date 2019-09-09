'use strict';
const exec = require('./exec');

exports = module.exports = rule => exec('-I', rule);
