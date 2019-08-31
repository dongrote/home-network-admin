'use strict';
const router = require('express').Router(),
  iptables = require('./iptables'),
  pihole = require('./pihole');

router.use('/iptables', iptables);
router.use('/pihole', pihole);

exports = module.exports = router;
