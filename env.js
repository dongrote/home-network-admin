'use strict';
const _ = require('lodash');

exports = module.exports = {
  mfaKey: () => _.get(process.env, 'MFA_KEY', 'secret'),
  jwtKey: () => _.get(process.env, 'JWT_KEY', 'secret'),
  piholeUri: () => _.get(process.env, 'PIHOLE_URI', 'http://pi.hole'),
};
