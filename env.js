'use strict';
const _ = require('lodash'),
  fs = require('fs'),
  yaml = require('yaml');

let networkDevices = [];
try {
  networkDevices = yaml.parse(fs.readFileSync(_.get(process.env, 'NETWORK_DEVICES_YAML', 'network-devices.yaml')).toString());
} catch (err) {
  console.error('error parsing network-devices.yaml', err);
}

exports = module.exports = {
  mfaKey: () => _.get(process.env, 'MFA_KEY', 'secret'),
  jwtKey: () => _.get(process.env, 'JWT_KEY', 'secret'),
  piholeUri: () => _.get(process.env, 'PIHOLE_URI', 'http://pi.hole'),
  networkDevices: () => networkDevices,
};
