'use strict';
const rp = require('request-promise-native');

exports = module.exports = webpassword => rp.cookie(`persistentlogin=${webpassword}`);
