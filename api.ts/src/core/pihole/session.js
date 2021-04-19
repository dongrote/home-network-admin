'use strict';
const rp = require('request-promise-native'),
  loginCookie = require('./loginCookie'),
  sessionCookie = require('./sessionCookie');

exports = module.exports = (uri, webpassword) => sessionCookie(uri)
  .then(session => {
    const jar = rp.jar(),
      login = webpassword ? loginCookie(webpassword) : null;
    jar.setCookie(session, uri);
    if (login) {
      jar.setCookie(login, uri);
    }
    return {
      uri,
      cookieJar: jar,
      cookies: {login, session},
    };
  });
