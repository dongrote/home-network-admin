'use strict';
const _ = require('lodash'),
  clients = require('./clients');

exports = module.exports = () => _.size(clients) > 0;
