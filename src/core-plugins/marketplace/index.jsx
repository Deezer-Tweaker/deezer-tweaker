module.exports = () => {
  const React = r.a;
  require('../components');
  require('./plugins');

  return (
    <>
      <div className="container">
        <h1 className="heading-1">Deezer Tweaker Marketplace</h1>
        <Tabs items={[
          { name: 'Plugins', component: <PluginsComponent data={[
              { name: 'No Premium' }
            ]} /> },
          { name: 'Themes', component: () => {} },
          { name: 'Installed', component: () => {} },
          { name: 'Plugins', component: () => {} },
        ]} />
      </div>
    </>
  );
};
