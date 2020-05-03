'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) => core.pihole.disable()
  .then(result => res.json({enabled: result.enabled, until: result.until}))
  .catch(next);
