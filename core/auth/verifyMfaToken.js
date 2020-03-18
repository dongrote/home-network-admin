'use strict';
const notp = require('notp'),
  constants = require('../../constants'),
  moment = require('moment'),
  jsonwebtoken = require('jsonwebtoken');

exports = module.exports = (key, token) => new Promise((resolve, reject) => {
  const totpVerify = notp.totp.verify(token, key);
  if (totpVerify === null) {
    return resolve({verified: false});
  }
  jsonwebtoken.sign({}, key, {issuer: constants.jwtIssuer, expiresIn: '1d'}, (err, signed) => {
    if (err) {
      return reject(err);
    }
    resolve({verified: true, jwt: {signed, expiration: moment().add(1, 'days').toDate()}});
  });
});
