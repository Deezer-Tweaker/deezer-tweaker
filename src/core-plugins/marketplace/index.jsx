module.exports = () => {
  const fs = require('fs');
  const React = r.a;
  const { paths } = window.DeezerTweaker;
  require(paths.corePlugins + '/components');
  require('./data');
  require('./plugins');
  require('./themes');
  require('./installed');
  require('./settings');
  require('../restart-dialog/index');

  return (
    <>
      <div className="container">
        <h1 className="heading-1">Deezer Tweaker Marketplace</h1>
        <Tabs items={[
          { name: 'Plugins', hideTitle: true, component: <PluginsComponent /> },
          { name: 'Themes', hideTitle: true, component: <ThemesComponent /> },
          { name: 'Installed', hideTitle: true, component: <InstalledComponent /> },
          { name: 'Settings', component: <SettingsComponent /> },
        ]} />
      </div>
    </>
  );
};
