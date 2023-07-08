const paths = require('../utils/paths');
const { join } = require('path');
const { readdirSync, existsSync, mkdirSync, readFileSync } = require('fs');
const Log = require('../utils/log');
const extract = require('extract-comments');
const { replaceInFile } = require('../utils/asar');

const pluginsDir = join(paths.data, 'plugins');
const themesDir = join(paths.data, 'themes');

if (!existsSync(pluginsDir)) mkdirSync(pluginsDir);
if (!existsSync(themesDir)) mkdirSync(themesDir);

let themesList = [];
const loadThemes = () => {
  Log.info('Applying themes...');
  const themes = readdirSync(themesDir);

  themes.forEach((t) => {
    const theme = readFileSync(join(themesDir, t), 'utf8');
    const [comment] = extract(theme);
    if (comment.loc.start.line !== 1) {
      Log.error(`Theme ${t} is missing metadata!`); return;
    }
    const metadata = comment.value.split('\r\n').filter(l => l !== '').map(l => l.trim().split(/@([a-zA-Z]+) /g).filter(l => l !== '')).map(v => {
      return { [v[0]]: v[1] };
    })[0];
    if (!metadata.name) {
      Log.error(`Theme ${t} is missing a name!`);return;
    }
    if (comment.code.value.trim() === '') {
      Log.warn(`Theme ${metadata.name} has no content.`);
    }
    themesList.push({
      id: metadata.name.toLowerCase().replaceAll(/\t/g, '-'),
      path: join(themesDir, t)
    });
    Log.info(`Applying theme ${metadata.name}`);
  });

  replaceInFile(
    join(paths.extractedAsar, 'build', 'renderer.js'),
    /(document\.head\.appendChild\(customCss\);)(}\)\(\);)/g,
    `$1
    const themes = ${JSON.stringify(themesList)}; 
    themes.forEach(theme => { 
      const style = document.createElement('link');
      style.setAttribute('rel', 'stylesheet'); 
      style.setAttribute('type', 'text/css'); 
      style.setAttribute('href', theme.path);
      style.setAttribute('id', theme.id + '-theme'); document.head.appendChild(style);
    });$2`
  );
};

loadPlugins();
loadThemes();
