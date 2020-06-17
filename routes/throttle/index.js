'use strict';
const router = require('express').Router();
exports = module.exports = router;

const enforceAdmin = require('../../middleware/jwtVerify')('admin');
const state = require('./state'),
  addHost = require('./addHost'),
  removeHost = require('./removeHost'),
  queryUsage = require('./hostUsage'),
  setBandwidth = require('./setBandwidth');

router.get('/', state);
router.get('/add', addHost);
router.get('/remove', removeHost);
router.get('/bandwidth', enforceAdmin, setBandwidth);
router.get('/usage', queryUsage);
