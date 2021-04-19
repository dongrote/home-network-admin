'use strict';
const _ = require('lodash'),
  core = require('../../core');
const { sample } = require('lodash');

exports = module.exports = (req, res, next) => {
  const hostname = _.get(req.query, 'hostname'),
    sampleTime = Number(_.get(req.query, 'sampleTime', 60));
  return core.throttle.usage(hostname, sampleTime)
    .then(usage => res.json(usage))
    .catch(next);
};
