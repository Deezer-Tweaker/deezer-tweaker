/*
 * Deezer Tweaker, a tool to mod Deezer desktop app!
 * Copyright (c) 2023 Yuuto
 * Licensed under the MPL-2.0 license
 */

/* eslint no-unused-vars: 0 */
/* global React, DeezerTweaker */

const Flex = DeezerTweaker.importWebpackModule('NSet').f;

const Tabs = DeezerTweaker.importWebpackModule('lssQ').a;

const FormControl = DeezerTweaker.importWebpackModule('Q7m9').a;
const FormHelperText = DeezerTweaker.importWebpackModule('Q7m9').c;
const Button = DeezerTweaker.importWebpackModule('s86Q').a;
const Switch = DeezerTweaker.importWebpackModule('eh3h').a;
const Label = DeezerTweaker.importWebpackModule('Q7m9').d;

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
