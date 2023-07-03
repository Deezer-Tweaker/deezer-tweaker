const originalFs = require('original-fs');
const { paths } = require('../utils/paths');
const Log = require('../utils/log');
const asar = require('@electron/asar');
const { existsSync } = require('fs');

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

asar.extractAll(paths.asar, paths.extractedAsar);

