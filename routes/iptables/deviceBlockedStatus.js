'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) => core.device.isBlocked(req.params.device)
  .then(blocked => res.json({device: req.params.device, blocked}))
  .catch(next);
