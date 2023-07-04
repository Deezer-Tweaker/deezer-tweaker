const originalFs = require('original-fs');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const paths = require('./paths');

module.exports.replaceInAsarFile = (path, search, replace) => {
  const asar = originalFs.readFileSync(paths.asar, 'utf8');
  const file = readFileSync(join(paths.asar, path), 'utf8');
  originalFs.writeFileSync(
    paths.asar,
    asar.replace(file, file.replace(search, replace)),
    'utf8'
  );
};

module.exports.replaceInFile = (path, search, replace) => {
  const file = readFileSync(path, 'utf8');
  writeFileSync(path, file.replace(search, replace), 'utf8');
};

module.exports.appendFile = (path, string) => {
  const file = readFileSync(path, 'utf8');
  writeFileSync(path, file + string, 'utf8');
};
