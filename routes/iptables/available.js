'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) => core.devices
  .available()
  .then(devices => res.json(devices))
  .catch(next);
