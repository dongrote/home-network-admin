'use strict';
const pihole = require('../pihole'),
  available = require('./available');

exports = module.exports = () => Promise.all([pihole.blacklist(), available()])
  .then(([blacklist, services]) => {});
