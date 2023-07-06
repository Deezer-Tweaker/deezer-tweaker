const Table = ({ columns, rows }) => {
  return (
    <div aria-rowcount="3" className="_-81Cl" data-testid="is-fully-fetched" role="grid">
      <div className="_2Ktdd" role="rowgroup">
        {columns.map(column => (
          <div className="_1hePk _1R22u _33B7t" role="columnheader"><span>{column.toUpperCase()}</span></div>
        ))}
        <div className="_1hePk _2ZD3_ _3gdBA" role="columnheader">
          <div className="NtKR-">
            <div className="_1uWYu">
              <label className="input-checkbox">
                <input className="input-control" type="checkbox" value="" />
                <svg
                  className="svg-icon svg-icon-check checkbox-tick" focusable="false" height="12" role="img" width="12"
                  viewBox="0 0 12 12" aria-hidden="true" onClick={() => {}}
                >
                  <path d="M.833 5.333a.487.487 0 0 0-.69.688l3.79 3.785.345.344 7.578-7.568a.487.487 0 1 0-.689-.688l-6.889 6.88L.833 5.333Z" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
      {rows.map(row => (
        <div className="_1uDWG" role="rowgroup">
          <div draggable="false" className="_2OACy" aria-rowindex="1" aria-selected="false" role="row" style={{ height: '56px' }}>
            <div className="_1caJL _14wp8">
              {Object.keys(row).map(k => ((
                <div className="_1hePk _2ZD3_ _33B7t" role="gridcell">{row[k]}</div>
              )))}
              <div className="_1hePk _2ZD3_ _3gdBA" role="gridcell">
                <div className="_1uWYu">
                  <label className="input-checkbox">
                    <input className="input-control" type="checkbox" value="" />
                    <svg className="svg-icon svg-icon-check checkbox-tick" focusable="false" height="12" role="img" width="12" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M.833 5.333a.487.487 0 0 0-.69.688l3.79 3.785.345.344 7.578-7.568a.487.487 0 1 0-.689-.688l-6.889 6.88L.833 5.333Z" />
                    </svg>
                  </label>
                </div>
              </div>
            </div>
            <div className="_3gGwz"></div>
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
  )
};
