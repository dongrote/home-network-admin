'use strict';
const _ = require('lodash'),
  moment = require('moment'),
  core = require('../core');

exports = module.exports = key => (req, res, next) => _.has(req.cookies, 'jwt')
  ? next()
  : core.auth.createJwt('guest', key)
    .then(signed => {
      res.cookie('jwt', signed, {expires: moment().add(3, 'm').toDate()});
      next();
    })
    .catch(next);
