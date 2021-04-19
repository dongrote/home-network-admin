'use strict';
const yaml = require('yaml'),
  fs = require('fs');

exports = module.exports = yamlpath => new Promise((resolve, reject) => {
  let parsedYaml = null;
  fs.readFile(yamlpath, (err, data) => {
    if (err) {
      return err.code === 'ENOENT' ? resolve(parsedYaml) : reject(err);
    }
    try {
      parsedYaml = yaml.parse(data.toString());
    } catch (yamlError) {
      return reject(yamlError);
    }
    resolve(parsedYaml);
  });
});
