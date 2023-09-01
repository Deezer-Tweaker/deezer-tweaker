/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

const { join } = require('path');
const fs = require('fs');

const paths = {
  win32: {
    asar: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app.asar'),
    asarBackup: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app.asar.bkp'),
    extractedAsar: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app-extracted'),
    program: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop'),
    data: join(process.env.LOCALAPPDATA, 'deezer-tweaker'),
    corePlugins: join(process.env.LOCALAPPDATA, 'Programs', 'deezer-desktop', 'resources', 'app.asar', 'dtjs', 'core-plugins')
  },
  darwin: {
    asar: join('/Applications', 'Deezer.app', 'Contents', 'Resources', 'app.asar'),
    asarBackup: join('/Applications', 'Deezer.app', 'Contents', 'Resources', 'app.asar.bkp'),
    extractedAsar: join('/Applications', 'Deezer.app', 'Contents', 'Resources', 'app-extracted'),
    program: join('/Applications', 'Deezer.app'),
    data: join(require('os').homedir(), 'Library', 'Application Support', 'deezer-tweaker'),
    corePlugins: join('/Applications', 'Deezer.app', 'Contents', 'Resources', 'app-extracted', 'dtjs', 'core-plugins')
  }
};

/**
 * Finds a build file in the specified directory
 * @param {string} file
 * @param {{
 *   dirPath: string
 * }} [options]
 */
const findFile = (file, options = {}) => {
  if (file.split('.').length > 1) file = file.split('.')[0];
  file = file + '.';
  if (!options) options = {};
  if (typeof options.dirPath === 'undefined') options.dirPath = join('assets', 'cache', 'js');
  const files = fs.readdirSync(join(paths[process.platform].extractedAsar, 'build', options.dirPath));
  return files.find(f => f.startsWith(file)) &&
    join(paths[process.platform].extractedAsar, 'build', options.dirPath, files.find(f => f.startsWith(file)));
};

module.exports = {
  ...paths[process.platform],
  findFile
};
