/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

module.exports = () => {
  /* global o, electron */
  const React = o.a;
  const fs = require('fs');
  const { join } = require('path');
  const { paths } = window.DeezerTweaker;
  require(paths.corePlugins + '/components');

  // eslint-disable-next-line no-unused-vars
  const HomeComponent = () => {
    const [customCss, setCustomCss] = React.useState(fs.readFileSync(join(paths.data, 'custom.css'), 'utf8'));

    return (
      <>
        <div>
          <div className="container" style={{ padding: 0 }}>
            <h2 className="heading-2">Custom CSS</h2>
          </div>
          <div className="container">
            <textarea
              className="chakra-textarea form-control form-control-block css-1f0xw6y e3mndjk0 css-editor" rows="10"
              onChange={(e) => setCustomCss(e.target.value)}
            >{customCss}</textarea>
            <div style={{ marginTop: 'var(--tempo-space-6)' }}>
              <Button onClick={() => {
                fs.writeFileSync(join(paths.data, 'custom.css'), customCss);
                document.querySelector('link#deezer-tweaker-custom-css')?.setAttribute('href', `${join(paths.data, 'custom.css')}?t=${Date.now()}`);
              }}>Save</Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  // eslint-disable-next-line no-unused-vars
  const SettingsComponent = () => {
    const [settings, setSettings] = React.useState(fs.existsSync(join(paths.data, 'settings.json')) ? require(join(paths.data, 'settings.json')) : {});
    if (typeof settings.notification_if_update_available === 'undefined') settings.notification_if_update_available = true;
    const applySetting = (key, value) => {
      settings[key] = value;
      fs.writeFileSync(join(paths.data, 'settings.json'), JSON.stringify(settings));
      setSettings(settings);
    };

    return (
      <>
        <FormControl>
          <Flex>
            <Label color="text.main">Enable sending a notification when an update is available</Label>
            <Switch
              isChecked={settings.notification_if_update_available}
              onChange={(e) => applySetting('notification_if_update_available', e.target.checked)}
            />
          </Flex>
        </FormControl>
        <div className="container">
          <Button colorScheme="primary" onClick={() => {
            const updateUrl = 'https://api.github.com/repos/Deezer-Tweaker/deezer-tweaker/releases/latest';
            fetch(updateUrl).then(res => res.json()).then(json => {
              if (json.tag_name !== window.DeezerTweaker.version) {
                const notification = new Notification('New update available!', {
                  body: `The version ${json.tag_name} is available to download! Click on this notification to download it.`
                });
                notification.addEventListener('click', () => {
                  electron.openExternalLink(json.assets[0].browser_download_url);
                });
              }
            });
          }}>Check for updates</Button>
        </div>
      </>
    );
  };

  const [tab, setTab] = React.useState('home');
  const componentsMap = {
    home: <HomeComponent />,
    settings: <SettingsComponent />
  };

  return (
    <div className="container">
      <h1 className="heading-1">Deezer Tweaker</h1>
      <style>{'.navbar > .container { padding-bottom: 0; }'}</style>
      <Tabs active={tab} items={[
        { id: 'home', label: 'Deezer Tweaker', action: () => setTab('home') },
        { id: 'settings', label: 'Settings', action: () => setTab('settings') }
      ]} />
      <div className="container">
        <React.Suspense fallback={<div>Loading</div>}>
          {componentsMap[tab]}
        </React.Suspense>
      </div>
    </div>
  );
};
