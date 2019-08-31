'use strict';
const router = require('express').Router(),
  blockDevice = require('./blockDevice'),
  unblockDevice = require('./unblockDevice');

router.get('/block/:device', blockDevice);
router.get('/unblock/:device', unblockDevice);

exports = module.exports = router;
