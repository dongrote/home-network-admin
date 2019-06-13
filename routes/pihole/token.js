'use strict';
const constants = require('../../constants'),
  log = require('debug-logger')('app:pihole:token');

exports = module.exports = htmlBody => {
  const tokenIndex = htmlBody.indexOf(constants.PiHoleTokenOpenTag) + constants.PiHoleTokenOpenTag.length,
    token = htmlBody.slice(tokenIndex, htmlBody.indexOf('<', tokenIndex));
  log.debug(`found token '${token}' at index ${tokenIndex}`);
  return token;
};
