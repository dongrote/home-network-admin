'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) => core.devices.unblock(req.params.device)
  .then(() => res.sendStatus(200))
  .catch(next);
