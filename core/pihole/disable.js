'use strict';
const _ = require('lodash'),
  moment = require('moment'),
  Websockets = require('../Websockets'),
  url = require('url'),
  env = require('../../env'),
  isEnabled = require('./enabled'),
  log = require('debug-logger')('core:pihole:disable'),
  rp = require('request-promise-native');

exports = module.exports = () => {
  const queryParams = new url.URLSearchParams({disable: env.adblockDisableTime(), auth: env.piholeWebpassword()});
  const until = moment().add(env.adblockDisableTime(), 's').toDate();
  return rp.get({
      json: true,
      uri: `${env.piholeUri()}/admin/api.php?${queryParams.toString()}`,
    })
    .then(res => {
      const enabled = _.get(res, 'status', 'enabled') === 'enabled';
      Websockets.emit('adblock', {enabled, until});
      setTimeout(() => isEnabled()
        .then(adblockIsEnabled => Websockets.emit('adblock', {enabled: adblockIsEnabled, until: null}))
        .catch(log.error), env.adblockDisableTime() * 1000);
      return {enabled, until};
    });
};
