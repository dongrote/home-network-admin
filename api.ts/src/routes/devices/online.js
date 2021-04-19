'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../../core');

exports = module.exports = (req, res, next) => {
  const hostname = _.get(req.query, 'hostname');
  if (!hostname) {
    return Promise.resolve(next(new HttpError(400, 'missing hostname parameter')));
  }
  return core.devices.online(hostname)
    .then(online => res.json({hostname, online}))
    .catch(next);
};
