'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../../core');

exports = module.exports = (req, res, next) => {
  const hostname = _.get(req.query, 'hostname', '');
  return _.size(hostname) > 0
    ? core.devices.ethernet(hostname)
      .then(result => res.json(result))
      .catch(next)
    : Promise.resolve(next(new HttpError(400, 'missing hostname')));
};
