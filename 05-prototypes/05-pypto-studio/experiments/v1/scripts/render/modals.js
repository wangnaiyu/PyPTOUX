/* ===================================================================
 * PyPTO Studio · Modals
 * - 入场: Symptom Fingerprint 匹配 Playbook
 * - 完成: Contribute Back（沉淀回路）
 * - 帮助: 演示路径
 * =================================================================== */

window.Modals = (function () {

  function init() {
    // close handlers
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => close(btn.dataset.close));
    });
    document.querySelectorAll('.modal-backdrop').forEach(bg => {
      bg.addEventListener('click', (e) => {
        if (e.target === bg) close(bg.id);
      });
    });

    document.getElementById('btn-help').addEventListener('click', () => open('modal-help'));

    renderFingerprint();
    renderContribute();
  }

  function ringColor(match) {
    if (match >= 0.7) return 'var(--green)';
    if (match >= 0.5) return 'var(--yellow)';
    return 'var(--red)';
  }

  function open(id) { document.getElementById(id).classList.add('open'); }
  function close(id) { document.getElementById(id).classList.remove('open'); }
  function openFingerprint() { renderFingerprint(); open('modal-fingerprint'); }
  function openContribute() { renderContribute(); open('modal-contribute'); }

  // ---------- Fingerprint modal ----------
  function renderFingerprint() {
    const host = document.getElementById('fingerprint-body');
    const cur = window.FINGERPRINT.current;
    const cands = window.FINGERPRINT.candidates;

    host.innerHTML = `
      <div class="fp-intro">
        检测到当前 session 运行慢（2.3× baseline）。系统从这次 run 的 msprof 切片里抽出
        <b>症状指纹</b>，与团队已沉淀的 Playbook 库做匹配。
      </div>

      <div class="fp-current">
        <div class="fp-section-label">当前指纹 · session #${window.KERNEL.session.replace('#','')}</div>
        <div class="fp-vector">
          <span class="fp-cell"><span class="fp-k">cube_util</span><span class="fp-v warn">28%</span></span>
          <span class="fp-cell"><span class="fp-k">vec_idle</span><span class="fp-v warn">68%</span></span>
          <span class="fp-cell"><span class="fp-k">mix_mode</span><span class="fp-v mono">sequential</span></span>
          <span class="fp-cell"><span class="fp-k">dma_busy</span><span class="fp-v mono muted">normal</span></span>
          <span class="fp-cell"><span class="fp-k">scope_split</span><span class="fp-v bad">true</span></span>
        </div>
      </div>

      <div class="fp-matches">
        <div class="fp-section-label">${cands.length} 个 Playbook 匹配此指纹</div>
        ${cands.map((c, i) => `
          <div class="fp-card ${i === 0 ? 'top' : ''}">
            <div class="fp-card-l">
              <div class="fp-match-ring" style="--p: ${Math.round(c.match*100)}%; background: conic-gradient(${ringColor(c.match)} 0% ${Math.round(c.match*100)}%, var(--bg-elev-3) ${Math.round(c.match*100)}% 100%);">
                <div class="fp-match-pct">${Math.round(c.match*100)}%</div>
              </div>
              ${i === 0 ? '<div class="fp-top-tag">★ TOP</div>' : ''}
            </div>
            <div class="fp-card-m">
              <div class="fp-pb-name">${c.name}</div>
              <div class="fp-pb-author">${c.author} · ${c.team}</div>
              <div class="fp-pb-stats">
                <span><span class="ico">▶</span> ${c.uses} 次走过</span>
                <span class="dot-sep">·</span>
                <span class="ok">${Math.round(c.success*100)}%</span> 成功
                <span class="dot-sep">·</span>
                <span>⌀ ${c.avgMin} min</span>
              </div>
              <div class="fp-explain">
                ${c.matchExplain.map(e => `
                  <div class="fp-ex-row ${e.hit ? 'hit' : 'miss'}">
                    <span class="fp-ex-mark">${e.hit ? '✓' : '·'}</span>
                    <span class="fp-ex-sig mono">${e.signal}</span>
                    ${e.hint ? `<span class="fp-ex-hint">${e.hint}</span>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="fp-card-r">
              ${i === 0
                ? `<button class="btn primary" data-action="start-playbook" data-playbook="${c.playbook}">开始走</button>`
                : `<button class="btn" data-action="preview-playbook">预览</button>`}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="fp-foot">
        <span class="muted">所有 Playbook 都来自团队内部沉淀。完成后可贡献新分支。</span>
        <button class="btn ghost" data-close="modal-fingerprint">稍后</button>
      </div>
    `;

    // bind start
    host.querySelectorAll('[data-action="start-playbook"]').forEach(b => {
      b.addEventListener('click', () => {
        close('modal-fingerprint');
        window.PlaybookView.goToStep(1);
      });
    });
  }

  // ---------- Contribute Back ----------
  function renderContribute() {
    const host = document.getElementById('contribute-body');
    const visited = window.SESSION_STATE.visitedSteps;
    const finalRun = window.KERNEL.runs[window.KERNEL.runs.length - 1];

    host.innerHTML = `
      <div class="ct-intro">
        ✓ 你走完了这条 Playbook · runtime 从 <span class="warn">2.3×</span> 降到
        <span class="ok">1.06×</span> · cube_util 从 <span class="warn">28%</span> 提到 <span class="ok">71%</span>
      </div>

      <div class="ct-section">
        <div class="ct-section-label">你这次走过的路径</div>
        <div class="ct-path">
          ${renderPathTree(visited)}
        </div>
      </div>

      <div class="ct-section">
        <div class="ct-section-label">检测到 2 个偏离原 Playbook 的点</div>

        <div class="ct-deviation">
          <div class="ct-dev-head">
            <span class="ct-dev-tag">Step 3 → 4</span>
            <span class="ct-dev-title">尝试 mix_mode=parallel 被证伪</span>
          </div>
          <div class="ct-dev-body">
            原 Playbook 未预测此分支会失败。<br>
            是否补充"先 mix_mode 不一定有效"的提示？
          </div>
          <textarea class="ct-textarea" placeholder="（可选）为什么这一步会失败 — 用一句话说给下一个工程师听"></textarea>
        </div>

        <div class="ct-deviation new">
          <div class="ct-dev-head">
            <span class="ct-dev-tag new">★ 新分支</span>
            <span class="ct-dev-title">axis_fusion=on + stitch_mode=concat 组合</span>
          </div>
          <div class="ct-dev-body">
            原 Playbook 不知道这个组合 · 这是你这次的关键发现 · 通过 OoOSchedule 验证。<br>
            合并进 Playbook 后，下一个匹配到相同指纹的工程师可以直接走到 Step 6。
          </div>
          <label class="ct-check">
            <input type="checkbox" checked> 把这条新分支补充进 Playbook · 通知作者 @张明 审核
          </label>
        </div>
      </div>

      <div class="ct-section">
        <div class="ct-section-label">沉淀 (症状指纹 → 处方) 到索引库</div>
        <div class="ct-prescription">
          <div class="ct-pres-row">
            <span class="ct-pres-k">指纹</span>
            <span class="ct-pres-v mono">cube_util &lt; 0.40 · vec_idle &gt; 0.50 · scope_split=true · axis_fusion=off</span>
          </div>
          <div class="ct-pres-row">
            <span class="ct-pres-k">→ 处方</span>
            <span class="ct-pres-v mono">axis_fusion=on + stitch_mode=concat</span>
          </div>
          <label class="ct-check">
            <input type="checkbox" checked> 加入索引 · 下次匹配到同指纹时可直接推荐
          </label>
        </div>
      </div>

      <div class="ct-foot">
        <button class="btn ghost" data-close="modal-contribute">仅保存</button>
        <button class="btn primary" id="btn-ct-submit">⤴ 提交贡献</button>
      </div>
    `;

    document.getElementById('btn-ct-submit').addEventListener('click', () => {
      // 模拟提交成功
      host.innerHTML = `
        <div class="ct-success">
          <div class="ct-success-icon">✓</div>
          <div class="ct-success-title">已提交 · 等待 @张明 审核</div>
          <div class="ct-success-sub">
            合并后 Playbook 名为 "Mix 流水阻塞 v2"，下一个匹配到相同指纹的工程师将看到你贡献的分支。<br>
            <span class="muted">PR-style review · 预计 24h 内反馈</span>
          </div>
          <button class="btn primary" data-close="modal-contribute" style="margin-top:18px">完成</button>
        </div>
      `;
      host.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => close('modal-contribute'));
      });
    });
  }

  function renderPathTree(visited) {
    // 简洁可视化：planned vs actual
    const steps = window.PLAYBOOK.steps;
    return `
      <div class="path-grid">
        ${steps.map(s => {
          const visitedHere = visited.includes(s.n);
          const cls = visitedHere ? (s.bridge ? 'bridge' : 'visited') : 'skipped';
          return `
            <div class="path-node ${cls}">
              <div class="pn-num">${s.n}</div>
              <div class="pn-title">${s.title}</div>
              ${s.bridge && visitedHere ? '<div class="pn-tag">🔗 跨模式</div>' : ''}
              ${s.n === 4 && visitedHere ? '<div class="pn-tag warn">假设证伪</div>' : ''}
              ${s.n === 6 && visitedHere ? '<div class="pn-tag ok">★ 新分支</div>' : ''}
            </div>
            ${s.n < steps.length ? '<div class="path-arrow">→</div>' : ''}
          `;
        }).join('')}
      </div>
    `;
  }

  return { init, open, close, openFingerprint, openContribute };
})();
