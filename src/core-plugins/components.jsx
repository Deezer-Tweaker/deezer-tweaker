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

const Table = ({ columns, rows }) => {
  return (
    <>
      <div aria-rowcount={rows.length} className="_-81Cl" data-testid="is-fully-fetched" role="grid">
        <div className="_2Ktdd" role="rowgroup">
          {columns.map(column => (
            <div className="_1hePk _1R22u _33B7t" role="columnheader"><span>{column.toUpperCase()}</span></div>
          ))}
          <div className="_1hePk _2ZD3_ _3gdBA" role="columnheader">
            <div className="NtKR-">
              <Checkbox />
            </div>
          </div>
        </div>
        {rows.map((row, i) => (
          <div className="_1uDWG" role="rowgroup">
            <div style={{ width: '100%' }}>
              <div draggable="false" className="_2OACy" aria-rowindex={i + 1} aria-selected="false" role="row" style={{ height: '56px' }}>
                <div
                  className="_1caJL _14wp8" onMouseEnter={(e) => e.target.classList.add('_1qgvJ')}
                  onMouseLeave={(e) => e.target.classList.remove('_1qgvJ')}
                >
                  {Object.keys(row).map(k => ((
                    <div className="_1hePk _1R22u ___2ZD3_ _33B7t" role="gridcell">
                      {typeof row[k] === 'string' ?
                        <span className="XS7Sp">{row[k]}</span> :
                        (typeof row[k] === 'boolean' ? <Checkbox enabled={row[k]} /> : row[k])
                      }
                    </div>
                  )))}
                  <div className="_1hePk _2ZD3_ _3gdBA" role="gridcell">
                    <Checkbox />
                  </div>
                </div>
                <div className="_3gGwz"></div>
              </div>
            </div>
          </div>
        ))}
        <div className="KdIin">
          <div className="_2QUtE"></div>
          <div className="_2BEGp">
            <span className="u2S59">Chargement en cours</span>
            <svg className="svg-icon svg-icon-loader animate-spin" focusable="false" height="24" role="img" width="24" viewBox="0 0 12 12" aria-hidden="true">
              <path d="m1.735 10.22.707-.707a5 5 0 1 0 .015-7.042l-.707-.706a6 6 0 1 1-.015 8.456Z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
};

const Checkbox = ({ enabled = false, onChange }) => {
  const [isChecked, setIsChecked] = React.useState(enabled);

  return (
    <div className="_1uWYu">
      <label className={`input-checkbox${isChecked ? ' is-checked' : ''}`}>
        <input className="input-control" type="checkbox" value onChange={() => setIsChecked(!isChecked)} />
        <svg
          className="svg-icon svg-icon-check checkbox-tick" focusable="false" height="12" role="img" width="12"
          viewBox="0 0 12 12" aria-hidden="true"
        >
          <path d="M.833 5.333a.487.487 0 0 0-.69.688l3.79 3.785.345.344 7.578-7.568a.487.487 0 1 0-.689-.688l-6.889 6.88L.833 5.333Z" />
        </svg>
      </label>
    </div>
  );
}
