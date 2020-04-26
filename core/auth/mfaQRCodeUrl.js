'use strict';
const env = require('../../env'),
  base32 = require('thirty-two')

const encodeForGoogle = key => base32.encode(key).toString().replace(/=/g, '');

exports = module.exports = () => `otpauth://totp/${env.jwtIssuer()}?secret=${encodeForGoogle(env.mfaKey())}&issuer=${env.jwtIssuer()}`;
