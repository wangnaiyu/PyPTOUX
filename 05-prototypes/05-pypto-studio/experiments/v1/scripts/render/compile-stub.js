/* ===================================================================
 * PyPTO Studio · Compile mode (Pass Tracer) lightweight stub
 * 不重做 V4 的 3500 行 — 只保留跨模式跳转所需的最小视图:
 *   - 来自 Playbook 的上下文条
 *   - 简化 Pass 时间轴（AxisFusion 标红）
 *   - AxisFusion IR Diff 卡片
 *   - "应用 axis_fusion=on + stitch_mode=concat" CTA → 回 Runtime Step 7
 * =================================================================== */

window.CompileStub = (function () {

  const PASSES = [
    { stage: 'Frontend',   name: 'Parse',           status: 'ok',   ms: 12 },
    { stage: 'Frontend',   name: 'TypeInfer',       status: 'ok',   ms: 8 },
    { stage: 'Frontend',   name: 'AutoDiff',        status: 'ok',   ms: 24 },
    { stage: 'Graph Opt',  name: 'ConstFold',       status: 'ok',   ms: 6 },
    { stage: 'Graph Opt',  name: 'DeadCodeElim',    status: 'ok',   ms: 4 },
    { stage: 'Graph Opt',  name: 'AxisFusion',      status: 'skip', ms: 0, focus: true,
                           note: '被关闭（axis_fusion=off）— 当时炸在 OoOSchedule' },
    { stage: 'Graph Opt',  name: 'LoopUnroll',      status: 'ok',   ms: 18 },
    { stage: 'Mix Pipe',   name: 'MixSchedule',     status: 'ok',   ms: 22 },
    { stage: 'Mix Pipe',   name: 'OoOSchedule',     status: 'ok',   ms: 14 },
    { stage: 'Mix Pipe',   name: 'StitchFusion',    status: 'skip', ms: 0,
                           note: '未触发（stitch_mode=none）' },
    { stage: 'Codegen',    name: 'BlockTiling',     status: 'ok',   ms: 32 },
    { stage: 'Codegen',    name: 'RegAlloc',        status: 'ok',   ms: 28 },
    { stage: 'Codegen',    name: 'EmitAssembly',    status: 'ok',   ms: 16 },
  ];

  function init() {
    render();
  }

  function update() { render(); }

  function render() {
    const host = document.getElementById('compile-stub');
    if (!host) return;
    const fromPlaybook = window.SESSION_STATE.currentStep === 6 || window.SESSION_STATE.currentStep === 5;

    host.innerHTML = `
      ${fromPlaybook ? `
        <div class="cs-context-banner">
          <span class="ico">🔗</span>
          <div class="csb-text">
            <div class="csb-title">从 Playbook Step 5 跳过来 · 查 AxisFusion 当时为何被禁</div>
            <div class="csb-sub">这是同一个 session (#c4a7e21) — 旋钮状态实时同步</div>
          </div>
          <button class="btn ghost" id="btn-cs-back">← 返回 Runtime · Playbook</button>
        </div>
      ` : ''}

      <div class="cs-grid">
        <!-- left: Pass timeline -->
        <aside class="cs-passes">
          <div class="cs-panel-head">
            <div class="panel-title">Pass 时间轴</div>
            <div class="panel-meta mono">${PASSES.filter(p => p.status==='ok').length} ✓ · ${PASSES.filter(p => p.status==='skip').length} ⊘</div>
          </div>
          <div class="cs-pass-list">
            ${renderPassList()}
          </div>
        </aside>

        <!-- center: focused Pass detail -->
        <section class="cs-detail">
          <div class="cs-panel-head">
            <div class="panel-title">AxisFusion · 决策详情</div>
            <div class="cs-pill warn">⊘ skipped · axis_fusion=off</div>
          </div>
          <div class="cs-detail-body">
            <div class="cs-card-diagnose">
              <div class="cd-row"><span class="cd-k">现象</span><span class="cd-v">AxisFusion Pass 被跳过（旋钮关闭）。</span></div>
              <div class="cd-row"><span class="cd-k">原因</span><span class="cd-v">第一幕：开启 axis_fusion 时，下游 OoOSchedule 排不开 mixed scope → 编译失败。</span></div>
              <div class="cd-row"><span class="cd-k">后果</span><span class="cd-v">cube/vec scope 未合并 → 运行期被强制串行 → Playbook Step 1-4 观察到的"cube 利用率 28%"。</span></div>
            </div>

            <div class="cs-ir-diff">
              <div class="cs-ir-col">
                <div class="cs-ir-head bad">当前 (axis_fusion=off)</div>
<pre class="cs-ir mono">scope cube_scope {
  %0 = matmul(%a, %b)
  yield %0
}
scope vec_scope {
  %1 = softmax(%0)
  yield %1
}</pre>
              </div>
              <div class="cs-ir-col">
                <div class="cs-ir-head ok">建议 (axis_fusion=on + stitch_mode=concat)</div>
<pre class="cs-ir mono">scope mixed_scope {
  %0 = matmul(%a, %b)
  <span class="hl">// stitch barrier (concat)</span>
  %1 = softmax(%0)
  yield %1
}</pre>
              </div>
            </div>

            <div class="cs-suspect">
              <div class="cs-suspect-head">Suspect Ranking · 嫌疑开关排序</div>
              <div class="cs-suspect-list">
                <div class="cs-suspect-row primary">
                  <span class="csr-pct">87%</span>
                  <span class="csr-knob mono">axis_fusion</span>
                  <span class="csr-hint">关掉后藏了 scope 不合的性能债</span>
                  <button class="csr-action">打开</button>
                </div>
                <div class="cs-suspect-row">
                  <span class="csr-pct">52%</span>
                  <span class="csr-knob mono">stitch_mode</span>
                  <span class="csr-hint">设 concat 可绕过 OoOSchedule 限制</span>
                  <button class="csr-action">设 concat</button>
                </div>
                <div class="cs-suspect-row">
                  <span class="csr-pct">12%</span>
                  <span class="csr-knob mono">unroll</span>
                  <span class="csr-hint">影响有限</span>
                </div>
              </div>
            </div>

            ${fromPlaybook ? `
              <div class="cs-apply-cta">
                <div class="cs-cta-text">
                  <div class="cs-cta-title">推荐组合 · axis_fusion = on + stitch_mode = concat</div>
                  <div class="cs-cta-sub">这是 Playbook Step 6 的 "试 Z" — 应用后会重新编译并回到 Runtime 验收</div>
                </div>
                <button class="btn primary" id="btn-cs-apply">应用并重新编译 →</button>
              </div>
            ` : ''}
          </div>
        </section>
      </div>
    `;

    // bindings
    const back = document.getElementById('btn-cs-back');
    if (back) back.addEventListener('click', () => {
      window.Topbar.switchMode('runtime', { animate: true, reason: '返回 Playbook' });
    });
    const apply = document.getElementById('btn-cs-apply');
    if (apply) apply.addEventListener('click', () => {
      // 应用旋钮变更
      window.Knobs.setKnob('enable_axis_fusion', 'on');
      window.Knobs.setKnob('stitch_mode', 'concat', true);
      window.Knobs.triggerRecompile();
      // 推进到 Step 7
      setTimeout(() => {
        window.PlaybookView.goToStep(7);
      }, 1100);
    });
  }

  function renderPassList() {
    let html = '';
    let lastStage = '';
    PASSES.forEach((p, i) => {
      if (p.stage !== lastStage) {
        html += `<div class="cs-stage-head">${p.stage}</div>`;
        lastStage = p.stage;
      }
      const cls = p.status === 'skip' ? 'skip' : 'ok';
      const focusCls = p.focus ? ' focus' : '';
      html += `
        <div class="cs-pass-item ${cls}${focusCls}">
          <span class="cspi-mark">${p.status === 'ok' ? '✓' : '⊘'}</span>
          <span class="cspi-name mono">${p.name}</span>
          <span class="cspi-ms mono">${p.ms ? p.ms + 'ms' : '—'}</span>
          ${p.note ? `<div class="cspi-note">${p.note}</div>` : ''}
        </div>
      `;
    });
    return html;
  }

  return { init, update };
})();
