'use strict';
const jsonwebtoken = require('jsonwebtoken'),
  constants = require('../../constants');

exports = module.exports = (role, key) => new Promise((resolve, reject) => {
  jsonwebtoken.sign({role}, key, {
    algorithm: 'HS256',
    issuer: constants.jwtIssuer,
    expiresIn: '3m',
  }, (err, signed) => err ? reject(err) : resolve(signed));
});