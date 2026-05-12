// Immediate Attention panel (left)

import { state, setState } from '../state.js';
import { LANES, WRAPS, TASKS, TASKS_BY_LANE } from '../data/tasks.js';
import { getGroup } from '../groups/registry.js';
import { COUNTER_META } from '../data/hw-map.js';
import { scrollToTask } from './swimlane.js';

export function renderSummary() {
  const el = document.getElementById('summary-panel');
  const group = getGroup(state.groupId);
  if (!group || !group.sampled || !group.impl) {
    el.innerHTML = renderUnsampled(group);
    return;
  }
  const impl = group.impl;
  const summary = impl.summarize({ LANES, WRAPS, TASKS, TASKS_BY_LANE });
  const criticalLane = LANES.find(l => l.id === summary.criticalLaneId);

  // pick the worst wrap as "the headline"
  const headWrap = summary.topWraps[0];
  const headStatus = headWrap?.status || 'accounted';
  // dominant counter reflects the headline wrap (more actionable than overall vote)
  const headDominant = headWrap?.dominantCounter || summary.overallDominant;
  const dom = headDominant ? COUNTER_META[headDominant] : null;

  const ratioPct = (summary.explainRatio * 100).toFixed(0);
  const ratioClass = summary.explainRatio < 0.7 ? 'is-bad' : summary.explainRatio < 0.9 ? 'is-warn' : 'is-ok';

  const next = headWrap ? impl.suggestNextGroup(headWrap.critical, headWrap.criticalDerived) : null;

  el.innerHTML = `
    <div class="panel-head">
      <div class="panel-title">Immediate Attention</div>
      <div class="panel-headline">${impl.shortTitle}</div>
      <div class="sum-row" style="margin-top:8px;">
        <span class="k">explain ratio</span>
        <span class="v"><span class="dp-chip ${ratioClass}"><span class="k">clc/total</span><span class="v">${ratioPct}%</span></span></span>
      </div>
    </div>

    <div class="panel-body">

      <div class="sum-card is-critical">
        <div class="sum-eyebrow"><span class="dot"></span>Critical lane</div>
        <div class="sum-title">${criticalLane?.label || '—'}</div>
        <div class="sum-desc">在 24 个 Wrap 中，该 lane 出现在 critical path 的累计 severity 最高。</div>
      </div>

      <div class="sum-card is-${headStatus === 'wait' ? 'wait' : headStatus === 'overlap' ? 'overlap' : 'critical'}">
        <div class="sum-eyebrow"><span class="dot"></span>Critical Wrap · top suspect</div>
        <div class="sum-title">Wrap ${headWrap?.wrapIndex || '—'} <span class="muted mono" style="font-weight:400;font-size:11px;">${headWrap?.status || ''}</span></div>
        <div class="sum-desc">${describeWrap(headWrap)}</div>
        <div class="sum-action">
          <button class="btn primary" id="sum-focus-head">查看 critical task</button>
        </div>
      </div>

      <div class="sum-card">
        <div class="sum-eyebrow"><span class="dot" style="background:var(--c-mte2)"></span>Dominant counter · Wrap ${headWrap?.wrapIndex || '—'}</div>
        <div class="sum-title mono">${headDominant || '—'}</div>
        <div class="sum-desc">${dom?.explain || ''}</div>
        <div class="sum-row"><span class="k">硬件路径</span><span class="v">${dom?.pipe || '—'}</span></div>
      </div>

      <div>
        <div class="dp-section-title">Top-3 Wraps · by severity</div>
        <ul class="wrap-rank-list" id="wrap-rank-list">
          ${summary.topWraps.map(w => {
            const gap = w.criticalDerived?.gapRatio || 0;
            const r = (gap * 100).toFixed(0);
            const absGap = Math.abs(gap);
            const cls = absGap > 0.30 ? 'high' : absGap > 0.15 ? 'mid' : 'low';
            const sign = gap > 0 ? '+' : '';
            return `<li data-wrap-id="${w.wrapId}" data-task-id="${w.critical.id}">
              <span class="wr-name">W${w.wrapIndex}</span>
              <span class="wr-counter">${w.dominantCounter || '—'}</span>
              <span class="wr-ratio ${cls}">${sign}${r}%</span>
            </li>`;
          }).join('')}
        </ul>
      </div>

      ${next ? `
      <div class="next-suggest">
        <div class="next-suggest-eyebrow">下一次采集建议</div>
        <div class="next-suggest-text">当前 group 解释度 <b class="mono">${ratioPct}%</b>。${next.reason}。</div>
        <div class="next-suggest-cmd">
          <span class="cmd">${next.cmd}</span>
          <button class="copy" id="sum-copy-cmd">复制</button>
        </div>
      </div>` : ''}
    </div>
  `;

  // bindings
  const focusBtn = el.querySelector('#sum-focus-head');
  if (focusBtn && headWrap) {
    focusBtn.addEventListener('click', () => {
      setState({ selectedTaskId: headWrap.critical.id });
      scrollToTask(headWrap.critical.id);
    });
  }
  el.querySelectorAll('#wrap-rank-list li').forEach(li => {
    li.addEventListener('click', () => {
      const tid = li.dataset.taskId;
      setState({ selectedTaskId: tid });
      scrollToTask(tid);
    });
  });
  const copyBtn = el.querySelector('#sum-copy-cmd');
  if (copyBtn && next) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(next.cmd);
      toast(`已复制：${next.cmd}`);
    });
  }
}

function describeWrap(w) {
  if (!w) return '';
  const d = w.criticalDerived;
  if (!d) return '';
  if (d.status === 'wait') {
    return `clc <b>${d.clcCycle.toFixed(0)} µs</b> &lt; total <b>${w.critical.totalCycle.toFixed(0)} µs</b>，gap=${(d.gapRatio*100).toFixed(0)}%；可能是 uncovered / wait / idle / sync。`;
  }
  if (d.status === 'overlap') {
    return `clc <b>${d.clcCycle.toFixed(0)} µs</b> &gt; total <b>${w.critical.totalCycle.toFixed(0)} µs</b>；可能是 pipeline overlap 或 non-exclusive double-count，不能直接判断为更好。`;
  }
  return `clc ≈ total，当前 group 解释充分。dominant 仍可指引下一步。`;
}

function renderUnsampled(group) {
  return `
    <div class="panel-head">
      <div class="panel-title">Immediate Attention</div>
      <div class="panel-headline">${group?.title || 'Unknown'}</div>
    </div>
    <div class="panel-body">
      <div class="sum-card is-suggestion">
        <div class="sum-eyebrow"><span class="dot"></span>本次 run 未采集 group ${group?.id}</div>
        <div class="sum-title">无本 group 数据</div>
        <div class="sum-desc">一次运行只能采集一个 PMU group。若需要 group ${group?.id} 的诊断，请重新运行并设置对应环境变量。</div>
      </div>
      <div class="next-suggest">
        <div class="next-suggest-eyebrow">下一次采集</div>
        <div class="next-suggest-text">设置环境变量后重新启动 trace。</div>
        <div class="next-suggest-cmd">
          <span class="cmd">PROF_PMU_EVENT_TYPE=${group?.id}</span>
          <button class="copy" onclick="navigator.clipboard.writeText('PROF_PMU_EVENT_TYPE=${group?.id}')">复制</button>
        </div>
      </div>
      <div class="sum-card">
        <div class="sum-eyebrow"><span class="dot" style="background:var(--green)"></span>当前已采集</div>
        <div class="sum-title mono">Group 2 · Pipeline Balance</div>
        <div class="sum-desc">切回 G2 即可继续诊断。</div>
        <div class="sum-action"><button class="btn primary" onclick="window.__switchG2()">切到 G2</button></div>
      </div>
    </div>
  `;
}

function toast(text) {
  const root = document.getElementById('toast-root');
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  root.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}
