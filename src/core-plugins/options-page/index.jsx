module.exports = () => {
  const React = r.a;
  require('../components');

  const HomeComponent = () => {
    return (
      <>
        <div>
          <textarea className="chakra-textarea form-control form-control-block css-1f0xw6y e3mndjk0"></textarea>
        </div>
      </>
    );
  }

  const PluginsComponent = ({ data }) => {
    return (
      <>
        <div>
          <Table columns={['name', 'author', 'description', 'enabled']} rows={data} />
        </div>
      </>
    );
  };

  return (
    <div className="container">
      <h1 className="heading-1">Deezer Tweaker</h1>
      <Tabs items={[
        { name: 'Deezer Tweaker', component: <HomeComponent /> },
        { name: 'Plugins', component: <PluginsComponent data={[
            { name: 'Test', description: 'This is a test', author: 'Yuuto', enabled: false }
          ]} /> },
        { name: 'Themes', component: () => {} },
        { name: 'Settings', component: () => {} }
      ]} />
    </div>
  );
};
