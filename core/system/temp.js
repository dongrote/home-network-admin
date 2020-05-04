'use strict';
const fs = require('fs');

const ctof = c => (c * 1.8) + 32;

exports = module.exports = () => new Promise((resolve, reject) => {
  fs.readFile(env.thermalZoneFilePath(), (err, data) => err ? reject(err) : resolve(Number(data.toString())));
})
.catch(() => 0)
.then(temp => ({
  critical: env.thermalZoneCritical(),
  celsius: Math.floor(temp / 1000),
  fahrenheit: Math.floor(ctof(temp / 1000)),
}));
