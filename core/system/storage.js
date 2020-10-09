'use strict';
const _ = require('lodash'),
  os = require('os'),
  cp = require('child_process');

exports = module.exports = mountPoints => new Promise((resolve, reject) => {
  const mountPointArray = Array.isArray(mountPoints) ? mountPoints : [mountPoints],
    stats = [];
  let stdoutBuffer = Buffer.from('');
  const child = cp.spawn('df', ['--output=target,size,used,avail'], {stdio: ['ignore', 'pipe', 'ignore']});
  child.stdout
    .on('data', chunk => {
      stdoutBuffer = Buffer.concat([stdoutBuffer, chunk]);
    })
    .on('end', () => {
      const stripper = /  +/g,
        lines = stdoutBuffer.toString().split(os.EOL);
      let line;
      for (line of lines) {
        const stripped = line.replace(stripper, ' ');
        const [mount, size, used, available] = stripped.split(' ');
        if (_.includes(mountPointArray, mount)) {
          stats.push({
            mount,
            size: Number(size),
            used: Number(used),
            available: Number(available)
          });
        }
      }
      resolve(stats);
    });
});