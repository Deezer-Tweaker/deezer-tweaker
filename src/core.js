const { replaceInFile, appendFile } = require('../utils/asar');
const { join } = require('path');
const paths = require('../utils/paths');

replaceInFile(join(paths.extractedAsar, 'build', 'main.js'), 'function hasDevTools(){return"yes"===process.env.DZ_DEVTOOLS}', 'function hasDevTools(){return true}');
const cssPath = join(paths.data, 'custom.css');
replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'route-naboo.fda0f9eaad2eeb36f5b5.js'),
  /(\{id:"account",label:Object\(q\.a\)\("Paramètres du compte"\),to:"\/account",isMain:!0,isAnimated:!0})/g,
  `$1,{
    id: "custom_css",
    label: Object(q.a)("Custom CSS"),
    onClick: () => {
      return electron.openExternalLink('vscode://file/${cssPath.replaceAll('\\', '/')}');
    },
    isMain: !0
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
// TODO
/*replaceInFile(
  join(paths.extractedAsar, 'build', 'assets', 'cache', 'js', 'route-naboo.fda0f9eaad2eeb36f5b5.js'),
  /(\{id:"profile",icon:Jn,label:Object\(q\.a\)\("menu_title_favorites_web"\),to:`\/\$\{r}\/profile\/\$\{e}`,isMain:!0})/g,
  '$1, { id: "deezertweaker", icon: Jn, label: "Deezer Tweaker", to: "" ,isMain: true }'
);*/
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
