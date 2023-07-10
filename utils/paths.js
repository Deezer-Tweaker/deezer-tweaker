const { join } = require('path');

if (process.platform === 'win32') {
  module.exports = {
    asar: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app.asar'),
    asarBackup: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app.asar.bkp'),
    extractedAsar: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app-extracted'),
    program: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop'),
    data: join(process.env.LOCALAPPDATA, 'deezer-tweaker'),
    corePlugins: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app.asar', 'dtjs', 'core-plugins')
  };
} else if (process.platform === 'darwin') {
  module.exports = {
    asar: join('/Applications', 'Deezer.app', 'Contents', 'Resources', 'app.asar'),
    asarBackup: join('/Applications', 'Deezer.app', 'Contents', 'Resources', 'app.asar.bkp'),
    extractedAsar: join('/Applications', 'Deezer.app', 'Contents', 'Resources', 'app-extracted'),
    program: join('/Applications', 'Deezer.app'),
    data: join(require('os').homedir(), 'Library', 'Application Support', 'deezer-tweaker'),
    corePlugins: join('/Applications', 'Deezer.app', 'Contents', 'Resources', 'app-extracted', 'dtjs', 'core-plugins')
  };
}
