'use strict';
const router = require('express').Router();
exports = module.exports = router;
const _ = require('lodash'),
  {WakeOnLan} = require('../../controllers');

router.get('/', (req, res, next) => WakeOnLan(_.get(req.query, 'mac', ''))
  .then(() => res.sendStatus(204))
  .catch(next));
