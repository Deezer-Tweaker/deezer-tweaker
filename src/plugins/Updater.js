/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

/* global electron, join */

const { existsSync, writeFileSync } = require('fs');
const paths = require('../../utils/paths');

const updateUrl = 'https://api.github.com/repos/Deezer-Tweaker/deezer-tweaker/releases/latest';
fetch(updateUrl).then(res => res.json()).then(json => {
  if (json.tag_name !== window.DeezerTweaker.version) {
    if (!existsSync(join(paths.data, 'settings.json'))) writeFileSync(join(paths.data, 'settings.json'), '{}');
    if (require(join(paths.data, 'settings.json')).notification_if_update_available) {
      const notification = new Notification('New update available!', {
        body: `The version ${json.tag_name} is available to download! Click on this notification to download it.`
      });
      notification.addEventListener('click', () => {
        electron.openExternalLink(json.assets[0].browser_download_url);
      });
    }
  }
});
