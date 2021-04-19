'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) =>  core.services
  .create({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
    domain: req.body.domain,
  })
  .then(service => res.json(service))
  .catch(next);
