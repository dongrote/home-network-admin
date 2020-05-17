'use strict';
const _ = require('lodash'),
  core = require('../../core');

exports = module.exports = (req, res) => {
  const name = _.get(req.query, 'name');
  res.json(core.history.get(name));
};
