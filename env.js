'use strict';
const _ = require('lodash'),
  path = require('path');

const configDirectory = () => _.get(process.env, 'CONFIG_DIR', '/var/run/home-network-admin');
const tokenExpirationValue = () => Number(_.get(process.env, 'TOKEN_EXPIRATION_VALUE', '3'));
const tokenExpirationUnit = () => _.get(process.env, 'TOKEN_EXPIRATION_UNIT', 'm');

exports = module.exports = {
  configDirectory,
  tokenExpirationValue,
  tokenExpirationUnit,
  mfaKey: () => _.get(process.env, 'MFA_KEY', 'secret'),
  jwtKey: () => _.get(process.env, 'JWT_KEY', 'secret'),
  jwtIssuer: () => _.get(process.env, 'JWT_ISSUER', 'home-network-admin'),
  jwtAlgorithm: () => _.get(process.env, 'JWT_ALGORITHM', 'RS256'),
  jwtExpiresIn: () => `${tokenExpirationValue()}${tokenExpirationUnit()}`,
  piholeUri: () => _.get(process.env, 'PIHOLE_URI', 'http://pi.hole'),
  piholeWebpassword: () => _.get(process.env, 'PIHOLE_WEBPASSWORD', ''),
  piholeDnsRestartGracePeriod: () => Number(_.get(process.env, 'PIHOLE_DNS_RESTART_GRACE_PERIOD_MS', '3000')),
  firewallApiUri: () => _.get(process.env, 'FIREWALL_API_URI', 'http://pi.hole:3000'),
  networkDevicesYamlFile: () => path.join(configDirectory(), _.get(process.env, 'NETWORK_DEVICES_YAML', 'network-devices.yaml')),
  networkServicesYamlFile: () => path.join(configDirectory(), _.get(process.env, 'NETWORK_SERVICES_YAML', 'network-services.yaml')),
  wolDevicesYamlFile: () => path.join(configDirectory(), _.get(process.env, 'WOL_DEVICES_YAML', 'wol-devices.yaml')),
  pingTimeout: () => Number(_.get(process.env, 'PING_TIMEOUT', '1')),
  pingCount: () => Number(_.get(process.env, 'PING_COUNT', '1')),
  publickeyPath: () => path.join(configDirectory(), _.get(process.env, 'JWT_PUBLIC_KEY', 'jwtkey.rsa.pub.pem')),
  privatekeyPath: () => path.join(configDirectory(), _.get(process.env, 'JWT_PRIVATE_KEY', 'jwtkey.rsa.pem')),

};
