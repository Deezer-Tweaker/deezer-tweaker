const DataComponent = ({ data, title }) => {
  return (
    <>
      <div className="container" style={{ paddingTop: 0 }}>
        <h2 className="heading-2">{title}</h2>
      </div>
      <div className="container">
        <ul className="thumbnail-grid thumbnail-grid-responsive">
          {data.map(plugin => {
            return (
              <li className="thumbnail-col">
                <figure className="thumbnail">
                  <div className="picture picture-link no-background">
                    <img src="" alt="" loading="lazy" className="picture-img css-1hv77co e3mndjk0" />
                  </div>
                  <ul className="action">
                    <li className="action-item">
                      <button type="button" className="chakra-button action-item-tempo-btn action-force css-1sqw0k3 e3mndjk0">
                        <svg
                          viewBox="0 0 16 16" focusable="false" width="1em" height="1em" className="svg-icon chakra-icon css-2zrqo5 e3mndjk0"
                          aria-hidden="true"
                        >
                          <path d="M10 1H7v8H4.558L8.5 12.64 12.442 9H10V1zm1 7h4l-6.5 6L2 8h4V0h5v8zm5 7v1H1v-1h15z" />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </figure>
                <div className="thumbnail-caption">
                  <h3 className="heading-3">{plugin.name}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
