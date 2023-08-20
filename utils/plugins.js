const { readdirSync, existsSync, writeFileSync } = require('fs');
const { join } = require('path');
const paths = require('./paths');
const fs = require('fs');
const { replaceInFile, injectCss } = require('./asar');
const { findFile } = require('./paths');

const DeezerTweaker = {
  CSS: {
    importCacheStyleSheet(file) {
      const cssCacheFolder = join(paths.asar, 'build', 'assets', 'cache', 'css', 'sass_c');
      const cssFile = readdirSync(cssCacheFolder).find(f => f.startsWith(file));
      this.injectStyleSheet(join(cssCacheFolder, cssFile), file);
    },
    injectStyleSheet(url, id) {
      const code = `
        const customCss = document.createElement('link');
        customCss.setAttribute('rel', 'stylesheet');
        customCss.setAttribute('type', 'text/css');
        customCss.setAttribute('href', '${url.replaceAll('\\', '\\\\')}');
        customCss.setAttribute('id', '${id}');
        document.head.appendChild(customCss);`;
      if (typeof window === 'undefined') {
        replaceInFile(
          findFile('renderer', { dirPath: '' }), /(__webpack_exports__)(}\)\(\);)/g, `$1;${code}$2`
        );
      } else {
        eval(code);
      }
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
          findFile('route-naboo'),
          new RegExp(`({id:"${options.appendId}",[a-zA-Z0-9,:()."_\`/\${}!]+})(,{id:"${idsList[nextId]})`),
          `$1, { id: "${id}", icon: ${icon}, label: "${label}", to: \`${to}\`, isMain: ${options.main.toString()} }$2`
        );
      },
      remove(id) {
        replaceInFile(findFile('route-naboo'), new RegExp(`/{id:"${id}",...+![0-1]}[,^]/g`), '');
      }
    },
    Routes: {
      create(path, component, fromPlugin = true) {
        const c = fromPlugin ? component?.toString()?.replace('React', 'r.a') : component?.toString();
        replaceInFile(
          findFile('app-web'),
          /(,{exact:!0,path:"\/",redirectTo:`\/\$\{e}\/`})/g,
          `$1,{ exact: true, path: '${path}', redirectTo: \`\\/\${e}${path}\` },{ exact: true, path: b('${path}'), component: ${c} }`
        );
      },
      redirect(path, to) {
        replaceInFile(
          findFile('app-web'),
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
    /**
     * Enables or disable Chrome DevTools
     */
    enableDevTools() {
      replaceInFile(findFile('main', {
        dirPath: ''
      }), 'function hasDevTools(){return"yes"===process.env.DZ_DEVTOOLS}', 'function hasDevTools(){return true}');
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
