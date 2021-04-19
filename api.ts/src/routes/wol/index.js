'use strict';
const router = require('express').Router();
exports = module.exports = router;
const _ = require('lodash'),
  core = require('../../core'),
  remove = require('./remove'),
  create = require('./create');

router.get('/', (req, res, next) => core.wol.wake(_.get(req, 'token', ''), _.get(req.query, 'mac', ''))
  .then(() => res.sendStatus(204))
  .catch(next));

router.post('/', create);

router.delete('/', remove);
