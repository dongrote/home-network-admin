'use strict';
const _ = require('lodash'),
  request = require('request-promise'),
  {YouTubeContentDomainRegex} = require('../../constants'),
  {PIHOLE_URI} = process.env;

exports = module.exports = (req, res, next) => request
  .get({uri: `${PIHOLE_URI}/admin/scripts/pi-hole/php/get.php?list=black`, json: true})
  .then(response => {
    const blacklist = _.flattenDeep(response),
      blocked = _.includes(blacklist, YouTubeContentDomainRegex);
    res.json({blocked});
  })
  .catch(next);
