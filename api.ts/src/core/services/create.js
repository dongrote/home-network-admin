'use strict';
const available = require('./available'),
  persist = require('./persist'),
  emitState = require('./emitState');

exports = module.exports = service => {
  const storedService = {
    name: service.name,
    canonicalName: service.name,
    icon: service.icon,
    color: service.color,
    domains: [{
      domain: service.domain,
      wildcard: service.domain,
      regex: `(^|\\.)${service.domain.replace(/\./g, '\\.')}$`,
    }],
  };
  return available()
    .then(services => {
      services.push(storedService);
      return persist(services);
    })
    .then(() => emitState())
    .then(() => storedService);
};
