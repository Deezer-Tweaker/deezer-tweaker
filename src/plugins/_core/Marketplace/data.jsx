/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

const { recompile } = require(paths.asar + '/utils/asar');

/* global paths, React, fs, Modal, join */

// eslint-disable-next-line no-unused-vars
const DataComponent = ({ data, title, error }) => {
  const [search, setSearch] = React.useState(null);
  data = data.filter(plugin => search ? plugin.name.toLowerCase().includes(search.toLowerCase()) : plugin);

  return (
    <>
      <div className="container" style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 className="heading-2">{title}</h2>
        <div className="_2HmiI">
          <div className="_1aTuL">
            <InputGroup size="sm">
              <div>
                <InputLeftElement pointerEvents="none" size="sm"></InputLeftElement>
                <Input placeholder={`Search ${title.toLowerCase()}...`} role="searchbox" onChange={(e) => setSearch(e.target.value)}></Input>
                <InputRightElement></InputRightElement>
              </div>
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="container">
        <ul className="thumbnail-grid thumbnail-grid-responsive">
          {data.map(plugin => {
            const { external, core, name, description, img, file, settings } = plugin;
            const pluginSettings = fs.existsSync(join(paths.data, 'settings.json')) ? require(join(paths.data, 'settings.json')) : {};
            const [downloaded, isDownloaded] = React.useState(
              (pluginSettings.plugins && pluginSettings.plugins[name] && pluginSettings.plugins[name].enabled) ??
              fs.existsSync(join(paths.data, 'plugins', name, `${name}.js`))
            );

            return (
              <li className="thumbnail-col">
                <figure className="thumbnail">
                  <div className="picture picture-link no-background">
                    <img src={img} alt="" loading="lazy" className="picture-img css-1hv77co e3mndjk0" />
                  </div>
                  <ul className="action">
                    {!core && <li className="action-item">
                      <button
                        type="button" className="chakra-button action-item-tempo-btn action-force css-1sqw0k3 e3mndjk0"
                        onClick={() => {
                          if (external) {
                            if (!downloaded) {
                              if (!fs.existsSync(join(paths.data, 'plugins', name))) fs.mkdirSync(join(paths.data, 'plugins', name));
                              fetch(file).then(res => res.text()).then(res => {
                                fs.writeFileSync(join(paths.data, 'plugins', name, `${name}.js`), res);
                                recompile();
                                isDownloaded(true);
                              });
                            } else {
                              fs.rmdirSync(join(paths.data, 'plugins', name), { recursive: true });
                              isDownloaded(false);
                              recompile();
                            }
                          } else {
                            const settings = fs.existsSync(join(paths.data, 'settings.json')) ? require(join(paths.data, 'settings.json')) : {};
                            if (!settings.plugins) settings.plugins = {};
                            settings.plugins[name] = { enabled: !downloaded };
                            fs.writeFileSync(join(paths.data, 'settings.json'), JSON.stringify(settings));
                            isDownloaded(!downloaded);
                            recompile();
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
                    </li>}
                    {(downloaded && settings) && <li className="action-item">
                      <button
                        type="button" className="chakra-button action-item-tempo-btn action-force css-1sqw0k3 e3mndjk0"
                        onClick={() => Modal({
                          title: `${name} Settings`,
                          body: () => <div style={{ padding: '20px' }}>{
                            settings.map(setting => {
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
                    </li>}
                  </ul>
                </figure>
                <div className="thumbnail-caption">
                  <h3 className="heading-4">{name}</h3>
                  <h3 className="heading-4-sub">{description}</h3>
                </div>
              </li>
            );
          })}
        </ul>
        {error && <span>An error occurred: {error}</span>}
      </div>
    </>
  );
};
