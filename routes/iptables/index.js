'use strict';
const router = require('express').Router(),
  deviceBlockedStatus = require('./deviceBlockedStatus'),
  blockDevice = require('./blockDevice'),
  unblockDevice = require('./unblockDevice'),
  availableDevices = require('./available');

router.post('/block/:device', blockDevice);
router.delete('/block/:device', unblockDevice);
router.get('/blocked/:device', deviceBlockedStatus);
router.get('/available', availableDevices);

exports = module.exports = router;
