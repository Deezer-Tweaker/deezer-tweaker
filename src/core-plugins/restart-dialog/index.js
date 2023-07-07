const RestartDialog = () => {
  const div = document.createElement('div');
  div.classList.add('modal');
  div.setAttribute('role', 'dialog');
  div.setAttribute('aria-hidden', 'false');
  const template = `
  <div class="modal-backdrop" style="opacity: 0.8;"></div>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-conversion">
        <h3 class="heading-3">Restart Deezer to apply plugins</h3>
        <div>
          <button onclick="${require('../../../utils/app').relaunch.toString().replace('module.exports.kill', require('../../../utils/app').kill.toString)}">Restart now</button>
          <button onclick="this.remove()">Restart later</button>
        </div>
      </div>
    </div>
  </div>`;
  div.innerHTML = template;
  document.querySelector('.naboo').appendChild(div);
};
