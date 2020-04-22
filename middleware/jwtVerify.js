'use strict';
const _ = require('lodash'),
  constants = require('../constants'),
  jsonwebtoken = require('jsonwebtoken'),
  HttpError = require('http-error-constructor');

exports = module.exports = key => (req, res, next) => {
  const signed = _.get(req.cookies, 'jwt', '');
  jsonwebtoken.verify(signed, key, {algorithms: ['HS256'], issuer: constants.jwtIssuer}, (err, decoded) => {
    if (err) return next(new HttpError(401, err.message));
    if (decoded.role !== 'admin') return next(new HttpError(401, 'required role: admin'));
    req.jwt = decoded;
    next();
  });
};
