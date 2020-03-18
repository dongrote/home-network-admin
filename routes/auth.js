'use strict';
const _ = require('lodash'),
  env = require('../env'),
  core = require('../core');

exports = module.exports = (req, res, next) => {
  const token = _.get(req.query, 'token', '');
  return core.auth
    .verifyMfaToken(env.mfaKey(), token)
    .then(result => {
      if (result.verified) {
        res.cookie('jwt', result.jwt.signed, {expires: result.jwt.expiration});
      }
      res.sendStatus(result.verified ? 204 : 401);
    })
    .catch(next);
};
