/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

module.exports = () => {
  /* global o */

  // eslint-disable-next-line no-unused-vars
  const fs = require('fs');
  // eslint-disable-next-line no-unused-vars
  const React = o.a;
  const { paths } = window.DeezerTweaker;
  require(paths.corePlugins + '/components');
  require(paths.corePlugins + '/RestartDialog/index');
  require(paths.corePlugins + '/Marketplace/data');
  require(paths.corePlugins + '/Marketplace/plugins');
  require(paths.corePlugins + '/Marketplace/themes');
  require(paths.corePlugins + '/Marketplace/installed');
  require(paths.corePlugins + '/Marketplace/settings');

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
