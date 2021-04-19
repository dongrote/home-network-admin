'use strict';
const router = require('express').Router();
exports = module.exports = router;
const available = require('./available'),
  unblock = require('./unblock'),
  block = require('./block');

router.get('/available', available);
router.get('/unblock', unblock);
router.get('/block', block);
