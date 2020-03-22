'use strict';
const _ = require('lodash'),
  env = require('../../env'),
  yaml = require('yaml'),
  fs = require('fs');

exports = module.exports = () => new Promise((resolve, reject) => {
  let networkDevices = [];
  fs.readFile(env.networkDevicesYamlFile(), (err, data) => {
    if (err) return reject(err);
    try {
      networkDevices = _.get(yaml.parse(data.toString()), 'devices', []);
    } catch (err) {
      return reject(err);
    }
    resolve(networkDevices);
  });
});
