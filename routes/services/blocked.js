'use strict';
const _ = require('lodash'),
  core = require('../../core');

exports = module.exports = (req, res, next) => {
  const service = _.get(req.query, 'service', '');
  return core.services.blocked(service)
    .then(blocked => res.json({blocked}))
    .catch(next);
};
