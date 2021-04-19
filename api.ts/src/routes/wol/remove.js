'use strict';
const _ = require('lodash'),
  HttpError = require('http-error-constructor'),
  core = require('../../core');

exports = module.exports = (req, res, next) => {
  const hwaddress = _.get(req.query, 'hwaddress');
  return (hwaddress ? core.wol.remove(hwaddress) : Promise.reject(new HttpError(400)))
    .then(() => res.sendStatus(204))
    .catch(next);
};
