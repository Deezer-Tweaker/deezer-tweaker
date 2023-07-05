const paths = require('../utils/paths');
const { join } = require('path');
const { readdirSync, existsSync, mkdirSync } = require('fs');
const Log = require('../utils/log');

const pluginsDir = join(paths.data, 'plugins');

if (!existsSync(pluginsDir)) mkdirSync(pluginsDir);

const plugins = readdirSync(pluginsDir);

plugins.forEach((p) => {
  const plugin = require(join(pluginsDir, p));
  if (!plugin.name) {
    Log.error(`Plugin ${p} is missing a name!`); return;
  }
  if (!plugin.start) {
    Log.error(`Plugin ${plugin.name} is missing a "start" function!`); return;
  }
  Log.info(`Applying plugin ${plugin.name}`);
  plugin.start({
    asar: require('../utils/asar'), paths: require('../utils/paths')
  });
});
