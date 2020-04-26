'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) => core.wol
  .create({
    hostname: req.body.hostname,
    name: req.body.name,
    hwaddress: req.body.hwaddr,
  })
  .then(device => res.json(device))
  .catch(next);
