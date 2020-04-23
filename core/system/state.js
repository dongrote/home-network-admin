'use strict';
const loadavg = require('./loadavg');

exports = module.exports = () => loadavg()
  .then(loadArray => ({loadavg: loadArray}));