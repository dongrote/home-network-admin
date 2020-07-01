'use strict';
const env = require('../../env'),
  privateKey = require('./privateKey'),
  jsonwebtoken = require('jsonwebtoken');

exports = module.exports = role => privateKey()
  .then(signKey => new Promise((resolve, reject) => {
    jsonwebtoken.sign({role}, signKey, {
      algorithm: env.jwtAlgorithm(),
      issuer: env.jwtIssuer(),
    }, (err, signed) => err ? reject(err) : resolve(signed));
  }));
