'use strict';
const _ = require('lodash');

exports = module.exports = {
  mfaKey: () => _.get(process.env, 'MFA_KEY', 'secret'),
  jwtKey: () => _.get(process.env, 'JWT_KEY', 'secret'),
  piholeUri: () => _.get(process.env, 'PIHOLE_URI', 'http://pi.hole'),
  piholeWebpassword: () => _.get(process.env, 'PIHOLE_WEBPASSWORD', ''),
  firewallApiUri: () => _.get(process.env, 'FIREWALL_API_URI', 'http://pi.hole:3000'),
  networkDevicesYamlFile: () => _.get(process.env, 'NETWORK_DEVICES_YAML', 'network-devices.yaml'),
  networkServicesYamlFile: () => _.get(process.env, 'NETWORK_SERVICES_YAML', 'network-services.yaml'),
};
