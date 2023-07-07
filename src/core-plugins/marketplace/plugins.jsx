const PluginsComponent = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  let pluginsNb = 0;

  if (loading) {
    fetch('https://api.github.com/repos/Deezer-Tweaker/community-plugins/contents')
      .then((res) => res.json())
      .then((json) => {
        pluginsNb = json.filter(d => d.type === 'dir').length;
        json.filter(d => d.type === 'dir').map(({ name }) => {
          fetch(`https://raw.githubusercontent.com/Deezer-Tweaker/community-plugins/main/${name}/manifest.json`).then(res => res.json()).then(res => {
            data.push({
              name: res.name,
              description: res.description,
              file: `https://raw.githubusercontent.com/Deezer-Tweaker/community-plugins/main/${name}/${res.main}`,
              img: `https://raw.githubusercontent.com/Deezer-Tweaker/community-plugins/main/${name}/${res.screenshot}`
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
