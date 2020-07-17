'use strict';
const _ = require('lodash'),
  available = require('./available'),
  persist = require('./persist'),
  emitState = require('./emitState');

exports = module.exports = hwaddress => available()
  .then(devices => persist(_.filter(devices, d => d.hwaddress !== hwaddress)))
  .then(() => emitState());
