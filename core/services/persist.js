'use strict';
const env = require('../../env'),
  fs = require('fs'),
  yaml = require('yaml');

exports = module.exports = services => new Promise((resolve, reject) =>  {
  try {
    const data = yaml.stringify({services});
    fs.writeFile(env.networkServicesYamlFile(), data, err => err ? reject(err) : resolve());
  } catch (err) {
    reject(err);
  }
});
