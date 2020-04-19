'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) => core.wol.state()
  .then(state => res.json({state}))
  .catch(next);
