const { execSync } = require('child_process');
const { paths } = require('./paths');
const { join } = require('path');

const process = 'Deezer.exe';
module.exports = { process };

module.exports.kill = () => {
  execSync(`taskkill /f /im ${process}`);
};

module.exports.relaunch = () => {
  module.exports.kill();
  execSync(join(paths.program, process));
};
