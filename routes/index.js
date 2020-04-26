'use strict';
const router = require('express').Router();
exports = module.exports = router;
const iptables = require('./iptables'),
  wol = require('./wol'),
  auth = require('./auth'),
  services = require('./services'),
  system = require('./system'),
  wolState = require('./wol/state'),
  serviceState = require('./services/state'),
  deviceState = require('./devices/state'),
  onlineState = require('./devices/online'),
  createDevice = require('./devices/create'),
  enforceAdmin = require('../middleware/jwtVerify')('admin');

router.use('/auth', auth);
router.use('/iptables', enforceAdmin, iptables);
router.get('/wol/state', wolState);
router.use('/wol', enforceAdmin, wol);
router.get('/services/state', serviceState);
router.use('/services', enforceAdmin, services);
router.post('/devices', enforceAdmin, createDevice);
router.get('/devices/state', deviceState);
router.get('/devices/online', onlineState);
router.use('/system', system);
