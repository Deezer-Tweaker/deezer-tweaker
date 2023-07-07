const { join } = require('path');
module.exports = () => {
  const fs = require('fs');
  const React = r.a;
  require('../components');
  require('./data');
  require('./plugins');
  require('./themes');
  const { paths } = window.DeezerTweaker;

  return (
    <>
      <div className="container">
        <h1 className="heading-1">Deezer Tweaker Marketplace</h1>
        <Tabs items={[
          { name: 'Plugins', hideTitle: true, component: <PluginsComponent /> },
          { name: 'Themes', hideTitle: true, component: <ThemesComponent /> },
          { name: 'Installed', hideTitle: true, component:
            <>
              <DataComponent title="Plugins" data={fs.readdirSync(join(paths.data, 'plugins')).map(f => {
                return require(join(paths.data, 'plugins', f, 'manifest.json'));
              })} />
              <DataComponent title="Themes" data={[]} />
            </>
          },
        ]} />
      </div>
    </>
  );
};
