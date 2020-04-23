'use strict';
const router = require('express').Router();
exports = module.exports = router;
const state = require('./state');

router.get('/state', state);