module.exports = () => {
  const React = r.a;
  const fs = require('fs');
  const { join } = require('path');
  const { paths } = window.DeezerTweaker;
  require('../components');

  const HomeComponent = () => {
    const [customCss, setCustomCss] = React.useState(fs.readFileSync(join(paths.data, 'custom.css'), 'utf8'));

    return (
      <>
        <div>
          <div className="container" style={{ padding: 0 }}>
            <h2 className="heading-2">Custom CSS</h2>
          </div>
          <div className="container">
            <textarea
              className="chakra-textarea form-control form-control-block css-1f0xw6y e3mndjk0" rows="8"
              onChange={(e) => setCustomCss(e.target.value)}
            >{customCss}</textarea>
            <div style={{ marginTop: 'var(--tempo-space-6)' }}>
              <Button onClick={() => fs.writeFileSync(join(paths.data, 'custom.css'), customCss)}>Save</Button>
            </div>
          </div>
        </div>
      </>
    );
  }

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
