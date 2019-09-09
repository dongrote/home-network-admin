'use strict';

exports = module.exports = addr => ({
  chain: 'FORWARD',
  proto: 'all',
  src: addr,
  target: 'REJECT',
  // extra: ['--reject-with', 'tcp-reset']
});
