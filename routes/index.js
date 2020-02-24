'use strict';
const router = require('express').Router(),
  iptables = require('./iptables'),
  pihole = require('./pihole'),
  wol = require('./wol');

router.use('/iptables', iptables);
router.use('/pihole', pihole);
router.use('/wol', wol);

exports = module.exports = router;
