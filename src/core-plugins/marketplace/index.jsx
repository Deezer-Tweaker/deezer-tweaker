module.exports = () => {
  const fs = require('fs');
  const React = o.a;
  const { paths } = window.DeezerTweaker;
  require(paths.corePlugins + '/components');
  require(paths.corePlugins + '/restart-dialog/index');
  require(paths.corePlugins + '/marketplace/data');
  require(paths.corePlugins + '/marketplace/plugins');
  require(paths.corePlugins + '/marketplace/themes');
  require(paths.corePlugins + '/marketplace/installed');
  require(paths.corePlugins + '/marketplace/settings');

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
