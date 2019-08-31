'use strict';

exports = module.exports = addr => ({
  chain: 'FORWARD',
  proto: 'tcp',
  src: addr,
  target: 'REJECT',
  extra: ['--reject-with', 'tcp-reset']
});
