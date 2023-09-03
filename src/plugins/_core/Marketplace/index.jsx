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

  const [tab, setTab] = React.useState('plugins');
  const componentsMap = {
    plugins: <PluginsComponent />,
    themes: <ThemesComponent />,
    installed: <InstalledComponent />,
    settings: <SettingsComponent />
  };

  return (
    <>
      <div className="container">
        <h1 className="heading-1">Deezer Tweaker Marketplace</h1>
        <style>{'.navbar > .container { padding-bottom: 0; }'}</style>
        <Tabs active={tab} items={[
          { id: 'plugins', label: 'Plugins', action: () => setTab('plugins') },
          { id: 'themes', label: 'Themes', action: () => setTab('themes') },
          { id: 'installed', label: 'Installed', action: () => setTab('installed') },
          { id: 'settings', label: 'Settings', action: () => setTab('settings') },
        ]} />
        <div className="container">
          <React.Suspense fallback={<div>Loading</div>}>
            {componentsMap[tab]}
          </React.Suspense>
        </div>
      </div>
    </>
  );
};
