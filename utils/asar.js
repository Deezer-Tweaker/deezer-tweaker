const originalFs = require('original-fs');
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const { join } = require('path');
const paths = require('./paths');
const { copySync } = require('fs-extra');
const { findFile } = require('./paths');

const replaceInAsarFile = (path, search, replace) => {
  const asar = originalFs.readFileSync(paths.asar, 'utf8');
  const file = readFileSync(join(paths.asar, path), 'utf8');
  originalFs.writeFileSync(
    paths.asar,
    asar.replace(file, file.replace(search, replace)),
    'utf8'
  );
};

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

module.exports = {
  replaceInAsarFile, replaceInFile, appendFile, injectCss, copyNodeModule, copyModules
};
