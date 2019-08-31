'use strict';
const exec = require('./exec');

exports = module.exports = rule => exec('-C', rule)
  .then(() => true)
  .catch(err => {
    console.error(err);
    if (err.code === 1) {
      return false;
    }
    throw err;
  });
