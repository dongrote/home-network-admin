'use strict';
const _ = require('lodash'),
  core = require('../../core');

exports = module.exports = (req, res, next) => {
  const service = _.get(req.query, 'service', '');
  return core.services.block(service)
    .then(() => res.sendStatus(204))
    .catch(next);
};
