'use strict';
const notp = require('notp'),
  constants = require('../../constants'),
  moment = require('moment'),
  jsonwebtoken = require('jsonwebtoken');

exports = module.exports = (mfaKey, token, jwtKey) => new Promise((resolve, reject) => {
  const totpVerify = notp.totp.verify(token, mfaKey);
  if (totpVerify === null) {
    return resolve({verified: false});
  }
  jsonwebtoken.sign({}, jwtKey, {algorithm: 'HS256', issuer: constants.jwtIssuer, expiresIn: '3m'}, (err, signed) => {
    if (err) {
      return reject(err);
    }
    resolve({verified: true, jwt: {signed, expiration: moment().add(3, 'm').toDate()}});
  });
});
