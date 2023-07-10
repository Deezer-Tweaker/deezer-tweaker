const {
  join
} = require('path');
const updateUrl = 'https://api.github.com/repos/Deezer-Tweaker/deezer-tweaker/releases/latest';
fetch(updateUrl).then(res => res.json()).then(json => {
  if (json.tag_name !== window.DeezerTweaker.version) {
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