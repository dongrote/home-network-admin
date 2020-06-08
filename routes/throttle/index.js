'use strict';
const router = require('express').Router();
exports = module.exports = router;

const enforceAdmin = require('../../middleware/jwtVerify')('admin');
const state = require('./state'),
  setBandwidth = require('./setBandwidth');

router.get('/', state);
router.get('/bandwidth', enforceAdmin, setBandwidth);
