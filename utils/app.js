const { execSync, spawn } = require('child_process');
const { paths } = require('./paths');
const { join } = require('path');

const process = 'Deezer.exe';
module.exports = { process };

module.exports.kill = () => {
  if (execSync('tasklist').includes(process)) execSync(`taskkill /f /im ${process}`);
};

module.exports.relaunch = () => {
  module.exports.kill();
  spawn(join(paths.program, process), [], {
    detached: true
  });
};
