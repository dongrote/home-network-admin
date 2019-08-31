'use strict';
const exec = require('./exec');

exports = module.exports = rule => exec('-C', rule)
  .then(() => true)
  .catch(err => {
    if (err.code === 1) {
      return false;
    }
    console.error(err);
    throw err;
  });
