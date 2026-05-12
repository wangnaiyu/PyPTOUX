/* ===================================================================
 * PyPTO Studio · Bottom bar · Knobs + Experiment compare
 * 旋钮跨模式共享（同 session 的 single source of truth）
 * =================================================================== */

window.Knobs = (function () {

  function init() {
    renderKnobs();
    renderExpTable();
  }

  // ---------- knobs ----------
  function renderKnobs() {
    const row = document.getElementById('knob-row');
    row.innerHTML = '';
    window.KERNEL.knobs.forEach(k => {
      const el = document.createElement('div');
      el.className = 'knob' + (k.hot ? ' hot' : '');
      el.dataset.id = k.id;

      let control;
      if (k.type === 'toggle') {
        control = `
          <button class="knob-toggle ${k.value === 'on' ? 'on' : 'off'}" data-action="toggle">
            <span class="knob-toggle-track"><span class="knob-toggle-dot"></span></span>
            <span class="knob-toggle-label">${k.value}</span>
          </button>
        `;
      } else if (k.type === 'select') {
        control = `
          <div class="knob-pills">
            ${k.values.map(v => `<button class="knob-pill ${v === k.value ? 'active' : ''}" data-action="set" data-value="${v}">${v}</button>`).join('')}
          </div>
        `;
      } else {
        control = `
          <div class="knob-number">
            <span class="knob-num-val mono">${k.value}</span>
            <span class="knob-num-hint">${k.values[0]}–${k.values[k.values.length - 1]}</span>
          </div>
        `;
      }

      el.innerHTML = `
        <div class="knob-head">
          <span class="knob-label mono">${k.label}</span>
          ${k.hot ? '<span class="knob-hot-pill">hot</span>' : ''}
        </div>
        <div class="knob-body">${control}</div>
        <div class="knob-foot">
          <div class="knob-from">来历: ${k.from}</div>
          <div class="knob-affects">
            <span class="aff-c">⚒ ${k.affects.compile}</span>
            <span class="aff-r">⚡ ${k.affects.runtime}</span>
          </div>
        </div>
      `;
      row.appendChild(el);

      // bind
      el.querySelectorAll('[data-action="toggle"]').forEach(btn => {
        btn.addEventListener('click', () => {
          setKnob(k.id, k.value === 'on' ? 'off' : 'on');
        });
      });
      el.querySelectorAll('[data-action="set"]').forEach(btn => {
        btn.addEventListener('click', () => {
          setKnob(k.id, btn.dataset.value);
        });
      });
    });
  }

  function setKnob(id, value, triggerRerun) {
    const k = window.KERNEL.knobs.find(x => x.id === id);
    if (!k) return;
    if (k.value === value) {
      flashKnob(id);
      return;
    }
    k.value = value;
    renderKnobs();
    flashKnob(id);
    // 在底部 hint 提示"是否回到 Compile 模式重新走 Pass 路径"
    showCrossModeHint(id);
    if (triggerRerun) {
      addExpRun({ knobChanged: id, value });
    }
  }

  function flashKnob(id) {
    const el = document.querySelector(`.knob[data-id="${id}"]`);
    if (!el) return;
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 1400);
  }

  function showCrossModeHint(knobId) {
    const hint = document.querySelector('.bb-section.knobs .bb-hint');
    if (!hint) return;
    hint.classList.add('alert');
    hint.dataset._orig = hint.dataset._orig || hint.textContent;
    hint.textContent = `⚠ ${knobId} 改动会同时影响编译期决策 — 建议跳回 Compile 模式重新走 Pass 路径`;
    clearTimeout(hint._t);
    hint._t = setTimeout(() => {
      hint.classList.remove('alert');
      hint.textContent = hint.dataset._orig;
    }, 4200);
  }

  function triggerRecompile() {
    addExpRun({ knobChanged: 'multi', value: 'recompile' });
    // 假装编译成功
    const hp = document.querySelector('.health-pill');
    if (hp) {
      hp.classList.add('flash');
      setTimeout(() => hp.classList.remove('flash'), 1600);
    }
  }

  // ---------- experiment table ----------
  function renderExpTable() {
    const host = document.getElementById('exp-table');
    if (!host) return;
    host.innerHTML = `
      <table class="et">
        <thead>
          <tr>
            <th>#</th>
            <th>axis</th>
            <th>mix</th>
            <th>stitch</th>
            <th>compile</th>
            <th>runtime</th>
            <th>cube%</th>
            <th>note</th>
          </tr>
        </thead>
        <tbody id="et-body"></tbody>
      </table>
    `;
    refreshExpTable();
  }

  function refreshExpTable() {
    const tb = document.getElementById('et-body');
    if (!tb) return;
    tb.innerHTML = '';
    window.KERNEL.runs.forEach(r => {
      const tr = document.createElement('tr');
      if (r.current) tr.classList.add('current');
      const compileCell = r.compile === 'ok'
        ? '<span class="ok">✓</span>'
        : `<span class="bad" title="${r.compileError || ''}">✗</span>`;
      const runtimeCell = r.runtime
        ? (r.runtime.speedup > 1.5 ? `<span class="warn">${r.runtime.speedup}×</span>`
            : `<span class="ok">${r.runtime.speedup}×</span>`)
        : '<span class="muted">—</span>';
      const cubeCell = r.runtime
        ? (r.runtime.cubeUtil >= 0.6 ? `<span class="ok">${Math.round(r.runtime.cubeUtil*100)}%</span>`
            : `<span class="warn">${Math.round(r.runtime.cubeUtil*100)}%</span>`)
        : '<span class="muted">—</span>';
      tr.innerHTML = `
        <td class="mono">${r.seq}</td>
        <td class="mono">${r.knobs.axis_fusion}</td>
        <td class="mono">${r.knobs.mix_mode}</td>
        <td class="mono">${r.knobs.stitch_mode}</td>
        <td>${compileCell}</td>
        <td>${runtimeCell}</td>
        <td>${cubeCell}</td>
        <td class="et-note">${r.note || ''}</td>
      `;
      tb.appendChild(tr);
    });
  }

  function addExpRun(meta) {
    const last = window.KERNEL.runs[window.KERNEL.runs.length - 1];
    last.current = false;
    const seq = last.seq + 1;
    const knobs = {};
    window.KERNEL.knobs.forEach(k => {
      knobs[k.id.replace('enable_', '')] = k.value;
    });
    // 简化映射
    const newRun = {
      id: 'run' + seq,
      seq,
      knobs: {
        axis_fusion: knobs.axis_fusion || 'off',
        unroll: knobs.unroll || 'on',
        mix_mode: knobs.mix_mode || 'sequential',
        stitch_mode: knobs.stitch_mode || 'none',
        block_dim: knobs.block_dim || 24,
      },
      compile: 'ok',
      runtime: speculateRuntime(knobs),
      current: true,
      note: meta && meta.knobChanged ? `改 ${meta.knobChanged}` : '',
    };
    window.KERNEL.runs.push(newRun);
    refreshExpTable();
  }

  function speculateRuntime(knobs) {
    // 根据组合估算（demo 用）
    const axis = knobs.axis_fusion;
    const mix = knobs.mix_mode;
    const stitch = knobs.stitch_mode;
    if (axis === 'on' && stitch === 'concat') return { speedup: 1.06, cubeUtil: 0.71 };
    if (mix === 'parallel' && axis === 'off') return { speedup: 1.92, cubeUtil: 0.36 };
    if (mix === 'pipelined') return { speedup: 1.70, cubeUtil: 0.42 };
    return { speedup: 2.3, cubeUtil: 0.28 };
  }

  return { init, setKnob, flashKnob, triggerRecompile, addExpRun, refreshExpTable };
})();
