/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

// eslint-disable-next-line no-unused-vars
const PluginsComponent = () => {
  /* global React */

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  let pluginsNb = 0;

  if (loading) {
    fetch('https://api.github.com/repos/Deezer-Tweaker/community-plugins/contents')
      .then((res) => res.json())
      .then((json) => {
        const filter = d => d.type === 'dir' && d.name !== 'types';
        pluginsNb = json.filter(filter).length;
        json.filter(filter).map(({ name }) => {
          fetch(`https://raw.githubusercontent.com/Deezer-Tweaker/community-plugins/main/${name}/${name}.js`).then(res => res.text()).then(res => {
            const js = eval?.('(() => {' + res.replace('module.exports =', 'return') + '})();');
            data.push({
              name: js.name,
              description: js.description,
              file: `https://raw.githubusercontent.com/Deezer-Tweaker/community-plugins/main/${name}/${name}.js`,
              img: `https://raw.githubusercontent.com/Deezer-Tweaker/community-plugins/main/${name}/${js.screenshot}`,
              settings: js.settings
            });
            setData(data);
          });
        });
        const interval = setInterval(() => {
          if (pluginsNb === data.length) {
            clearInterval(interval);
            setLoading(false);
          }
        }, 200);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        console.error(err);
      });
  }

  return loading ? <div>Loading</div> : <DataComponent title="Plugins" data={data} error={error} />;
};
