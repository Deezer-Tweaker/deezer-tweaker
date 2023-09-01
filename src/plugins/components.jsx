/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

/* eslint no-unused-vars: 0 */
/* global React */

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
        {!items[activeTab].hideTitle &&
          <div className="container">
            <h2 className="heading-2">{items[activeTab].name}</h2>
          </div>
        }
        <div className="container">
          <React.Suspense fallback={<div>Loading...</div>}>
            {items[activeTab].component}
          </React.Suspense>
        </div>
      </div>
    </>
  );
};

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
  );
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
};

const Button = ({ children, onClick }) => {
  return <button className="chakra-button css-qfh00b e3mndjk0" onClick={onClick}>{children}</button>;
};

const Switch = ({ label, enabled = false, onChange }) => {
  const [isChecked, setIsChecked] = React.useState(enabled);

  return (
    <div className="css-70qvj9 e3mndjk0">
      <label id="field-:rj:-label" htmlFor="field-:rj:" className="chakra-form__label css-1gt16kl e3mndjk0">{label}</label>
      <label className="chakra-switch css-1g4burd e3mndjk0" data-checked={isChecked || undefined}>
        <input
          className="chakra-switch__input" type="checkbox" id="field-:rj:" aria-invalid="false" aria-disabled="false"
          value aria-describedby="field-:rj:-helptext" onChange={(e) => {
            setIsChecked(!isChecked);
            onChange(e);
          }}
          style={{
            border: '0px', clip: 'rect(0px, 0px, 0px, 0px)', height: '1px', width: '1px', margin: '-1px', padding: '0px',
            overflow: 'hidden', whiteSpace: 'nowrap', position: 'absolute'
          }}
        />
        <span aria-hidden="true" className="chakra-switch__track css-1967ax6 e3mndjk0" data-checked={isChecked || undefined}>
          <span className="chakra-switch__thumb css-1wgv1b1 e3mndjk0" data-checked={isChecked || undefined}></span>
        </span>
      </label>
    </div>
  );
};

const Label = ({ htmlFor, children }) => {
  return <label htmlFor={htmlFor} className="chakra-form__label css-8m1z4 e3mndjk0">{children}</label>;
};

const Subtext = ({ children }) => {
  return <div className="chakra-form__helper-text css-z6jnh4 e3mndjk0">{children}</div>;
};

const Input = ({ type = 'text', name, id = name, value: _v }) => {
  const [value, setValue] = React.useState(_v);

  return <input
    type={type} name={name} id={id} className="chakra-input css-1lus2zd e3mndjk0" value={value}
    onChange={(e) => setValue(e.target.value)}
  />;
};

const FormGroup = ({ children }) => {
  return <div className="chakra-form-control css-1kxonj9 e3mndjk0" role="group">{children}</div>;
};

const Modal = ({ size = 'large', closable = true, title, body }) => {
  const div = document.createElement('div');
  div.classList.add('modal-div-container');
  document.querySelector('#dzr-app .naboo').appendChild(div);
  const container = document.querySelector('#dzr-app .naboo .modal-div-container');

  const modal = (
    <div className="modal" role="dialog" aria-hidden="false">
      <div className="modal-backdrop" style={{ opacity: 0.8 }}></div>
      <div className="modal-wrapper">
        <div className={`modal-dialog modal-${size}`} style={{ opacity: 1 }}>
          <div>
            {closable && <button className="modal-close icon icon-cancel" id="modal-close" onClick={() => container.remove()}></button>}
            <div id="modal_title" className="modal-header">{title}</div>
            <div className="modal-body">{typeof body === 'function' ? body() : body}</div>
          </div>
        </div>
      </div>
    </div>
  );

  require('react-dom/client').createRoot(container).render(modal);
};
