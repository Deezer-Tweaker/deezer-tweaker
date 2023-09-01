/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

const { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } = require('fs');
const { join } = require('path');
const paths = require('./paths');
const { copySync } = require('fs-extra');
const { findFile } = require('./paths');
const asar = require('@electron/asar');
const RestartDialog = require(`../${typeof window !== 'undefined' ? 'dtjs' : 'src'}/plugins/RestartDialog`);

const replaceInFile = (path, search, replace) => {
  const file = readFileSync(path, 'utf8');
  writeFileSync(path, file.replace(search, replace), 'utf8');
};

const appendFile = (path, string) => {
  const file = readFileSync(path, 'utf8');
  writeFileSync(path, file + string, 'utf8');
};

const injectCss = (css) => {
  appendFile(findFile('route-naboo', { dirPath: join('assets', 'cache', 'css', 'sass_c') }), css);
};

const copyNodeModule = (module) => {
  if (module.split('/').length === 2 && !existsSync(join(paths.extractedAsar, 'node_modules', module.split('/')[0])))
    mkdirSync(join(paths.extractedAsar, 'node_modules', module.split('/')[0]));
  copySync(join(__dirname, '..', 'node_modules', module), join(paths.extractedAsar, 'node_modules', module));
};

const copyModules = () => {
  const modules = ['@electron/asar', 'chromium-pickle-js', 'react', 'react-dom', 'scheduler', 'loose-envify'];
  modules.forEach(m => copyNodeModule(m));
};

const recompile = () => {
  asar.extractAll(paths.asarBackup, paths.extractedAsar);
  copyModules();
  copySync(join(__dirname, '..', 'utils'), join(paths.extractedAsar, 'utils'));
  copySync(join(__dirname, '..', 'dtjs'), join(paths.extractedAsar, 'dtjs'));
  require('../utils/core');
  require('../utils/plugins').apply();
  asar.createPackage(paths.extractedAsar, paths.asar).then(() => {
    RestartDialog();
    rmSync(paths.extractedAsar, { recursive: true });
  });
};

module.exports = {
  replaceInFile, appendFile, injectCss, copyNodeModule, copyModules, recompile
};
