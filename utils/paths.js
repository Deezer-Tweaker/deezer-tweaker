const { join } = require('path');

module.exports = {
  asar: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app.asar'),
  asarBackup: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app.asar.bkp'),
  extractedAsar: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app-extracted'),
  program: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop'),
  data: join(process.env.LOCALAPPDATA, 'deezer-tweaker')
};
