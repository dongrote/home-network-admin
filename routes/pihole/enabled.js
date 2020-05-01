'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) => core.pihole.enabled()
  .then(enabled => res.json({enabled}))
  .catch(next);
