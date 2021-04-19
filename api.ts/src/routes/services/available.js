'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) => core.services
  .available()
  .then(services => res.json({services}))
  .catch(next);
