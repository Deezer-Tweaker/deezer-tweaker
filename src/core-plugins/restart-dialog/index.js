const RestartDialog = () => {
  const div = document.createElement('div');
  div.classList.add('modal');
  div.setAttribute('role', 'dialog');
  div.setAttribute('aria-hidden', 'false');
  div.setAttribute('id', 'restart-dialog');

  const template = `
  <div class="modal-backdrop" style="opacity: 0.8;"></div>
  <div class="modal-wrapper">
    <div class="modal-dialog" style="opacity: 1;">
      <div class="modal-conversion" style="padding: 50px 0">
        <h3 class="heading-3">Restart Deezer to apply plugins</h3>
        <div style="margin-top: var(--tempo-space-6); gap: 20px; display: flex; justify-content: center">
          <button class="chakra-button css-qfh00b e3mndjk0" onclick="(() => {
            const paths = require('../utils/paths');
            require('child_process').spawn(join(paths.program, 'Deezer.exe'), [], { detached: true });
            process.exit(0);
          })()">Restart now</button>
          <button class="chakra-button css-qfh00b e3mndjk0" onclick="document.querySelector('.naboo #restart-dialog').remove()">Restart later</button>
        </div>
      </div>
    </div>
  </div>`;

  div.innerHTML = template;
  document.querySelector('.naboo').appendChild(div);
};

module.exports = RestartDialog;
