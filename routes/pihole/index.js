'use strict';
const router = require('express').Router(),
  block = require('./block'),
  unblock = require('./unblock'),
  status = require('./status');

router.patch('/youtube/block', block.YouTube);
router.patch('/twitch/block', block.Twitch);
router.patch('/youtube/unblock', unblock.YouTube);
router.patch('/twitch/unblock', unblock.Twitch);
router.get('/youtube/status', status.YouTube);
router.get('/twitch/status', status.Twitch);

exports = module.exports = router;
