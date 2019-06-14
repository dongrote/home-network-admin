'use strict';
const {PiHoleController} = require('../../controllers'),
  {PIHOLE_URI} = process.env;

const YouTube = (req, res, next) => {
  let controller = new PiHoleController(PIHOLE_URI);
  return controller.blockYouTube()
    .then(status => res.sendStatus(status))
    .catch(next);
};

const Twitch = (req, res, next) => {
  let controller = new PiHoleController(PIHOLE_URI);
  return controller.blockTwitch()
    .then(status => res.sendStatus(status))
    .catch(next);
};

exports = module.exports = {YouTube, Twitch};
