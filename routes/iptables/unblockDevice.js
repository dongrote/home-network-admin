'use strict';
const _ = require('lodash'),
  core = require('../../core');

exports = module.exports = (req, res, next) => core.devices.unblock(_.get(req, 'token', ''), req.params.device)
  .then(() => res.sendStatus(200))
  .catch(next);
