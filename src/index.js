/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

const originalFs = require('original-fs');
const paths = require('../utils/paths');
const Log = require('../utils/log');
const asar = require('@electron/asar');
const { existsSync, statSync, rmSync, mkdirSync, writeFileSync } = require('fs');
const Deezer = require('../utils/app');
const { join } = require('path');
const { copyModules } = require('../utils/asar');
const { copySync } = require('fs-extra');
const { dialog } = require('electron');
const { execSync } = require('child_process');

if (!existsSync(paths.program)) {
  Log.error('Deezer is not installed!');
  Log.error('Please install the app to continue.');

  process.exit(1);
}

if (!originalFs.existsSync(paths.asar)) {
  Log.error('ASAR file doesn\'t exist!');
  Log.error('Please try reinstalling Deezer.');

  process.exit(1);
}

if (!existsSync(paths.asarBackup)) {
  Log.info('Backing up original ASAR file...');
  originalFs.copyFileSync(paths.asar, paths.asarBackup);
  Log.success('Done\n');
}

if (!existsSync(paths.data)) {
  Log.info('Creating data folder');
  mkdirSync(paths.data);
  writeFileSync(join(paths.data, 'custom.css'), '');
  Log.success('Done\n');
}

const pluginsDir = join(paths.data, 'plugins');
const themesDir = join(paths.data, 'themes');
const settingsDir = join(paths.data, 'settings');

if (!existsSync(pluginsDir)) mkdirSync(pluginsDir);
if (!existsSync(themesDir)) mkdirSync(themesDir);
if (!existsSync(settingsDir)) mkdirSync(settingsDir);

if (existsSync(paths.extractedAsar) && statSync(paths.extractedAsar).isDirectory()) {
  Log.info('Deleting extracted ASAR folder...');
  rmSync(paths.extractedAsar, { recursive: true });
  Log.success('Done\n');
}

if (process.argv0.includes('electron')) {
  Log.info('Compiling JSX...');
  Log.success(execSync('babel src/plugins/ --out-dir src/plugins').toString());
}

Log.info('Extracting ASAR...');
asar.extractAll(paths.asarBackup, paths.extractedAsar);
Log.success('Done\n');

Log.info('Injecting Deezer Tweaker...');
copyModules();
copySync(join(__dirname, '..', 'utils'), join(paths.extractedAsar, 'utils'));
copySync(join(__dirname, 'core.js'), join(paths.extractedAsar, 'utils', 'core.js'));
copySync(__dirname, join(paths.extractedAsar, 'dtjs'));
require('./core');
Log.success('Done\n');

Log.info('Applying plugins...');
require('../utils/plugins').apply();
Log.success('Applied plugins\n');

Log.info('Recreating the ASAR archive...');
asar.createPackage(paths.extractedAsar, paths.asar).then(() => {
  Log.success('Done\n');

  Log.info('Deleting extracted ASAR folder...');
  rmSync(paths.extractedAsar, { recursive: true });
  Log.success('Done\n');

  Log.info('Relaunching Deezer\n');
  Deezer.relaunch();

  if (!process.argv0.includes('electron')) {
    dialog.showMessageBox({
      title: 'Done',
      type: 'info',
      message: 'Deezer Tweaker was successfully injected into Deezer.'
    }).then(() => process.exit(0));
  } else {
    process.exit(0);
  }
});
