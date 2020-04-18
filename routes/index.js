'use strict';
const router = require('express').Router(),
  env = require('../env'),
  iptables = require('./iptables'),
  pihole = require('./pihole'),
  wol = require('./wol'),
  auth = require('./auth'),
  services = require('./services'),
  serviceState = require('./services/state'),
  deviceState = require('./devices/state'),
  jwtVerify = require('../middleware/jwtVerify')(env.jwtKey());

router.get('/auth', auth);
router.use('/iptables', jwtVerify, iptables);
router.use('/pihole', jwtVerify, pihole);
router.use('/wol', jwtVerify, wol);
router.get('/services/state', serviceState);
router.use('/services', jwtVerify, services);
router.get('/devices/state', deviceState);

exports = module.exports = router;
