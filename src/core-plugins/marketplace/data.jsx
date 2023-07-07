const { join } = require('path');

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
                            });
                            fs.writeFileSync(join(paths.data, 'plugins', plugin.name, 'manifest.json'), JSON.stringify(plugin));
                            isDownloaded(true);
                          } else {
                            fs.rmdirSync(join(paths.data, 'plugins', plugin.name), { recursive: true });
                            isDownloaded(false);
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
