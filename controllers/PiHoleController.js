'use strict';
const _ = require('lodash'),
  request = require('request-promise'),
  cookie = require('tough-cookie'),
  cheerio = require('cheerio'),
  constants = require('../constants');

class PiHoleController {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.token = null;
    this.phpSessionIdCookie = null;
    this.cookieJar = null;
  }

  async fetchSessionCredentials() {
    const fullResponse = await request
      .get({
        uri: `${this.baseUrl}${constants.PiHoleBlacklistView}`,
        resolveWithFullResponse: true,
      });
    const cookies = _.get(fullResponse, 'headers.set-cookie', []).map(cookie.parse),
      $ = cheerio.load(fullResponse.body);
    this.phpSessionIdCookie = _.first(cookies);
    this.cookieJar = request.jar();
    this.cookieJar.setCookie(this.phpSessionIdCookie.toString(), this.baseUrl);
    this.token = $('#token').first().text();
    return this;
  }

  async getPhpSessionIdCookie() {
    if (this.phpSessionIdCookie) {
      return Promise.resolve(this.phpSessionIdCookie);
    }
    await this.fetchSessionCredentials();
    return this.phpSessionIdCookie;
  }

  async getToken() {
    if (this.token) {
      return Promise.resolve(this.token);
    }
    await this.fetchSessionCredentials();
    return this.token;
  }

  async blacklist() {
    const blacklist = _.flattenDeep(await request.get({uri: `${this.baseUrl}${constants.PiHoleGetBlacklist}`, json: true}));
    return blacklist;
  }

  async domainIsBlocked(domain) {
    const blacklist = await this.blacklist();
    return _.includes(blacklist, domain);
  }

  async domainsAreBlocked(domains) {
    const blacklist = await this.blacklist();
    return domains.every(domain => _.includes(blacklist, domain));
  }

  async addWildcardMatch(domain) {
    const token = await this.getToken();
    const uri = `${this.baseUrl}${constants.PiHoleAddBlacklist}`,
      formData = {domain, token, list: 'wild'};
    const response = await request.post({uri, formData, jar: this.cookieJar, resolveWithFullResponse: true});
    if (response.statusCode !== 200) {
      throw _.set(new Error('HttpError'), 'statusCode', response.statusCode);
    }
    return response.statusCode;
  }

  async removeRegexMatch(domain) {
    const token = await this.getToken();
    const uri = `${this.baseUrl}${constants.PiHoleSubBlacklist}`,
      formData = {domain, token, list: 'regex'};
    const response = await request.post({uri, formData, jar: this.cookieJar, resolveWithFullResponse: true});
    if (response.statusCode !== 200) {
      throw _.set(new Error('HttpError'), 'statusCode', response.statusCode);
    }
    return response.statusCode;
  }

  async blockYouTube() {
    const {YouTubeContentDomain, YouTubeContentDomainRegex} = constants;
    if (await this.domainIsBlocked(YouTubeContentDomainRegex)) {
      return this;
    }
    const status = await this.addWildcardMatch(YouTubeContentDomain);
    return status;
  }

  async unblockYouTube() {
    const {YouTubeContentDomainRegex} = constants;
    const status = await this.removeRegexMatch(YouTubeContentDomainRegex);
    return status;
  }

  async blockTwitch() {
    const {TwitchDomain, TwitchDomainRegex} = constants;
    if (await this.domainIsBlocked(TwitchDomainRegex)) {
      return this;
    }
    const status = await this.addWildcardMatch(TwitchDomain);
    return status;
  }

  async unblockTwitch() {
    const {TwitchDomainRegex} = constants;
    const status = await this.removeRegexMatch(TwitchDomainRegex);
    return status;
  }
}

exports = module.exports = PiHoleController;
