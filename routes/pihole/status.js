'use strict';
const {PiHoleController} = require('../../controllers'),
  constants = require('../../constants'),
  {PIHOLE_URI} = process.env;

const YouTube = (req, res, next) => {
  let controller = new PiHoleController(PIHOLE_URI);
  return controller.domainIsBlocked(constants.YouTubeContentDomainRegex)
    .then(blocked => res.json({blocked}))
    .catch(next);
};

const Twitch = (req, res, next) => {
  let controller = new PiHoleController(PIHOLE_URI);
  return controller.domainIsBlocked(constants.TwitchDomainRegex)
    .then(blocked => res.json({blocked}))
    .catch(next);
};

exports = module.exports = {YouTube, Twitch};
