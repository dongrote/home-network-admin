'use strict';
const router = require('express').Router();
exports = module.exports = router;
const _ = require('lodash'),
  core = require('../../core');

router.get('/', (req, res, next) => core.wol(_.get(req.query, 'mac', ''))
  .then(() => res.sendStatus(204))
  .catch(next));
