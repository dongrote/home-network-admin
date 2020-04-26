'use strict';
const env = require('../../env'),
  fs = require('fs'),
  yaml = require('yaml');

exports = module.exports = devices => new Promise((resolve, reject) =>  {
  try {
    const data = yaml.stringify({wol: devices});
    fs.writeFile(env.wolDevicesYamlFile(), data, err => err ? reject(err) : resolve());
  } catch (err) {
    reject(err);
  }
});
