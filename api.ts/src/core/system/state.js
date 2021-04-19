'use strict';
const env = require('../../env'),
  loadavg = require('./loadavg'),
  storage = require('./storage'),
  temp = require('./temp');

exports = module.exports = () => Promise.all([loadavg(), temp(), storage(env.storageMountPoints())])
  .then(([loadArray, tempReading, storageStats]) => ({
    loadavg: loadArray,
    temp: tempReading,
    storage: storageStats,
  }));
