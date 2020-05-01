'use strict';
const router = require('express').Router();
exports = module.exports = router;
const enabled = require('./enabled'),
  disable = require('./disable');

router.get('/enabled', enabled);
router.get('/disable', disable);
