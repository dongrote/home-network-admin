'use strict';
const notp = require('notp'),
  createJwt = require('./createJwt'),
  moment = require('moment');

exports = module.exports = (mfaKey, token, jwtKey) => new Promise((resolve, reject) => {
  const totpVerify = notp.totp.verify(token, mfaKey);
  if (totpVerify === null) {
    return resolve({verified: false});
  }
  createJwt('admin', jwtKey)
    .then(signed => resolve({verified: true, jwt: {signed, expiration: moment().add(3, 'm').toDate()}}))
    .catch(reject);
});
