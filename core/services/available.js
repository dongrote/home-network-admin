'use strict';
const env = require('../../env'),
  yaml = require('yaml'),
  fs = require('fs');

exports = module.exports = () => new Promise((resolve, reject) => {
  let networkDevices = [];
  fs.readFile(env.networkDevicesYamlFile(), (err, data) => {
    if (err) return reject(err);
    try {
      networkDevices = yaml.parse(data.toString())
    } catch (err) {
      return reject(err);
    }
    resolve(networkDevices);
  });
});
