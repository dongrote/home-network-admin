'use strict';
const _ = require('lodash'),
  router = require('express').Router(),
  pihole = require('./pihole');

router.use('/pihole', pihole);

module.exports = router;
