'use strict';
const env = require('../../env'),
  jsonwebtoken = require('jsonwebtoken'),
  publicKey = require('./publicKey');

exports = module.exports = signedToken => publicKey()
  .then(pubkey => new Promise((resolve, reject) => {
    const options = {algorithms: [env.jwtAlgorithm()], issuer: env.jwtIssuer()};
    jsonwebtoken.verify(signedToken, pubkey, options, (err, decoded) => err ? reject(err) : resolve(decoded));
  }));
