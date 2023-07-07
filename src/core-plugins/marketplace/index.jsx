module.exports = () => {
  const React = r.a;
  require('../components');
  require('./data');
  require('./plugins');
  require('./themes');

  return (
    <>
      <div className="container">
        <h1 className="heading-1">Deezer Tweaker Marketplace</h1>
        <Tabs items={[
          { name: 'Plugins', hideTitle: true, component: <PluginsComponent /> },
          { name: 'Themes', hideTitle: true, component: <ThemesComponent /> },
          { name: 'Installed', hideTitle: true, component:
            <>
              <DataComponent title="Plugins" data={[
                { name: 'No Premium' }
              ]} />
              <DataComponent title="Themes" data={[
                { name: 'No Premium' }
              ]} />
            </>
          },
        ]} />
      </div>
    </>
  );
};
