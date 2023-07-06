module.exports = () => {
  const React = r.a;
  require('./components');

  const Tabs = ({ items }) => {
    const [activeTab, setActiveTab] = React.useState(0);

    return (
      <>
        <nav className="navbar">
          <div className="container" style={{ paddingBottom: 0 }}>
            <ul className="navbar-nav" role="tablist">
              {items.map((item, i) => ((
                <li className={`navbar-item${activeTab === i ? ' active' : ''}`} onClick={() => setActiveTab(i)}>
                  <a className="chakra-text navbar-link css-93cf35 e3mndjk0">{item.name}</a>
                </li>
              )))}
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="container">
            <h2 className="heading-2">{items[activeTab].name}</h2>
          </div>
          <div className="container">
            {items[activeTab].component}
          </div>
        </div>
      </>
    );
  }

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
