const { readdirSync, existsSync, writeFileSync } = require('fs');
const { join } = require('path');
const paths = require('./paths');
const fs = require('fs');
const { replaceInFile, injectCss } = require('./asar');

const DeezerTweaker = {
  CSS: {
    injectStyleSheet(url, id) {
      replaceInFile(
        join(paths.extractedAsar, 'build', 'renderer.js'),
        /(__webpack_exports__)(}\)\(\);)/g,
        `$1;
        const customCss = document.createElement('link');
        customCss.setAttribute('rel', 'stylesheet');
        customCss.setAttribute('type', 'text/css');
        customCss.setAttribute('href', '${url.replaceAll('\\', '\\\\')}');
        customCss.setAttribute('id', '${id}');
        document.head.appendChild(customCss);$2`
      );
    }
  },
  Api: {
    Sidebar: {
      add(id, icon, label, to, options) {
        if (!options) options = {};
        if (!options.main) options.main = true;
        if (!options.appendAfter) options.appendAfter = true;
        if (!options.appendId) options.appendId = 'profile';
        const idsList = [
          'home', 'shows', 'radio', 'explore', 'bugreport', 'profile', 'loved', 'downloads', 'playlists', 'albums',
          'artists', 'podcasts', 'concerts'
        ];
        const nextId = idsList.findIndex(v => v === options.appendId) + 1;
        replaceInFile(
          join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'route-naboo.fda0f9eaad2eeb36f5b5.js'),
          new RegExp(`({id:"${options.appendId}",[a-zA-Z0-9,:()."_\`/\${}!]+})(,{id:"${idsList[nextId]})`),
          `$1, { id: "${id}", icon: ${icon}, label: "${label}", to: \`${to}\`, isMain: ${options.main.toString()} }$2`
        );
      },
      remove(id) {
        replaceInFile(
          join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'route-naboo.fda0f9eaad2eeb36f5b5.js'),
          new RegExp(`/{id:"${id}",...+![0-1]}[,^]/g`), ''
        );
      }
    },
    Routes: {
      create(path, component, fromPlugin = true) {
        const c = fromPlugin ? component?.toString()?.replace('React', 'r.a') : component?.toString();
        replaceInFile(
          join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'app-web.b8b99a13a697527a646c.js'),
          /(,{exact:!0,path:"\/",redirectTo:`\/\$\{e}\/`})/g,
          `$1,{ exact: true, path: '${path}', redirectTo: \`\\/\${e}${path}\` },{ exact: true, path: b('${path}'), component: ${c} }`
        );
      },
      redirect(path, to) {
        replaceInFile(
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
  App: {
    enableDevTools(enable = true) {
      replaceInFile(join(paths.extractedAsar, 'build', 'main.js'), 'function hasDevTools(){return"yes"===process.env.DZ_DEVTOOLS}', `function hasDevTools(){return ${enable}}`);
    }
  }
};
module.exports.DeezerTweaker = DeezerTweaker;

module.exports.apply = (startup = false) => {
  if (startup) Object.assign(window.DeezerTweaker, DeezerTweaker);
  readdirSync(join(paths.data, 'plugins')).forEach(f => {
    const plugin = require(join(paths.data, 'plugins', f, `${f}.js`));
    const jsCachePath = join(paths.extractedAsar, 'build', 'assets', 'cache', 'js');
    if (plugin.replacements && plugin.replacements.length !== 0) plugin.replacements.forEach(replacement => {
      if (!replacement.applyAtStartup && startup) return;
      replaceInFile(replacement.file.replace('%jsCache%', jsCachePath), replacement.find, replacement.replace);
    });
    if (plugin.css && typeof plugin.css === 'string' && plugin.css.trim() !== '') {
      if (startup) return;
      injectCss(plugin.css);
    }
    if (plugin.inject && typeof plugin.inject === 'function') {
      if (startup) return;
      plugin.inject(DeezerTweaker);
    }
  });
};
