'use strict';
const router = require('express').Router(),
  block = require('./block'),
  unblock = require('./unblock'),
  status = require('./status');

router.patch('/youtube/block', block);
router.patch('/youtube/unblock', unblock);
router.get('/youtube/status', status);

exports = module.exports = router;
