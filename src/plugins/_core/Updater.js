/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

/* global DeezerTweaker, electron */

setTimeout(() => {
  const updateUrl = 'https://api.github.com/repos/Deezer-Tweaker/deezer-tweaker/releases/latest';
  fetch(updateUrl).then(res => res.json()).then(json => {
    if (json.tag_name !== window.DeezerTweaker.version) {
      const React = DeezerTweaker.importWebpackModule.n(DeezerTweaker.importWebpackModule('q1tI')).a;
      const ReactDOM = DeezerTweaker.importWebpackModule.n(DeezerTweaker.importWebpackModule('i8i4')).a;
      const Popper = DeezerTweaker.importWebpackModule('hG0x').a;
      const Button = DeezerTweaker.importWebpackModule('s86Q').a;
      const data = {
        colorScheme: 'gray',
        message: `The version ${json.tag_name} of Deezer Tweaker is available to download!`,
        action: [React.createElement(Button, {
          colorScheme: 'white', variant: 'outline', onClick: () => electron.openExternalLink(json.assets[0].browser_download_url),
          key: 'download'
        }, 'Download')]
      };
      const render = React.createElement(Popper, data);
      const alert = React.createElement('div', { className: 'alert-wrapper' }, render);
      ReactDOM.createRoot(document.querySelector('.page-alerts')).render(alert);
      const i = setInterval(() => {
        const alert = document.querySelector('.css-3mqnm2.chakra-alert[role="alert"]');
        if (alert) clearInterval(i); else return;
        alert.querySelector('.chakra-alert__title').className = 'chakra-alert__title css-4j2z69 e3mndjk0';
        alert.querySelector('.chakra-alert__desc').className = 'chakra-alert__desc css-vfhx9v e3mndjk0';
        alert.className = 'chakra-alert e3mndjk0 css-1eou3g4';
        alert.querySelector('.chakra-stack').addEventListener('click', () => {
          alert.parentElement.remove();
        });
      }, 1);
    }
  });
}, 6000);
