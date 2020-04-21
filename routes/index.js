'use strict';
const router = require('express').Router(),
  env = require('../env'),
  iptables = require('./iptables'),
  wol = require('./wol'),
  auth = require('./auth'),
  services = require('./services'),
  wolState = require('./wol/state'),
  serviceState = require('./services/state'),
  deviceState = require('./devices/state'),
  onlineState = require('./devices/online'),
  jwtVerify = require('../middleware/jwtVerify')(env.jwtKey());

router.get('/auth', auth);
router.use('/iptables', jwtVerify, iptables);
router.get('/wol/state', wolState);
router.use('/wol', jwtVerify, wol);
router.get('/services/state', serviceState);
router.use('/services', jwtVerify, services);
router.get('/devices/state', deviceState);
router.get('/devices/online', onlineState);

exports = module.exports = router;
