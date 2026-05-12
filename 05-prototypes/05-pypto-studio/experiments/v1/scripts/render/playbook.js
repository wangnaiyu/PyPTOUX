/* ===================================================================
 * PyPTO Studio · Playbook engine (left outline + center step viewer)
 * =================================================================== */

window.PlaybookView = (function () {

  function init() {
    renderOutline();
    renderStep();
    document.getElementById('btn-doc-mode').addEventListener('click', toggleDocMode);
    document.addEventListener('step-changed', () => {
      renderOutline();
      renderStep();
    });
  }

  // ---------- left outline ----------
  function renderOutline() {
    const cur = window.SESSION_STATE.currentStep;
    const visited = window.SESSION_STATE.visitedSteps;
    const host = document.getElementById('pb-steps');
    host.innerHTML = '';

    window.PLAYBOOK.steps.forEach(s => {
      const item = document.createElement('div');
      item.className = 'pb-step';
      if (s.n === cur) item.classList.add('current');
      if (visited.includes(s.n) && s.n !== cur) item.classList.add('visited');
      if (s.mode === 'compile') item.classList.add('compile-mode');
      if (s.bridge) item.classList.add('bridge');

      const isVisited = visited.includes(s.n);
      const isCurrent = s.n === cur;
      const marker = isCurrent ? '◀' : (isVisited ? '✓' : '○');
      const markerCls = isCurrent ? 'm-current' : (isVisited ? 'm-ok' : 'm-pending');

      item.innerHTML = `
        <span class="pb-marker ${markerCls}">${marker}</span>
        <span class="pb-n">${s.n}</span>
        <span class="pb-title-text">${s.title}</span>
        ${s.mode === 'compile' ? '<span class="pb-mode-pill compile">⚒</span>' : ''}
        ${s.bridge ? '<span class="pb-bridge-pill">🔗</span>' : ''}
      `;
      item.addEventListener('click', () => {
        if (visited.includes(s.n) || s.n === cur || canJumpAhead(s.n)) {
          goToStep(s.n);
        }
      });
      host.appendChild(item);
    });

    document.getElementById('playbook-progress').textContent = `${cur}/${window.PLAYBOOK.steps.length}`;
  }

  function canJumpAhead(n) {
    // 允许向前跳 1 步（演示用）
    return Math.abs(n - window.SESSION_STATE.currentStep) <= 1;
  }

  // ---------- center step viewer ----------
  function renderStep() {
    const n = window.SESSION_STATE.currentStep;
    const step = window.PLAYBOOK.steps.find(s => s.n === n);
    const host = document.getElementById('step-viewer');
    if (!step) { host.innerHTML = ''; return; }

    const see = step.see;
    const suspect = step.suspect;
    const tryB = step.try;

    host.innerHTML = `
      <div class="step-head">
        <div class="step-num-badge ${step.bridge ? 'bridge' : ''}">${step.n}</div>
        <div class="step-head-text">
          <div class="step-title">${escape(step.title)}</div>
          <div class="step-meta">
            <span class="mono">step ${step.n} / ${window.PLAYBOOK.steps.length}</span>
            <span class="dot-sep">·</span>
            <span>${step.mode === 'compile' ? '⚒ Compile' : '⚡ Runtime'}</span>
            ${step.bridge ? '<span class="dot-sep">·</span><span class="bridge-tag">🔗 跨模式</span>' : ''}
          </div>
        </div>
        <div class="step-head-actions">
          <button class="btn ghost" id="btn-prev-step" ${n === 1 ? 'disabled' : ''}>← 上一步</button>
          <button class="btn ghost" id="btn-doc-toggle"><span class="ico">📄</span>文档版</button>
        </div>
      </div>

      <div class="step-body">

        <section class="step-card see">
          <div class="card-label">看到 <span class="card-x">X</span></div>
          <div class="card-main">
            <div class="see-title">${escape(see.title)}</div>
            <ul class="see-bullets">
              ${(see.bullets || []).map(b => `<li>${b}</li>`).join('')}
            </ul>
            ${renderMetricRow(see.metric)}
            ${see.ir ? renderIrDiff(see.ir) : ''}
          </div>
        </section>

        <section class="step-card suspect">
          <div class="card-label">怀疑 <span class="card-x">Y</span></div>
          <div class="card-main">
            <div class="suspect-text">${suspect.text}</div>
            ${suspect.because ? `<div class="suspect-because"><span class="bk">Because:</span> ${suspect.because}</div>` : ''}
          </div>
        </section>

        <section class="step-card try">
          <div class="card-label">试 <span class="card-x">Z</span></div>
          <div class="card-main">
            <div class="try-text">${tryB.text}</div>
            <button class="try-action ${tryB.emphasis ? 'emphasis' : ''}" id="btn-try-action">
              ${tryB.cta}
            </button>
          </div>
        </section>

        <section class="step-branches">
          <div class="branches-label">下一步</div>
          <div class="branches-list">
            ${(step.branches || []).map((b, i) => `
              <button class="branch ${b.primary ? 'primary' : ''}" data-target="${b.target}" data-index="${i}">
                <span class="b-label">${b.label}</span>
                ${b.note ? `<span class="b-note">${b.note}</span>` : ''}
              </button>
            `).join('')}
          </div>
        </section>
      </div>
    `;

    bindStepHandlers(step);
  }

  function renderMetricRow(metric) {
    if (!metric) return '';
    const cells = Object.entries(metric).map(([k, v]) => `
      <div class="metric-cell">
        <div class="mc-k">${k}</div>
        <div class="mc-v mono">${typeof v === 'number' ? formatNum(v) : escape(String(v))}</div>
      </div>
    `).join('');
    return `<div class="metric-row">${cells}</div>`;
  }

  function renderIrDiff(ir) {
    return `
      <div class="ir-diff">
        <div class="ir-col">
          <div class="ir-col-head ir-bad">▶ before</div>
          <pre class="ir-code mono">${escape(ir.before)}</pre>
        </div>
        <div class="ir-col">
          <div class="ir-col-head ir-ok">▶ after (axis_fusion=on)</div>
          <pre class="ir-code mono">${escape(ir.after)}</pre>
        </div>
      </div>
    `;
  }

  function formatNum(v) {
    if (Number.isInteger(v)) return String(v);
    if (v < 1) return (v * 100).toFixed(0) + '%';
    return v.toString();
  }

  function escape(s) {
    return String(s).replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));
  }

  // ---------- handlers ----------
  function bindStepHandlers(step) {
    const prev = document.getElementById('btn-prev-step');
    if (prev) prev.addEventListener('click', () => {
      if (step.n > 1) goToStep(step.n - 1);
    });

    const docBtn = document.getElementById('btn-doc-toggle');
    if (docBtn) docBtn.addEventListener('click', toggleDocMode);

    const tryBtn = document.getElementById('btn-try-action');
    if (tryBtn) tryBtn.addEventListener('click', () => triggerAction(step.try.action));

    document.querySelectorAll('#step-viewer .branch').forEach(b => {
      b.addEventListener('click', () => {
        const t = b.dataset.target;
        if (t === 'done') {
          // 触发沉淀回路
          window.Modals && window.Modals.openContribute();
          return;
        }
        if (t === 'leave') return;
        const tn = parseInt(t, 10);
        if (!Number.isNaN(tn)) goToStep(tn);
      });
    });
  }

  function triggerAction(action) {
    if (!action) return;
    if (action.kind === 'focus') {
      // 让 swimlane 展开对应 group
      (action.autoExpand || []).forEach(gid => window.Swimlane.expandGroup(gid));
    } else if (action.kind === 'highlight-knob') {
      window.Knobs && window.Knobs.flashKnob(action.knob);
    } else if (action.kind === 'change-knob') {
      window.Knobs && window.Knobs.setKnob(action.knob, action.value, action.triggerRerun);
    } else if (action.kind === 'change-knobs') {
      Object.entries(action.changes).forEach(([k, v]) => window.Knobs.setKnob(k, v));
      if (action.triggerRecompile) window.Knobs.triggerRecompile();
    } else if (action.kind === 'open-ir') {
      // 单独高亮 IR diff 区域（已渲染在 card 内，这里加个滚动）
      const ir = document.querySelector('.ir-diff');
      if (ir) ir.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (action.kind === 'cross-mode') {
      window.Topbar.switchMode(action.to, { animate: true, reason: action.reason });
      // 跨模式动作隐含"进入新模式下的下一步"
      setTimeout(() => {
        const cur = window.SESSION_STATE.currentStep;
        const next = window.PLAYBOOK.steps.find(s => s.n === cur + 1);
        if (next) {
          window.SESSION_STATE.currentStep = next.n;
          if (!window.SESSION_STATE.visitedSteps.includes(next.n)) {
            window.SESSION_STATE.visitedSteps.push(next.n);
          }
          document.dispatchEvent(new CustomEvent('step-changed', { detail: { step: next.n } }));
          if (window.CompileStub) window.CompileStub.update();
        }
      }, 1100);
    } else if (action.kind === 'open-contribute') {
      window.Modals.openContribute();
    }
  }

  function goToStep(n) {
    const step = window.PLAYBOOK.steps.find(s => s.n === n);
    if (!step) return;
    // 如果跳到 compile 模式的 step，触发模式切换
    if (step.mode === 'compile' && document.body.dataset.mode !== 'compile') {
      window.Topbar.switchMode('compile', { animate: true, reason: '进入 Playbook Step ' + n });
      setTimeout(() => applyStep(n), 1000);
    } else if (step.mode === 'runtime' && document.body.dataset.mode !== 'runtime') {
      window.Topbar.switchMode('runtime', { animate: true, reason: '返回 Playbook Step ' + n });
      setTimeout(() => applyStep(n), 1000);
    } else {
      applyStep(n);
    }
  }

  function applyStep(n) {
    window.SESSION_STATE.currentStep = n;
    if (!window.SESSION_STATE.visitedSteps.includes(n)) {
      window.SESSION_STATE.visitedSteps.push(n);
    }
    // 同步 swimlane overlay 标签
    const hl = window.SWIMLANE.highlights[n];
    document.getElementById('swimlane-overlay-label').textContent =
      hl ? 'step ' + n + ' 关注: ' + (hl.label || '') : 'step ' + n;

    document.dispatchEvent(new CustomEvent('step-changed', { detail: { step: n } }));
    if (window.Swimlane) window.Swimlane.refresh();
    if (window.CompileStub) window.CompileStub.update();
  }

  // ---------- doc-mode toggle ----------
  function toggleDocMode() {
    document.body.classList.toggle('doc-mode');
  }

  return { init, goToStep };
})();
