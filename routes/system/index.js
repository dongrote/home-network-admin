'use strict';
const router = require('express').Router();
exports = module.exports = router;
const state = require('./state'),
  history = require('./history');

router.get('/state', state);
router.get('/history', history);
