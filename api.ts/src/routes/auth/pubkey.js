'use strict';
const core = require('../../core');

exports = module.exports = (req, res, next) => core.auth.publicKey()
  .then(pubkey => res.json({key: {public: pubkey}}))
  .catch(next);
