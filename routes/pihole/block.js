'use strict';
const _ = require('lodash'),
  request = require('request-promise'),
  cookie = require('tough-cookie'),
  log = require('debug-logger')('app:pihole:youtube:block'),
  constants = require('../../constants'),
  token = require('./token'),
  {PIHOLE_URI} = process.env;

exports = module.exports = (req, res, next) => request
  .get({uri: `${PIHOLE_URI}${constants.PiHoleBlacklist}`, resolveWithFullResponse: true})
  .then(response => {
    const cookies = _.get(response, 'headers.set-cookie', []).map(cookie.parse),
      jar = request.jar();
    jar.setCookie(_.first(cookies).toString(), PIHOLE_URI);
    const uri = `${PIHOLE_URI}${constants.PiHoleAddBlacklist}`,
      formData = {domain: constants.YouTubeContentDomain, list: 'wild', token: token(response.body)};
    return request.post({uri, formData, jar, resolveWithFullResponse: true});
  })
  .then(response => res.sendStatus(response.statusCode))
  .catch(next);
