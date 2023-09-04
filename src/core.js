/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

const { replaceInFile, appendFile } = require('../utils/asar');
const { join } = require('path');
const paths = require('../utils/paths');
const { readFileSync, existsSync, readdirSync } = require('fs');
const { DeezerTweaker } = require('../utils/plugins');
const { findFile } = require('../utils/paths');

DeezerTweaker.App.enableDevTools();

DeezerTweaker.Api.ProfileMenu.addOption({
  id: 'deezer_tweaker',
  label: 'Deezer Tweaker',
  to: '/deezer-tweaker',
  main: true,
  animated: true
});
const cssPath = join(paths.data, 'custom.css');
DeezerTweaker.CSS.injectStyleSheet(cssPath, 'deezer-tweaker-custom-css');

replaceInFile(
  findFile('legacy'),
  /(\/\*! For license information please see)/g,
  `const { join } = require('path'), fs = require('fs'); const { findFile } = require('../utils/paths');
  window.DeezerTweaker = {
    version: "${require('../package.json').version}", paths: ${JSON.stringify(paths)}, Deezer: {}
  };
  const pluginsToIgnore = ['components', 'Options', 'Marketplace', 'RestartDialog'];
  fs.readdirSync(window.DeezerTweaker.paths.corePlugins)
    .filter(plugin => !pluginsToIgnore.includes(plugin.split('.')[0]))
    .forEach(plugin => {
      const path = plugin.endsWith('.js') ?
        join(window.DeezerTweaker.paths.corePlugins, plugin) :
        join(window.DeezerTweaker.paths.corePlugins, plugin, 'index.js');
      console.info(\`[Deezer Tweaker] Loaded core plugin \${plugin.replace(/.(js|jsx)/g, '')}\`);
      require(path);
    });
  document.addEventListener('DOMContentLoaded', () => {
    require('../utils/plugins').apply(true);
    // Preload script for Tabs component
    DeezerTweaker.loadScript(findFile('route-profile'));
  });\n$1`
);
DeezerTweaker.Api.Sidebar.add('deezer-tweaker-marketplace', null, 'Marketplace', '/${n}/deezer-tweaker/marketplace');

const requireRegex = /require\(paths.([a-zA-Z]+) \+ '(.?.?[/[a-zA-Z-]+)'\)/g;
const corePluginsPath = join(__dirname, typeof window !== 'undefined' ? join('..', 'dtjs') : '.', 'plugins', '_core');
const importPlugin = (name) => require(
  readdirSync(join('src', 'plugins', '_core')).find(f => f.startsWith(name)) ?
    join(!existsSync(corePluginsPath) ? paths.corePlugins : corePluginsPath, name) :
    join(!existsSync(corePluginsPath) ? paths.corePlugins : corePluginsPath, name, 'index.js')
).toString().replaceAll(requireRegex, (str, $1, $2) => {
  return readFileSync(join(existsSync(paths[$1]) ? paths[$1] : corePluginsPath, $2.replace('/', '') + '.js'), 'utf8');
});
DeezerTweaker.Api.Routes.create('/deezer-tweaker', importPlugin('Options'), false);
DeezerTweaker.Api.Routes.create('/deezer-tweaker/marketplace', importPlugin('Marketplace'), false);

replaceInFile(
  findFile('legacy'),
  /(window\.webpackJsonpDeezer\|\|\[]\)\.push\(\[\[[0-9,]+],\{"\+924":function\([a-zA-Z],[a-zA-Z],([a-zA-Z])\)\{"use strict";)/g,
  '$1window.DeezerTweaker.importWebpackModule=$2;'
);

replaceInFile(
  findFile('route-naboo'),
  /(this.socket=new [a-zA-Z]\(this._conn.service,"xmpp"\),)/g,
  '$1window.DeezerTweaker.Deezer.WebSocket=this.socket,'
);

replaceInFile(
  findFile('route-artist'),
  /(},[a-zA-Z]{1,2}\|\|\([a-zA-Z]{1,2}=r.a.createElement\("span",null,r\.a\.createElement\([a-zA-Z.]{1,4},\{boxSize:"16px"}\)\)\)\)\):null})(_renderTwitter\(\)\{)/g,
  `$1_renderYouTube() {
    return r.a.createElement(
      "li", { className: ha.a.socialItem }, 
      r.a.createElement(ta.a, { text: "YouTube search results" },
      r.a.createElement("a", { href: "https://www.youtube.com/results?search_query=" + this.props.name, target: "_blank", rel: "noreferrer" },
      r.a.createElement(
        "svg", { className: "svg-icon svg-icon-youtube", focusable: false, width: 16, height: 16, role: "img", viewBox: "0 0 576 512", "aria-hidden": true },
        r.a.createElement("path", { d: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" })
      )))
    )
  }$2`
);
replaceInFile(findFile('route-artist'), /(,this\._renderTwitter\(\))/g, '$1,this._renderYouTube()');

appendFile(
  findFile('app-web', { dirPath: join('assets', 'cache', 'css', 'sass_c') }),
  '.css-editor { font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace; font-size: 16px; }'
);
