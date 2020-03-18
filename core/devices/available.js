'use strict';
const env = require('../../env');

exports = module.exports = () => new Promise(resolve => resolve(env.networkDevices()));
