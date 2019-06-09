'use strict';
const _ = require('lodash'),
  router = require('express').Router(),
  request = require('request-promise'),
  {PIHOLE_URI} = process.env,
  cookie = require('tough-cookie'),
  log = require('debug-logger')('app:api');

router.patch('/toggle', (req, res, next) => {
  return request.get({uri: `${PIHOLE_URI}/admin/list.php`, resolveWithFullResponse: true})
    .then(response => {
      log.debug('set-cookie', _.get(_.get(response, 'headers', {}), 'set-cookie'));
      const cookies = _.get(response, 'headers.set-cookie', []).map(cookie.parse);
      _.each(cookies, cook => log.debug('cookie', cook.toString()));
      res.json(cookies);
    })
    .catch(next);
});

router.get('/status', (req, res, next) => {
  return request.get({uri: `${PIHOLE_URI}/admin/scripts/pi-hole/php/get.php?list=black`, json: true})
    .then(response => {
      const blacklist = _.flattenDeep(response);
    })
    .catch(next);
});

module.exports = router;
