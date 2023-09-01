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
    const settings = fs.existsSync(join(paths.data, 'settings.json')) ? require(join(paths.data, 'settings.json')) : {};
    if (typeof settings.notification_if_update_available === 'undefined') settings.notification_if_update_available = true;
    const applySetting = (key, value) => {
      settings[key] = value;
      fs.writeFileSync(join(paths.data, 'settings.json'), JSON.stringify(settings));
    };

    return (
      <>
        <FormGroup>
          <Switch
            enabled={settings.notification_if_update_available}
            onChange={(e) => applySetting('notification_if_update_available', e.target.checked)}
            label="Enable sending a notification when an update is available"
          />
        </FormGroup>
        <Button onClick={() => {
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
      </>
    );
  };

  return (
    <div className="container">
      <h1 className="heading-1">Deezer Tweaker</h1>
      <Tabs items={[
        { name: 'Deezer Tweaker', component: <HomeComponent /> },
        { name: 'Settings', component: <SettingsComponent /> }
      ]} />
    </div>
  );
};
