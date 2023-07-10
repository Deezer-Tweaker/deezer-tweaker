const originalFs = require('original-fs');
const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const { join } = require('path');
const paths = require('./paths');
const { copySync } = require('fs-extra');

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

module.exports.injectCss = (css) => {
  module.exports.appendFile(join(paths.extractedAsar, 'build', 'assets', 'cache', 'css', 'sass_c', 'route-naboo.16f0341a6ad88bae835d.css'), css);
};

module.exports.copyNodeModule = (module) => {
  if (module.split('/').length === 2 && !existsSync(join(paths.extractedAsar, 'node_modules', module.split('/')[0])))
    mkdirSync(join(paths.extractedAsar, 'node_modules', module.split('/')[0]));
  copySync(join(__dirname, '..', 'node_modules', module), join(paths.extractedAsar, 'node_modules', module));
};

module.exports.copyModules = () => {
  const modules = ['@electron/asar', 'chromium-pickle-js', 'react', 'react-dom', 'scheduler', 'loose-envify'];
  modules.forEach(m => module.exports.copyNodeModule(m));
};
