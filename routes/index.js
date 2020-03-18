'use strict';
const router = require('express').Router(),
  env = require('../env'),
  iptables = require('./iptables'),
  pihole = require('./pihole'),
  wol = require('./wol'),
  auth = require('./auth'),
  jwtVerify = require('../middleware/jwtVerify')(env.jwtKey());

router.get('/auth', auth);
router.use('/iptables', jwtVerify, iptables);
router.use('/pihole', jwtVerify, pihole);
router.use('/wol', jwtVerify, wol);

exports = module.exports = router;
