'use strict';
const iptables = require('../../iptables');

exports = module.exports = (req, res, next) => iptables.unblockDeviceByName(req.params.device)
  .then(() => res.sendStatus(200))
  .catch(next);
