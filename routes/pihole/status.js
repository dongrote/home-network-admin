'use strict';
const {PiHoleController} = require('../../controllers'),
  constants = require('../../constants'),
  env = require('../../env');

const YouTube = (req, res, next) => {
  let controller = new PiHoleController(env.piholeUri());
  return controller.domainIsBlocked(constants.YouTubeContentDomainRegex)
    .then(blocked => res.json({blocked}))
    .catch(next);
};

const Twitch = (req, res, next) => {
  let controller = new PiHoleController(env.piholeUri());
  return controller.domainIsBlocked(constants.TwitchDomainRegex)
    .then(blocked => res.json({blocked}))
    .catch(next);
};

exports = module.exports = {YouTube, Twitch};
