module.exports = () => {
  const React = r.a;
  require('../components');
  require('./data');

  return (
    <>
      <div className="container">
        <h1 className="heading-1">Deezer Tweaker Marketplace</h1>
        <Tabs items={[
          { name: 'Plugins', hideTitle: true, component: <DataComponent title="Plugins" data={[
              { name: 'No Premium' }
            ]} /> },
          { name: 'Themes', hideTitle: true, component: <DataComponent title="Themes" data={[
              { name: 'No Premium' }
            ]} /> },
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
