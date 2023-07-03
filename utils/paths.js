const { join } = require('path');

module.exports.paths = {
  asar: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app.asar'),
  asarBackup: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app.asar.bkp'),
  extractedAsar: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app-extracted'),
  program: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop')
};
