/* ===================================================================
 * PyPTO Studio · Topbar · Mode switch + cross-mode jump
 * =================================================================== */

window.Topbar = (function () {

  function switchMode(target, opts) {
    const reason = (opts && opts.reason) || '';
    const current = document.body.dataset.mode;
    if (current === target) return;

    // 显示跨模式跳转动画
    if (opts && opts.animate !== false) {
      const layer = document.getElementById('mode-transition');
      const card = layer.querySelector('.mt-card');
      const fromEl = card.querySelector('.mt-from');
      const toEl = card.querySelector('.mt-to');
      const rsEl = document.getElementById('mt-reason');
      const labels = {
        compile: 'Compile · Pass Tracer',
        runtime: 'Runtime · Perf Playbook',
      };
      fromEl.textContent = labels[current];
      toEl.textContent = labels[target];
      rsEl.textContent = reason ? '理由: ' + reason : '';

      layer.classList.add('open');
      setTimeout(() => {
        applyMode(target);
        setTimeout(() => layer.classList.remove('open'), 280);
      }, 720);
    } else {
      applyMode(target);
    }
  }

  function applyMode(target) {
    document.body.dataset.mode = target;
    window.SESSION_STATE.mode = target;
    document.querySelectorAll('.mode-switch .mode').forEach(m => {
      m.classList.toggle('active', m.dataset.modeTarget === target);
    });
    // notify other renderers
    document.dispatchEvent(new CustomEvent('mode-changed', { detail: { mode: target } }));
  }

  function init() {
    document.querySelectorAll('.mode-switch .mode').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.modeTarget;
        switchMode(t, { animate: true, reason: '手动切换' });
      });
    });
  }

  return { init, switchMode, applyMode };
})();
