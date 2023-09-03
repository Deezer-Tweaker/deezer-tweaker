/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

const { readdirSync, existsSync, writeFileSync } = require('fs');
const { join } = require('path');
const paths = require('./paths');
const fs = require('fs');
const { replaceInFile, injectCss } = require('./asar');
const { findFile } = require('./paths');
const Log = require('../utils/log');

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
          /(,{exact:!0,path:"\/",redirectTo:`\/\$\{([a-z])}\/`})/g,
          `$1,{ exact: true, path: '${path}', redirectTo: \`/\${$2}${path}\` },{ exact: true, path: C('${path}'), component: ${c} }`
        );
      },
      redirect(path, to) {
        replaceInFile(
          findFile('app-web'),
          /(,{exact:!0,path:"\/",redirectTo:`\/\$\{([a-z])}\/`})/g,
          `$1,{ exact: true, path: '${path}', redirectTo: '${to}' }`
        );
      }
    },
    ProfileMenu: {
      /**
       *
       * @param {{
       *   id: string,
       *   label: string,
       *   to: string,
       *   main: boolean,
       *   animated?: boolean
       * }} options
       */
      addOption(options = {}) {
        if (!options) options = {};
        if (!options.id || !options.label || !options.to) return;
        replaceInFile(
          findFile('route-naboo'),
          /(\{id:"account",label:Object\(([a-zA-Z]\.[a-zA-Z])\)\("Paramètres du compte"\),to:"\/account",isMain:!0,isAnimated:!0})/g,
          `$1,{
            id: "${options.id}",
            label: Object($2)("${options.label}"),
            to: "${options.to}",
            isMain: ${!!options.main},
            isAnimated: ${!!options.animated}
          }`
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
  },
  loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    document.head.append(script);
  }
};
module.exports.DeezerTweaker = DeezerTweaker;

module.exports.apply = (startup = false) => {
  if (startup) Object.assign(window.DeezerTweaker, DeezerTweaker);
  readdirSync(join(paths.data, 'plugins')).forEach(f => {
    const plugin = require(join(paths.data, 'plugins', f, `${f}.js`));
    (startup ? console : Log).info(
      `${startup ? '[Deezer Tweaker] ' : ''}Loaded plugin ${f.replace(/.(js|jsx)/g, '')}`
    );
    if (plugin.replacements && plugin.replacements.length !== 0) plugin.replacements.forEach(replacement => {
      if (!replacement.applyAtStartup && startup) return;
      replaceInFile(findFile(replacement.file.replace('%jsCache%/', '')), replacement.find, replacement.replace);
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
  const pluginsList = startup ?
    require(join(paths.corePlugins, '..', '_list.json')) :
    require(join(__dirname, '..', 'src', 'plugins', '_list.json'));
  pluginsList
    .filter(plugin => !plugin.main.startsWith('_') && !plugin.runOnDocument)
    .forEach(plugin => {
      startup ?
        require(join(paths.corePlugins, '..', plugin.main)) :
        require(join(__dirname, '..', 'src', 'plugins', plugin.main));
      (startup ? console : Log).info(
        `${startup ? '[Deezer Tweaker] ' : ''}Loaded plugin ${plugin.name}`
      );
    });
};
