'use strict';
const _ = require('lodash'),
  env = require('../../env'),
  yaml = require('yaml'),
  fs = require('fs');

exports = module.exports = () => new Promise((resolve, reject) => {
  let networkServices = [];
  fs.readFile(env.networkServicesYamlFile(), (err, data) => {
    if (err) return reject(err);
    try {
      networkServices = _.get(yaml.parse(data.toString()), 'services', []);
    } catch (err) {
      return reject(err);
    }
    resolve(networkServices);
  });
});
