'use strict';
const router = require('express').Router();
exports = module.exports = router;
const available = require('./available'),
  blocked = require('./blocked'),
  unblock = require('./unblock'),
  block = require('./block');

router.get('/available', available);
router.get('/blocked', blocked);
router.get('/unblock', unblock);
router.get('/block', block);
