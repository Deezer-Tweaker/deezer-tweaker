const { join } = require('path');

module.exports.paths = {
  asar: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app.asar'),
  extractedAsar: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app-extracted'),
  program: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop')
};
