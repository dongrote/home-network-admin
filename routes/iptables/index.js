'use strict';
const router = require('express').Router(),
  deviceBlockedStatus = require('./deviceBlockedStatus'),
  blockDevice = require('./blockDevice'),
  unblockDevice = require('./unblockDevice');

router.post('/block/:device', blockDevice);
router.delete('/block/:device', unblockDevice);
router.get('/blocked/:device', deviceBlockedStatus);

exports = module.exports = router;
