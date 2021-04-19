'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) =>  core.devices
  .create({
    hostname: req.body.hostname,
    name: req.body.name,
  })
  .then(device => res.json(device))
  .catch(next);
