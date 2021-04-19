'use strict';
const _ = require('lodash'),
  core = require('../core'),
  HttpError = require('http-error-constructor');

exports = module.exports = roles => (req, res, next) => {
  const signed = _.get(req.cookies, 'jwt', ''),
    rolespec = Array.isArray(roles) ? roles : [roles];
  return core.auth.verifyJwt(signed)
    .then(decoded => {
      req.jwt = decoded;
      req.token = signed;
      if (!_.includes(rolespec, decoded.role)) {
        throw new Error(`required role(s): ${rolespec.join(', ')}`);
      }
      next();
    })
    .catch(err => next(new HttpError(401, err.message)));
};
