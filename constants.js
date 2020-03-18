'use strict';

exports = module.exports = {
  PiHoleBlacklistView: '/admin/list.php?l=black',
  PiHoleGetBlacklist: '/admin/scripts/pi-hole/php/get.php?list=black', 
  PiHoleAddBlacklist: '/admin/scripts/pi-hole/php/add.php',
  PiHoleSubBlacklist: '/admin/scripts/pi-hole/php/sub.php',
  PiHoleTokenOpenTag: '<div id="token" hidden>',
  YouTubeContentDomain: 'googlevideo.com',
  YouTubeContentDomainRegex: '(^|\\.)googlevideo\\.com$',
  TwitchDomain: 'twitch.tv',
  TwitchDomainRegex: '(^|\\.)twitch\\.tv$',
  jwtIssuer: 'siri-shortcut-server',
};
