'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../../core');

exports = module.exports = (req, res, next) => {
  const token = _.get(req, 'token', ''),
    bandwidth = _.get(req.query, 'bandwidth');
  if (!bandwidth) {
    return Promise.resolve(next(new HttpError(400, 'missing bandwidth')));
  }
  return core.throttle.setBandwidth(token, bandwidth)
    .then(() => res.sendStatus(204))
    .catch(next);
};
