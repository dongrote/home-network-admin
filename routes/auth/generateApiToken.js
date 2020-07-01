'use strict';
const _ = require('lodash'),
  core = require('../../core');

exports = module.exports = (req, res, next) => {
  const role = _.get(req.query, 'role', 'admin');
  return core.auth.generateApiToken(role)
    .then(signedToken => res.json({token: signedToken}))
    .catch(next);
};
