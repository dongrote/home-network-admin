'use strict';
const core = require('../../core'),
  qrcode = require('qrcode');

exports = module.exports = (req, res, next) => {
  res.on('error', next);
  qrcode.toFileStream(res, core.auth.mfaQRCodeUrl());
};
