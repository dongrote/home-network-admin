'use strict';
const loadavg = require('./loadavg'),
  temp = require('./temp');

exports = module.exports = () => Promise.all([loadavg(), temp()])
  .then(([loadArray, tempReading]) => ({loadavg: loadArray, temp: tempReading}));
