const { readdirSync } = require('fs');
const { join } = require('path');
const paths = require('./paths');

module.exports.apply = (startup = false) => {
  readdirSync(join(paths.data, 'plugins')).forEach(f => {
    const plugin = require(join(paths.data, 'plugins', f, `${f}.js`));
    const jsCachePath = join(paths.extractedAsar, 'build', 'assets', 'cache', 'js');
    if (plugin.replacements && plugin.replacements.length !== 0) plugin.replacements.forEach(replacement => {
      if (!replacement.applyAtStartup && startup) return;
      require('../utils/asar').replaceInFile(replacement.file.replace('%jsCache%', jsCachePath), replacement.find, replacement.replace);
    });
    if (plugin.css && typeof plugin.css === 'string' && plugin.css.trim() !== '') {
      if (startup) return;
      require('../utils/asar').injectCss(plugin.css);
    }
    if (plugin.inject && typeof plugin.inject === 'function') {
      if (startup) return;
      plugin.inject({
        React: require('react'),
        Api: {
          Routes: {
            create(path, component) {
              require('../utils/asar').replaceInFile(
                join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'app-web.b8b99a13a697527a646c.js'),
                /(,{exact:!0,path:"\/",redirectTo:`\/\$\{e}\/`})/g,
                `$1,{ exact: true, path: '${path}', redirectTo: \`\\/\\\${e}${path}\` },{ exact: true, path: b('${path}'), component: ${component?.toString()} }`
              );
            },
            redirect(path, to) {
              require('../utils/asar').replaceInFile(
                join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'app-web.b8b99a13a697527a646c.js'),
                /(,{exact:!0,path:"\/",redirectTo:`\/\$\{e}\/`})/g,
                `$1,{ exact: true, path: '${path}', redirectTo: '${to}' }`
              );
            }
          }
        }
      });
    }
  });
};
