const { join } = require('path');
const asar = require('@electron/asar');
const { copyModules } = require(paths.asar + '/utils/asar');
const { copySync } = require('fs-extra');

const DataComponent = ({ data, title, error }) => {
  return (
    <>
      <div className="container" style={{ padding: 0 }}>
        <h2 className="heading-2">{title}</h2>
      </div>
      <div className="container">
        <ul className="thumbnail-grid thumbnail-grid-responsive">
          {data.map(plugin => {
            const [downloaded, isDownloaded] = React.useState(fs.existsSync(join(paths.data, 'plugins', plugin.name, `${plugin.name}.js`)));

            return (
              <li className="thumbnail-col">
                <figure className="thumbnail">
                  <div className="picture picture-link no-background">
                    <img src={plugin.img} alt="" loading="lazy" className="picture-img css-1hv77co e3mndjk0" />
                  </div>
                  <ul className="action">
                    <li className="action-item">
                      <button
                        type="button" className="chakra-button action-item-tempo-btn action-force css-1sqw0k3 e3mndjk0"
                        onClick={() => {
                          if (!downloaded) {
                            if (!fs.existsSync(join(paths.data, 'plugins', plugin.name))) fs.mkdirSync(join(paths.data, 'plugins', plugin.name));
                            fetch(plugin.file).then(res => res.text()).then(res => {
                              fs.writeFileSync(join(paths.data, 'plugins', plugin.name, `${plugin.name}.js`), res);
                              asar.extractAll(paths.asarBackup, paths.extractedAsar);
                              copyModules();
                              copySync(join(__dirname, '..', 'utils'), join(paths.extractedAsar, 'utils'));
                              copySync(__dirname, join(paths.extractedAsar, 'dtjs'));
                              require('../utils/core');
                              require('../utils/plugins').apply();
                              asar.createPackage(paths.extractedAsar, paths.asar).then(() => {
                                RestartDialog();
                                fs.rmSync(paths.extractedAsar, { recursive: true });
                              });
                            });
                            isDownloaded(true);
                          } else {
                            fs.rmdirSync(join(paths.data, 'plugins', plugin.name), { recursive: true });
                            isDownloaded(false);
                            asar.extractAll(paths.asarBackup, paths.extractedAsar);
                            copyModules();
                            copySync(join(__dirname, '..', 'utils'), join(paths.extractedAsar, 'utils'));
                            copySync(__dirname, join(paths.extractedAsar, 'dtjs'));
                            require('../utils/core');
                            require('../utils/plugins').apply();
                            asar.createPackage(paths.extractedAsar, paths.asar).then(() => {
                              RestartDialog();
                              fs.rmSync(paths.extractedAsar, { recursive: true });
                            });
                          }
                        }}
                      >
                        <svg
                          viewBox="0 0 16 16" focusable="false" width="1em" height="1em" className={'chakra-icon css-2zrqo5 e3mndjk0 ' + (downloaded ? 'color-primary color-download' : 'svg-icon')}
                          aria-hidden="true"
                        >
                          <path d={downloaded ?
                            'm15.006 3.687-8.995 9.514L1 7.9l.727-.687 4.284 4.531L14.28 3l.727.687z' :
                            'M10 1H7v8H4.558L8.5 12.64 12.442 9H10V1zm1 7h4l-6.5 6L2 8h4V0h5v8zm5 7v1H1v-1h15z'
                          } />
                        </svg>
                      </button>
                      {plugin.settings &&
                        <button
                          type="button" className="chakra-button action-item-tempo-btn action-force css-1sqw0k3 e3mndjk0"
                          onClick={() => Modal({
                            title: `${plugin.name} Settings`,
                            body: () => <div style={{ padding: '20px' }}>{
                              plugin.settings.map(setting => {
                                if (setting.type === 'button') {
                                  return (
                                    <FormGroup>
                                      <Button onClick={(e) => {
                                        e.preventDefault();
                                        setting.onClick();
                                      }}>{setting.label}</Button>
                                      {setting.subtext && <Subtext>{setting.subtext}</Subtext>}
                                    </FormGroup>
                                  );
                                }
                              })
                            }</div>
                          })}
                        >
                          <svg
                            viewBox="0 0 16 16" focusable="false" width="1em" height="1em" className="chakra-icon css-2zrqo5 e3mndjk0 svg-icon"
                            aria-hidden="true"
                          >
                            <path d="M10.5 7.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM6 7.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-4.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
                          </svg>
                        </button>
                      }
                    </li>
                  </ul>
                </figure>
                <div className="thumbnail-caption">
                  <h3 className="heading-4">{plugin.name}</h3>
                  <h3 className="heading-4-sub">{plugin.description}</h3>
                </div>
              </li>
            );
          })}
        </ul>
        {error && <pre><code>{error}</code></pre>}
      </div>
    </>
  );
};
