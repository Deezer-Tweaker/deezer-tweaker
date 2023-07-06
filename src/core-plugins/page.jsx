module.exports = () => {
  const React = r.a;
  require('./components');
  let languagesKeys = { exports: {} };
  webpackJsonpDeezer.find(k => k[0][0] === 21)[1]?.SLhx(languagesKeys);

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
          <div className="_13EmO">
            <div className="chakra-input__group css-4302v8 e3mndjk0">
              <div className="chakra-input__left-element css-1elzcti e3mndjk0">
                <svg viewBox="0 0 24 24" focusable="false" className="chakra-icon css-1vq1c2x e3mndjk0" data-testid="SearchIcon">
                  <path d="M20 11a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-2.707 7.28a9 9 0 1 1 .772-.63l3.289 3.29a.5.5 0 0 1-.708.706l-3.292-3.292a.507.507 0 0 1-.061-.074z" />
                </svg>
              </div>
              <input role="searchbox" placeholder={languagesKeys.exports.search_action_searchwithintracks_web.replace('titres', 'plugins')} className="chakra-input css-ag9tni e3mndjk0" />
              <div className="chakra-input__right-element css-1160ufh e3mndjk0"></div>
            </div>
          </div>
          <Table columns={['name', 'author', 'description']} rows={[{name: 'aa', author: 'xx', description: 'ifjgiojg'}]} />
        </div>
      </>
    );
  };

  return (
    <div className="container">
      <h1 className="heading-1">Deezer Tweaker</h1>
      <Tabs items={[
        { name: 'Deezer Tweaker', component: <HomeComponent /> },
        { name: 'Plugins', component: <PluginsComponent /> },
        { name: 'Themes', component: () => {} },
        { name: 'Settings', component: () => {} }
      ]} />
    </div>
  );
};
