const { replaceInFile, appendFile } = require('../utils/asar');
const { join, resolve } = require('path');
const paths = require('../utils/paths');
const { readFileSync } = require('fs');
const fs = require('fs');

replaceInFile(join(paths.extractedAsar, 'build', 'main.js'), 'function hasDevTools(){return"yes"===process.env.DZ_DEVTOOLS}', 'function hasDevTools(){return true}');
const cssPath = join(paths.data, 'custom.css');
replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'route-naboo.fda0f9eaad2eeb36f5b5.js'),
  /(\{id:"account",label:Object\(q\.a\)\("Paramètres du compte"\),to:"\/account",isMain:!0,isAnimated:!0})/g,
  `$1,{
    id: "deezer_tweaker",
    label: Object(q.a)("Deezer Tweaker"),
    to: \`/\${t}/deezer-tweaker\`,
    isMain: true,
    isAnimated: true
  }`
);
replaceInFile(
  join(paths.extractedAsar, 'build', 'renderer.js'),
  /(__webpack_exports__)(}\)\(\);)/g,
  `$1;const customCss = document.createElement('link');
  customCss.setAttribute('rel', 'stylesheet');
  customCss.setAttribute('type', 'text/css');
  customCss.setAttribute('href', '${cssPath.replaceAll('\\', '\\\\')}');
  customCss.setAttribute('id', 'deezer-tweaker-custom-css');
  document.head.appendChild(customCss);$2`
);
replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'legacy.2bd71c3dfe2c9c3f1a78.js'),
  /(\/\*! For license information please see)/g,
  `window.DeezerTweaker = {};
  window.DeezerTweaker.paths = ${JSON.stringify(paths)};
  window.DeezerTweaker.installedPlugins = ${JSON.stringify(fs.readdirSync(join(paths.data, 'plugins')).map(f => {
    return require(join(paths.data, 'plugins', f, 'manifest.json'));
  }))};
  const { join } = require('path');
  const { readFileSync, writeFileSync, readdirSync } = require('fs');
  const originalFs = require('original-fs');
  const { paths } = window.DeezerTweaker;
  const pluginObject = {
    asar: {
      replaceInAsarFile: ${require('../utils/asar').replaceInAsarFile.toString().replace('module.exports', 'pluginObject.asar')},
      replaceInFile: ${require('../utils/asar').replaceInFile.toString().replace('module.exports', 'pluginObject.asar')},
      appendFile: ${require('../utils/asar').appendFile.toString().replace('module.exports', 'pluginObject.asar')},
      injectCss: ${require('../utils/asar').injectCss.toString().replace('module.exports', 'pluginObject.asar')},
    }, paths: window.DeezerTweaker.paths
  };
  window.DeezerTweaker.pluginObject = pluginObject;
  readdirSync(join(paths.data, 'plugins')).forEach(f => {
    require(join(paths.data, 'plugins', f, \`\${f}.js\`).replaceAll('\\\\', '\\\\\\\\')).start(Object.assign(pluginObject, {
      startingFrom: 'app_start'
    }));
  });
  \n$1`
);
replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'route-naboo.fda0f9eaad2eeb36f5b5.js'),
  /(\{id:"profile",icon:Jn,label:Object\(q\.a\)\("menu_title_favorites_web"\),to:`\/\$\{r}\/profile\/\$\{e}`,isMain:!0})/g,
  '$1, { id: "deezer-tweaker-marketplace", icon: null, label: "Marketplace", to: `/${r}/deezer-tweaker/marketplace`, isMain: true }'
);
replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'app-web.b8b99a13a697527a646c.js'),
  /(,{exact:!0,path:"\/",redirectTo:`\/\$\{e}\/`})/g,
  `$1,{ exact: true, path: b('/deezer-tweaker'), component: ${require(resolve(__dirname, 'core-plugins', 'options-page', 'index.js')).toString().replaceAll(/require\('(..?\/[a-zA-Z]+)'\)/g, (str, $1) => readFileSync(resolve(__dirname, 'core-plugins', 'options-page', $1 + '.js')).toString())} }`
);
replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'app-web.b8b99a13a697527a646c.js'),
  /(window.webpackJsonpDeezer=window\.webpackJsonpDeezer\|\|\[]\)\.push\(\[\[66,54],\{"\+jGe":function\(x,e,C\)\{"use strict";)/g,
  '$1window.DeezerTweaker.importWebpackModule=C;'
);
replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'app-web.b8b99a13a697527a646c.js'),
  /(,{exact:!0,path:"\/",redirectTo:`\/\$\{e}\/`})/g,
  `$1,{ exact: true, path: b('/deezer-tweaker/marketplace'), component: ${require(resolve(__dirname, 'core-plugins', 'marketplace', 'index.js')).toString().replaceAll(/require\('(.+\/+[a-zA-Z]+)'\)/g, (str, $1) => readFileSync(resolve(__dirname, 'core-plugins', 'marketplace', $1 + '.js')).toString())} }`
);
replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'player-HTML5Renderer.60c297eb497cca6ab0eb.js'),
  /(audioPlayer_setVolume:function\(e\)\{this\.volume=(Number\(e\)))/g,
  '$1;console.log($2)'
);
replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'route-naboo.fda0f9eaad2eeb36f5b5.js'),
  /(audioPlayer_setVolume:function\(e\)\{this\.volume=Number\(e\))/g,
  '$1;console.log(Number(e))'
);
replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'route-playlist.765db7601fb9f9205f36.js'),
  /(return n\.a\.createElement\("div",\{className:t,"aria-label":(Object\(d\.a\)\("datagrid_text_bypopularity_web",\{sprintf:\[e\+" \/ 10"]}\)))/g,
  '$1,title:$2'
);
replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'route-artist.da60dee88fbc6e814b76.js'),
  /(},zt\|\|\(zt=r\.a\.createElement\(ia\.a,\{size:"16"}\)\)\)\):null})(_renderTwitter\(\)\{)/g,
  `$1_renderYouTube() {
    return r.a.createElement(
      "li", { className: ca.a.socialItem }, 
      r.a.createElement(na.a, { text: "YouTube search results" },
      r.a.createElement("a", { href: "https://www.youtube.com/results?search_query=" + this.props.name, target: "_blank", rel: "noreferrer" },
      r.a.createElement(
        "svg", { className: "svg-icon svg-icon-youtube", focusable: false, width: 16, height: 16, role: "img", viewBox: "0 0 576 512", "aria-hidden": true },
        r.a.createElement("path", { d: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" })
      )))
    )
  }$2`
);
replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'route-artist.da60dee88fbc6e814b76.js'),
  /(,this\._renderTwitter\(\))/g,
  '$1,this._renderYouTube()'
);
appendFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'css', 'sass_c', 'route-artist.b2d1ac5a32050369ffd7.css'),
  '.svg-icon:hover.svg-icon-youtube { color: #ff0000; }'
);
appendFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'css', 'sass_c', 'app-web.46d8ea355719e40aba9d.css'),
  `.css-qfh00b {
    display: inline-flex;
    appearance: none;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    user-select: none;
    position: relative;
    white-space: nowrap;
    vertical-align: middle;
    outline: transparent solid 2px;
    outline-offset: 2px;
    line-height: 1;
    border-radius: var(--tempo-radii-full);
    font-weight: var(--tempo-fontWeights-bold);
    transition-property: var(--tempo-transition-property-common);
    transition-duration: var(--tempo-transition-duration-normal);
    text-transform: uppercase;
    height: var(--tempo-sizes-10);
    min-width: var(--tempo-sizes-10);
    font-size: var(--tempo-fontSizes-sm);
    padding-inline-start: var(--tempo-space-8);
    padding-inline-end: var(--tempo-space-8);
    padding-top: var(--tempo-space-4);
    padding-bottom: var(--tempo-space-4);
    background: var(--tempo-colors-accent-main);
    color: white;
  }`
);
