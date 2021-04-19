'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../../core');

exports = module.exports = (req, res, next) => {
  const domain = _.get(req.query, 'domain');
  return Boolean(domain)
    ? core.services.validate(domain)
      .then(valid => res.json({domain, valid}))
      .catch(next)
    : Promise.resolve(next(new HttpError(400, 'missing domain parameter')));
};
