'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../../core');

exports = module.exports = (req, res, next) => {
  const hostname = _.get(req.query, 'hostname');
  return (hostname ? core.devices.remove(hostname) : Promise.reject(new HttpError(400)))
    .then(() => res.sendStatus(204))
    .catch(next);
};
