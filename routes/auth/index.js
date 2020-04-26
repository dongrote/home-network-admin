'use strict';
const router = require('express').Router();
exports = module.exports = router;
const verify = require('./verify'),
  pubkey = require('./pubkey');

router.get('/', verify);
router.get('/pubkey', pubkey);
