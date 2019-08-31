'use strict';
const iptables = require('../../iptables');

exports = module.exports = (req, res, next) => iptables.deviceIsBlocked(req.params.device)
  .then(blocked => res.json({device: req.params.device, blocked}))
  .catch(next);
