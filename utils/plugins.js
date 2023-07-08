const { readdirSync, existsSync, writeFileSync } = require('fs');
const { join } = require('path');
const paths = require('./paths');
const fs = require('fs');

module.exports.apply = (startup = false) => {
  const DeezerTweaker = {
    Api: {
      Routes: {
        create(path, component) {
          require('../utils/asar').replaceInFile(
            join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'app-web.b8b99a13a697527a646c.js'),
            /(,{exact:!0,path:"\/",redirectTo:`\/\$\{e}\/`})/g,
            `$1,{ exact: true, path: '${path}', redirectTo: \`\\/\${e}${path}\` },{ exact: true, path: b('${path}'), component: ${component?.toString()?.replace('React', 'r.a')} }`
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
    },
    Plugins: (() => {
      let plugins = [];
      fs.readdirSync(join(paths.data, 'plugins')).map(f => require(join(paths.data, 'plugins', f, `${f}.js`))).forEach(plugin => {
        Object.assign(plugin, {
          Settings: {
            file: join(paths.data, 'settings', `${plugin.name}.json`),
            set(key, value) {
              if (!existsSync(this.file)) writeFileSync(this.file, '{}');
              const settings = require(this.file);
              settings[key] = value;
              writeFileSync(this.file, JSON.stringify(settings));
            },
            get(key) {
              if (!existsSync(this.file)) return;
              return key ? require(this.file)[key] : require(this.file);
            }
          }
        });
        plugins[plugin.name] = plugin;
      });
      return plugins;
    })(),
  };
  if (startup) Object.assign(window.DeezerTweaker, DeezerTweaker);
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
      plugin.inject(DeezerTweaker);
    }
  });
};
