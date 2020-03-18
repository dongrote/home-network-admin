'use strict';
const {PiHoleController} = require('../../controllers'),
  env = require('../../env');

const YouTube = (req, res, next) => {
  let controller = new PiHoleController(env.piholeUri());
  return controller.blockYouTube()
    .then(status => res.sendStatus(status))
    .catch(next);
};

const Twitch = (req, res, next) => {
  let controller = new PiHoleController(env.piholeUri());
  return controller.blockTwitch()
    .then(status => res.sendStatus(status))
    .catch(next);
};

exports = module.exports = {YouTube, Twitch};
