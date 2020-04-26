'use strict';
const router = require('express').Router();
exports = module.exports = router;
const verify = require('./verify'),
  pubkey = require('./pubkey'),
  qrcode = require('./qrcode'),
  requireAdmin = require('../../middleware/jwtVerify')('admin');

router.get('/', verify);
router.get('/pubkey', pubkey);
router.get('/qrcode', requireAdmin, qrcode);
