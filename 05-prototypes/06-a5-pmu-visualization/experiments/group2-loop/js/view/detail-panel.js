// Right-side Detail Panel.
// Conclusion-first → counter breakdown → hardware path → peer task → 6 jump actions.

import { state, setState } from '../state.js';
import { LANES, WRAPS, TASKS, TASKS_BY_ID, TASKS_BY_LANE } from '../data/tasks.js';
import { getGroup } from '../groups/registry.js';
import { COUNTER_META, EVENT_COUNTERS } from '../data/hw-map.js';
import { openModal } from '../jump/modal.js';
import { scrollToTask } from './swimlane.js';

export function renderDetail() {
  const el = document.getElementById('detail-panel');
  const task = state.selectedTaskId ? TASKS_BY_ID[state.selectedTaskId] : null;
  if (!task) {
    el.innerHTML = `
      <div class="panel-head">
        <div class="panel-title">Detail</div>
        <div class="panel-headline muted">未选中 task</div>
      </div>
      <div class="dp-empty">
        <span class="ico">◐</span>
        <div>点击泳道上的 task，或从左侧 critical Wrap 列表跳入。</div>
      </div>
    `;
    return;
  }

  const group = getGroup(state.groupId)?.impl;
  const derived = (task.g2 && group) ? group.derive(task) : null;
  const peers = group ? group.findPeers(task, TASKS_BY_LANE, WRAPS) : [];
  const dominantMeta = derived?.dominantCounter ? COUNTER_META[derived.dominantCounter] : null;
  const next = derived ? group.suggestNextGroup(task, derived) : null;

  el.innerHTML = `
    <div class="panel-head">
      <div class="panel-title">Detail · ${task.laneKind} ${task.wrapId ? '· ' + task.wrapId : ''}</div>
      <div class="panel-headline mono">${task.opName}</div>
      <div class="dp-derived" style="margin-top:6px;">
        <span class="dp-chip"><span class="k">total</span><span class="v">${task.totalCycle.toFixed(0)} µs</span></span>
        ${derived ? `<span class="dp-chip"><span class="k">clc</span><span class="v">${derived.clcCycle.toFixed(0)} µs</span></span>` : ''}
        ${derived ? renderGapChip(derived) : ''}
      </div>
    </div>

    <div class="panel-body">
      ${derived ? renderConclusion(task, derived, dominantMeta, peers) : renderNoPmuConclusion(task)}

      ${derived ? renderCounterBreakdown(task, derived, group) : ''}

      ${dominantMeta ? `
        <div class="dp-section">
          <div class="dp-section-title">Hardware path · dominant</div>
          <div class="hw-summary">
            ${dominantMeta.explain} 对应硬件路径：<span class="hw-pipe">${dominantMeta.pipe}</span>。
          </div>
        </div>
      ` : ''}

      ${peers.length > 0 ? `
        <div class="dp-section">
          <div class="dp-section-title">Peer tasks · 同 Wrap</div>
          <div class="peer-list" id="peer-list">
            ${peers.map(p => renderPeerRow(p, task, group)).join('')}
          </div>
        </div>
      ` : ''}

      <div class="dp-section">
        <div class="dp-section-title">Jump · 一跳定位</div>
        <div class="dp-jumps">
          <button class="dp-jump-btn" data-jump="source"><span class="dp-jump-ico">{ }</span><span class="dp-jump-meta"><span class="dp-jump-name">源码</span><span class="dp-jump-sub">${task.traceLinks.source.path}:${task.traceLinks.source.hotLine}</span></span></button>
          <button class="dp-jump-btn" data-jump="call"><span class="dp-jump-ico">CL</span><span class="dp-jump-meta"><span class="dp-jump-name">CALL</span><span class="dp-jump-sub">${task.traceLinks.callOpMagic}</span></span></button>
          <button class="dp-jump-btn" data-jump="blockgraph"><span class="dp-jump-ico">BG</span><span class="dp-jump-meta"><span class="dp-jump-name">Block Graph</span><span class="dp-jump-sub">leaf ${task.traceLinks.leafHash.slice(0, 14)}…</span></span></button>
          <button class="dp-jump-btn" data-jump="hw" ${dominantMeta ? '' : 'disabled'}><span class="dp-jump-ico">HW</span><span class="dp-jump-meta"><span class="dp-jump-name">硬件路径</span><span class="dp-jump-sub">${dominantMeta ? dominantMeta.pipe : '需要 group 2 数据'}</span></span></button>
          <button class="dp-jump-btn" data-jump="peer" ${peers.length > 0 ? '' : 'disabled'}><span class="dp-jump-ico">PR</span><span class="dp-jump-meta"><span class="dp-jump-name">Peer 视图</span><span class="dp-jump-sub">${state.mixMode ? '已开启 Mix' : '建议开启 Mix 模式'}</span></span></button>
          <button class="dp-jump-btn" data-jump="next" ${next ? '' : 'disabled'}><span class="dp-jump-ico">▶︎</span><span class="dp-jump-meta"><span class="dp-jump-name">下次采集</span><span class="dp-jump-sub">${next ? 'Group ' + next.group : '—'}</span></span></button>
        </div>
      </div>

      ${next ? `
        <div class="next-suggest">
          <div class="next-suggest-eyebrow">下一次采集建议</div>
          <div class="next-suggest-text">${next.reason}。</div>
          <div class="next-suggest-cmd">
            <span class="cmd">${next.cmd}</span>
            <button class="copy" id="dp-copy-cmd">复制</button>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  attachDetailEvents(task, derived, dominantMeta, peers, next);
}

function renderGapChip(d) {
  const cls = d.status === 'wait' ? 'is-bad' : d.status === 'overlap' ? 'is-warn' : 'is-ok';
  const sign = d.gap >= 0 ? '+' : '';
  return `<span class="dp-chip ${cls}"><span class="k">gap</span><span class="v">${sign}${d.gap.toFixed(0)} µs · ${(d.gapRatio * 100).toFixed(1)}%</span></span>`;
}

function renderConclusion(task, d, dominantMeta, peers) {
  let badge, lead, body;
  if (d.status === 'wait') {
    badge = '<span class="dp-conclusion-badge wait">Wait suspect</span>';
    lead = `<b class="mono">clc=${d.clcCycle.toFixed(0)} µs</b> &lt; <b class="mono">total=${task.totalCycle.toFixed(0)} µs</b>，gap_ratio = <b>${(d.gapRatio*100).toFixed(1)}%</b>。`;
    body = `当前 group 的 cycle-like counter 只解释了 task 生命周期的 ${(d.clcCycle/task.totalCycle*100).toFixed(0)}%。Dominant 指向 <b class="mono">${d.dominantCounter}</b>（${dominantMeta?.pipe}），但仍有显著未解释时间 — 疑似 <b>uncovered / wait / idle / sync / 未统计 stall</b>。`;
  } else if (d.status === 'overlap') {
    badge = '<span class="dp-conclusion-badge overlap">Overlap suspect</span>';
    lead = `<b class="mono">clc=${d.clcCycle.toFixed(0)} µs</b> &gt; <b class="mono">total=${task.totalCycle.toFixed(0)} µs</b>，overflow = <b>${(d.gapRatio*100).toFixed(1)}%</b>。`;
    body = `cycle-like 求和超过 total。可能是 <b>pipeline overlap</b>（pipe 间并行），也可能是 <b>non-exclusive counter double-count</b>。<b style="color:var(--yellow)">不能直接表述为"更好"</b>，需结合 dominant counter 与 peer task 判断。`;
  } else {
    badge = '<span class="dp-conclusion-badge accounted">Accounted</span>';
    lead = `<b class="mono">clc ≈ total</b>，PMU pipeline 解释充分。`;
    body = `Dominant <b class="mono">${d.dominantCounter}</b>（${dominantMeta?.pipe}）。可继续追溯硬件路径或对比 peer task。`;
  }
  const peerHint = peers.length > 1 && !state.mixMode
    ? `<div style="margin-top:8px;color:var(--text-tertiary);font-size:11px;">提示：开启 <b>Mix 模式</b> 可看到同 Wrap C / V peer 的开始 / 结束 / 拖尾关系。</div>` : '';
  return `<div class="dp-section">
    <div class="dp-conclusion is-${d.status}">
      ${badge}
      <div class="dp-conclusion-text">${lead}</div>
      <div class="dp-conclusion-text" style="margin-top:6px;color:var(--text-secondary);">${body}</div>
      ${peerHint}
    </div>
  </div>`;
}

function renderNoPmuConclusion(task) {
  return `<div class="dp-section">
    <div class="dp-conclusion is-accounted" style="border-left-color: var(--text-tertiary);">
      <span class="dp-conclusion-badge" style="background:var(--bg-elev-3);color:var(--text-secondary);">No PMU</span>
      <div class="dp-conclusion-text">本 lane (${task.laneKind}) 不参与 group 2 PMU 解释。<br/>
      它属于全局调度 / 数据迁移层。如需 PMU 数据，请关注 AIC / AIV lane 上的 task。</div>
    </div>
  </div>`;
}

function renderCounterBreakdown(task, d, group) {
  const total = task.totalCycle;
  // composition bar (clc-relative widths, with a marker for total)
  let segs = d.composition.map(seg => {
    const family = group.familyOf(seg.counter);
    const color = group.familyColor(family);
    const pct = (seg.value / d.clcCycle) * 100;
    return `<span title="${seg.counter} · ${seg.value.toFixed(0)} µs" style="width:${pct}%;background:${color}"></span>`;
  }).join('');

  // mark the "total" position relative to the displayed clc bar width.
  // If clc<total, the bar represents clc; the total marker sits past the bar.
  // If clc>total, the bar represents clc; the total marker sits inside the bar.
  let totalMarkerHtml = '';
  if (d.status === 'wait') {
    // bar width = (clc/total)*100%; so total marker is at 100% relative to (clc/total) bar
    // Place marker at right edge of total range
    const barClcRatio = d.clcCycle / total; // < 1
    const totalAtBar = 100 / barClcRatio;   // > 100; outside container
    if (totalAtBar < 220) {
      totalMarkerHtml = `<span class="cb-total-marker" style="left:${totalAtBar}%;"></span><span class="cb-total-tag" style="left:${totalAtBar}%;">total ${total.toFixed(0)} µs</span>`;
    }
  } else if (d.status === 'overlap') {
    const totalPct = (total / d.clcCycle) * 100;
    totalMarkerHtml = `<span class="cb-total-marker" style="left:${totalPct}%;"></span><span class="cb-total-tag" style="left:${totalPct}%;">total ${total.toFixed(0)} µs</span>`;
  }

  let rows = '';
  for (const seg of d.composition) {
    const meta = COUNTER_META[seg.counter];
    const family = group.familyOf(seg.counter);
    const color = group.familyColor(family);
    const pct = ((seg.value / d.clcCycle) * 100).toFixed(1);
    const isDominant = seg.counter === d.dominantCounter;
    rows += `<span class="sw" style="background:${color}"></span>
             <span class="name ${isDominant ? 'is-dominant' : ''}">${meta?.label || seg.counter}</span>
             <span class="val">${seg.value.toFixed(0)} µs</span>
             <span class="pct">${pct}%</span>`;
  }

  // event counters
  let eventRows = '';
  for (const ec of EVENT_COUNTERS) {
    const v = task.g2[ec];
    if (v == null) continue;
    eventRows += `<span class="sw" style="background:var(--bg-elev-3);border:1px dashed var(--border-strong);"></span>
                  <span class="name is-event">${ec}</span>
                  <span class="val">${v}</span>
                  <span class="pct">event</span>`;
  }

  return `<div class="dp-section">
    <div class="dp-section-title">Counter breakdown · cycle-like（µs）</div>
    <div class="cb-bar" style="position:relative;overflow:visible;">${segs}${totalMarkerHtml}</div>
    <div class="cb-rows">${rows}</div>
    ${eventRows ? `<div class="dp-section-title" style="margin-top:10px;">事件计数 · 不参与 clc 求和</div>
                   <div class="cb-rows">${eventRows}</div>` : ''}
  </div>`;
}

function renderPeerRow(p, self, group) {
  const isSelf = p.id === self.id;
  const d = (p.g2 && group) ? group.derive(p) : null;
  const status = d?.status || '—';
  return `<div class="peer-row ${isSelf ? 'is-self' : ''}" data-task-id="${p.id}">
    <span class="peer-lane">${p.laneId}</span>
    <span class="peer-op">${p.opName}</span>
    <span class="peer-end">${p.end.toFixed(0)} µs</span>
    <span class="peer-status ${status === 'wait' ? 'wait' : status === 'overlap' ? 'overlap' : status === 'accounted' ? 'ok' : ''}">${status}</span>
  </div>`;
}

function attachDetailEvents(task, derived, dominantMeta, peers, next) {
  const el = document.getElementById('detail-panel');
  el.querySelectorAll('.dp-jump-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const jump = btn.dataset.jump;
      if (jump === 'source') openModal('source', { task });
      else if (jump === 'call') openModal('call', { task });
      else if (jump === 'blockgraph') openModal('blockgraph', { task });
      else if (jump === 'hw') openModal('hw', { task, derived, dominantMeta });
      else if (jump === 'peer') {
        if (!state.mixMode) setState({ mixMode: true });
        scrollToTask(task.id);
      } else if (jump === 'next' && next) {
        navigator.clipboard?.writeText(next.cmd);
        toast(`下次采集：${next.cmd}（已复制）`);
      }
    });
  });
  el.querySelectorAll('.peer-row').forEach(row => {
    row.addEventListener('click', () => {
      const tid = row.dataset.taskId;
      setState({ selectedTaskId: tid });
      scrollToTask(tid);
    });
  });
  const copyBtn = el.querySelector('#dp-copy-cmd');
  if (copyBtn && next) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(next.cmd);
      toast(`已复制：${next.cmd}`);
    });
  }
}

function toast(text) {
  const root = document.getElementById('toast-root');
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  root.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}
