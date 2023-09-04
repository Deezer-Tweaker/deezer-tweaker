/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

// eslint-disable-next-line no-unused-vars
const PluginsComponent = () => {
  /* global React, paths */

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const handleError = (err) => {
    setLoading(false);
    setError(err.message);
    console.error(err);
  };

  if (loading) {
    fetch(`${paths.corePlugins}/../_list.json`)
      .then((res) => res.json())
      .then(list => {
        list.map(plugin => {
          data.push({
            name: plugin.name,
            description: plugin.description,
            file: `https://raw.githubusercontent.com/Deezer-Tweaker/deezer-tweaker/master/src/plugins/${plugin.main.endsWith('index.js') ? `${name}/index` : name}.js`,
            settings: plugin.settings,
            core: plugin.main.startsWith('_core/')
          });
          setData(data);
        });

        fetch('https://api.github.com/repos/Deezer-Tweaker/community-plugins/contents')
          .then((res) => res.json())
          .then((json) => {
            const filter = d => d.type === 'dir' && d.name !== 'types';
            json.filter(filter).map(({ name }) => {
              fetch(`https://raw.githubusercontent.com/Deezer-Tweaker/community-plugins/main/${name}/${name}.js`).then(res => res.text()).then(res => {
                const js = eval?.('(() => {' + res.replace('module.exports =', 'return') + '})();');
                data.push({
                  name: js.name,
                  description: js.description,
                  file: `https://raw.githubusercontent.com/Deezer-Tweaker/community-plugins/main/${name}/${name}.js`,
                  img: js.screenshot && `https://raw.githubusercontent.com/Deezer-Tweaker/community-plugins/main/${name}/${js.screenshot}`,
                  settings: js.settings
                });
                setData(data);
              });
            });
            const interval = setInterval(() => {
              const nb = list.length + json.filter(filter).length;
              if (nb === data.length) {
                clearInterval(interval);
                setLoading(false);
              }
            }, 10);
          })
          .catch(handleError);
      })
      .catch(handleError);
  }

  return loading ? <div>Loading</div> : <DataComponent title="Plugins" data={data} error={error} />;
};
