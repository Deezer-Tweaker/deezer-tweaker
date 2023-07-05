const originalFs = require('original-fs');
const paths = require('../utils/paths');
const Log = require('../utils/log');
const asar = require('@electron/asar');
const { existsSync, statSync, rmSync, mkdirSync } = require('fs');
const Deezer = require('../utils/app');

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

if (existsSync(paths.extractedAsar) && statSync(paths.extractedAsar).isDirectory()) {
  Log.info('Deleting extracted ASAR folder...');
  rmSync(paths.extractedAsar, { recursive: true });
  Log.success('Done\n');
}

Log.info('Extracting ASAR...');
asar.extractAll(paths.asarBackup, paths.extractedAsar);
Log.success('Done\n');

Log.info('Injecting Deezer Tweaker...');
require('./core');
Log.success('Done\n');

Log.info('Recreating the ASAR archive...');
asar.createPackage(paths.extractedAsar, paths.asar).then(() => {
  Log.success('Done\n');

  Log.info('Relaunching Deezer\n');
  Deezer.relaunch();

  Log.info('Deleting extracted ASAR folder...');
  rmSync(paths.extractedAsar, { recursive: true });
  Log.success('Done\n');

  process.exit(0);
});
