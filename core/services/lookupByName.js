'use strict';
const _ = require('lodash'),
  available = require('./available');

exports = module.exports = name => available()
  .then(services => _.find(services, {name}));
