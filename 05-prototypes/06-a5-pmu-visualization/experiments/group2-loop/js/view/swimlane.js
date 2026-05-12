// Swimlane renderer.
// - Default order: AICCtrl → AICSched → AIC ×24 → AIV ×48 → MTEIn, MTEOut
// - Mix order:     AICCtrl → AICSched → [Wrap k = AIC k / AIV (2k-1) / AIV 2k] ×24 → MTEIn, MTEOut
// - Default coloring: by taskIdentity (opType)
// - Mix coloring:     by group-2 cycle-like counter composition

import { LANES, WRAPS, TASKS, TASKS_BY_LANE, TIMELINE } from '../data/tasks.js';
import { IDENTITY_COLOR } from '../data/hw-map.js';
import { state, setState } from '../state.js';
import { getGroup } from '../groups/registry.js';

const LANE_H = 14;
const LANE_LABEL_W = 110;
const TIME_AXIS_H = 22;
const WRAP_GUTTER = 6;       // extra px between wraps in mix mode
const WRAP_TAB_W = 14;
const SECTION_GAP = 4;       // small visual gap between section groups
const MARKER_H = 14;

const CRITICAL_WRAPS = new Set(['wrap-7', 'wrap-12', 'wrap-19']);

let host;
let tooltipEl;

export function initSwimlane(containerId) {
  host = document.getElementById(containerId);
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'sl-tooltip';
  host.appendChild(tooltipEl);
}

// Compute lane ordering for the current state.
export function computeLaneOrder(mixMode) {
  const cpuLanes = LANES.filter(l => l.kind === 'AICCtrl' || l.kind === 'AICSched');
  const aicLanes = LANES.filter(l => l.kind === 'AIC');
  const aivLanes = LANES.filter(l => l.kind === 'AIV');
  const mteLanes = LANES.filter(l => l.kind === 'MTEIn' || l.kind === 'MTEOut');

  // returns array of { lane, sectionStart? , wrap? }
  const rows = [];
  // section: CPU
  for (const l of cpuLanes) rows.push({ lane: l, section: 'cpu' });
  rows.push({ separator: true, section: 'cpu→' + (mixMode ? 'wrap' : 'aic') });

  if (!mixMode) {
    for (const l of aicLanes) rows.push({ lane: l, section: 'aic' });
    rows.push({ separator: true, section: 'aic→aiv' });
    for (const l of aivLanes) rows.push({ lane: l, section: 'aiv' });
    rows.push({ separator: true, section: 'aiv→mte' });
  } else {
    for (const wrap of WRAPS) {
      const aicLane = aicLanes.find(l => l.id === wrap.aicLaneId);
      const aiv1 = aivLanes.find(l => l.id === wrap.aivLaneIds[0]);
      const aiv2 = aivLanes.find(l => l.id === wrap.aivLaneIds[1]);
      rows.push({ wrapHeader: wrap, section: 'wrap' });
      rows.push({ lane: aicLane, section: 'wrap', wrap });
      rows.push({ lane: aiv1, section: 'wrap', wrap });
      rows.push({ lane: aiv2, section: 'wrap', wrap });
    }
    rows.push({ separator: true, section: 'wrap→mte' });
  }
  for (const l of mteLanes) rows.push({ lane: l, section: 'mte' });
  return rows;
}

function timeScale(viewWidth, zoom) {
  const usable = viewWidth - LANE_LABEL_W - 16;
  const span = TIMELINE.endUs - TIMELINE.startUs;
  return (us) => LANE_LABEL_W + ((us - TIMELINE.startUs) / span) * usable * zoom;
}

export function renderSwimlane() {
  if (!host) return;
  const mix = state.mixMode;
  const group = getGroup(state.groupId)?.impl;

  // ---- compute geometry ----
  const rows = computeLaneOrder(mix);
  const hostWidth = host.clientWidth || 1200;
  const zoom = state.zoom;
  const usable = hostWidth - LANE_LABEL_W - 16;
  const totalWidth = LANE_LABEL_W + usable * zoom + 16;
  const ts = timeScale(hostWidth, zoom);

  // resolve row y positions
  let y = TIME_AXIS_H + MARKER_H;
  const rowY = [];
  for (const row of rows) {
    if (row.separator) {
      rowY.push({ y, h: SECTION_GAP });
      y += SECTION_GAP;
    } else if (row.wrapHeader) {
      rowY.push({ y, h: WRAP_GUTTER });
      y += WRAP_GUTTER;
    } else {
      rowY.push({ y, h: LANE_H });
      y += LANE_H;
    }
  }
  const totalHeight = y + 8;

  // ---- build SVG ----
  let svg = `<svg class="sl-svg" width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">`;

  // background lanes + labels
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const { y, h } = rowY[i];
    if (row.separator) {
      svg += `<line class="sl-section-divider" x1="${LANE_LABEL_W}" x2="${totalWidth}" y1="${y + h / 2}" y2="${y + h / 2}"/>`;
      continue;
    }
    if (row.wrapHeader) {
      // wrap tab (left) + tinted background spanning 3 lane rows
      const wrap = row.wrapHeader;
      const isCritical = CRITICAL_WRAPS.has(wrap.id);
      const blockTopY = y;
      const blockH = WRAP_GUTTER + LANE_H * 3;
      // background for whole wrap block
      svg += `<rect class="sl-lane-bg ${isCritical ? 'is-wrap-critical' : (wrap.index % 2 === 0 ? 'is-wrap-even' : 'is-wrap-odd')}" x="${WRAP_TAB_W}" y="${blockTopY}" width="${totalWidth - WRAP_TAB_W}" height="${blockH}"/>`;
      // wrap tab
      svg += `<rect class="sl-wrap-tab ${isCritical ? 'is-critical' : ''}" x="0" y="${blockTopY}" width="${WRAP_TAB_W}" height="${blockH - 1}" rx="2"/>`;
      svg += `<text class="sl-wrap-tab-text ${isCritical ? 'is-critical' : ''}" x="${WRAP_TAB_W / 2}" y="${blockTopY + blockH / 2}" transform="rotate(-90 ${WRAP_TAB_W / 2} ${blockTopY + blockH / 2})">W${wrap.index}${isCritical ? ' ●' : ''}</text>`;
      continue;
    }
    // lane row
    const lane = row.lane;
    const tintClass =
      (lane.kind === 'AICCtrl' || lane.kind === 'AICSched') ? 'is-cpu-section' :
      (lane.kind === 'MTEIn' || lane.kind === 'MTEOut') ? 'is-mte-section' : '';
    svg += `<rect class="sl-lane-bg ${tintClass}" x="${mix && row.wrap ? WRAP_TAB_W : 0}" y="${y}" width="${totalWidth - (mix && row.wrap ? WRAP_TAB_W : 0)}" height="${h}"/>`;

    // lane label
    const labelClass =
      (lane.kind === 'AIC') ? 'is-aic' :
      (lane.kind === 'AIV') ? 'is-aiv' :
      (lane.kind === 'MTEIn' || lane.kind === 'MTEOut') ? 'is-mte' :
      'is-cpu';
    svg += `<text class="sl-lane-label ${labelClass}" x="${(mix && row.wrap ? WRAP_TAB_W : 0) + 6}" y="${y + h / 2}">${lane.label}</text>`;
  }

  // time-axis ticks
  const tickStep = 1000; // µs
  for (let t = 0; t <= TIMELINE.endUs; t += tickStep) {
    const x = ts(t);
    svg += `<line class="sl-axis-tick" x1="${x}" x2="${x}" y1="${TIME_AXIS_H + MARKER_H}" y2="${totalHeight}"/>`;
    svg += `<text class="sl-axis-label" x="${x}" y="${TIME_AXIS_H - 6}">${t} µs</text>`;
  }

  // tasks
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row.separator || row.wrapHeader) continue;
    const { y, h } = rowY[i];
    const lane = row.lane;
    const laneTasks = TASKS_BY_LANE[lane.id] || [];
    for (const task of laneTasks) {
      svg += renderTask(task, ts, y, h, mix, group);
    }
  }

  // markers (top strip)
  svg += renderMarkers(ts);

  svg += `</svg>`;
  host.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.innerHTML = svg;
  host.appendChild(wrapper.firstChild);
  // re-attach tooltip
  host.appendChild(tooltipEl);

  attachInteractions();
}

function renderTask(task, ts, y, h, mix, group) {
  const x1 = ts(task.start);
  const x2 = ts(task.end);
  const w = Math.max(1.2, x2 - x1);
  const top = y + 1;
  const barH = h - 2;

  const derived = group && task.g2 ? group.derive(task) : null;
  const isSelected = task.id === state.selectedTaskId;
  const isCritical = CRITICAL_WRAPS.has(task.wrapId) && task.isWrapPrimary;
  let suspectClass = '';
  if (derived?.status === 'wait' && mix && task.isWrapPrimary) suspectClass = 'is-suspect-wait';
  else if (derived?.status === 'overlap' && mix && task.isWrapPrimary) suspectClass = 'is-suspect-overlap';
  else if (isCritical) suspectClass = 'is-critical';

  // determine base fill
  let fill;
  if (!mix) {
    // identity coloring
    fill = IDENTITY_COLOR[task.opType] || 'var(--text-tertiary)';
  } else if (task.g2 && derived) {
    fill = 'var(--bg-elev-2)'; // base canvas, segments drawn on top
  } else {
    // non-AIC/AIV in mix mode keep identity color
    fill = IDENTITY_COLOR[task.opType] || 'var(--text-tertiary)';
  }

  let out = '';
  out += `<g class="sl-task-group">`;
  out += `<rect class="sl-task ${isSelected ? 'is-selected' : ''} ${suspectClass}" data-task-id="${task.id}" x="${x1}" y="${top}" width="${w}" height="${barH}" rx="1.5" fill="${fill}"/>`;

  // composition segments (mix mode + has g2)
  if (mix && task.g2 && derived) {
    out += renderComposition(task, derived, ts, top, barH, group);
  }

  // task name label (only if width > 36px)
  if (w > 36) {
    const fontSize = w > 80 ? 9 : 8;
    const labelX = x1 + 4;
    const labelMaxW = Math.max(20, w - 8);
    const labelClass = (mix && task.g2) ? 'is-dark-bg' : '';
    out += `<text class="sl-task-name ${labelClass}" x="${labelX}" y="${top + barH / 2}" font-size="${fontSize}" clip-path="inset(0 ${Math.max(0, w - labelMaxW)}px 0 0)">${task.opName}</text>`;
  }

  // status badge (right tip) for primary wrap tasks in mix mode
  if (mix && derived && task.isWrapPrimary && w > 28) {
    const bx = x2 - 14;
    const by = top + 1;
    const bw = 12, bh = barH - 2;
    const klass = derived.status; // 'wait' | 'accounted' | 'overlap'
    const sym = klass === 'wait' ? '!' : klass === 'overlap' ? '◇' : '✓';
    out += `<g class="sl-badge"><rect class="sl-badge-r ${klass}" x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="2"/><text class="sl-badge-t ${klass}" x="${bx + bw / 2}" y="${by + bh / 2}">${sym}</text></g>`;
  }

  out += `</g>`;
  return out;
}

function renderComposition(task, derived, ts, top, barH, group) {
  const x1 = ts(task.start);
  const x2 = ts(task.end);
  const w = x2 - x1;
  let out = '';

  if (derived.status === 'wait') {
    // Layout: compress cycle-like segments into a (clc/total)*w prefix; rest is uncovered.
    const ratio = Math.min(1, derived.clcCycle / task.totalCycle);
    const usedW = w * ratio;
    let cursor = x1;
    for (const seg of derived.composition) {
      const family = group.familyOf(seg.counter);
      const segW = (seg.value / derived.clcCycle) * usedW;
      if (segW < 0.4) continue;
      out += `<rect class="sl-seg" x="${cursor}" y="${top}" width="${segW}" height="${barH}" fill="${group.familyColor(family)}" fill-opacity="0.85"/>`;
      cursor += segW;
    }
    // uncovered (striped via diagonal pattern made of overlay)
    const uncoveredW = x2 - cursor;
    if (uncoveredW > 0.5) {
      out += `<rect class="sl-seg sl-seg-uncovered" x="${cursor}" y="${top}" width="${uncoveredW}" height="${barH}"/>`;
      // diagonal hatch lines
      const hatchN = Math.floor(uncoveredW / 4);
      for (let h = 0; h < hatchN; h++) {
        const hx = cursor + h * 4;
        out += `<line stroke="var(--c-uncovered)" stroke-opacity="0.65" stroke-width="0.7" x1="${hx}" y1="${top}" x2="${hx + 4}" y2="${top + barH}"/>`;
      }
    }
  } else if (derived.status === 'overlap') {
    // Layout: fill bar with composition; render purple overlay across whole bar to indicate overlap risk.
    let cursor = x1;
    for (const seg of derived.composition) {
      const family = group.familyOf(seg.counter);
      const segW = (seg.value / derived.clcCycle) * w;
      if (segW < 0.4) continue;
      out += `<rect class="sl-seg" x="${cursor}" y="${top}" width="${Math.min(w - (cursor - x1), segW)}" height="${barH}" fill="${group.familyColor(family)}" fill-opacity="0.78"/>`;
      cursor += segW;
    }
    out += `<rect class="sl-seg sl-seg-overlap" x="${x1}" y="${top}" width="${w}" height="${barH}"/>`;
    // marker bar at right showing how much overflow
    const overflowRatio = Math.min(0.4, (derived.clcCycle - task.totalCycle) / task.totalCycle);
    const tickX = x2 + 1;
    const tickW = Math.max(2, overflowRatio * w);
    out += `<rect class="sl-seg" x="${tickX}" y="${top + barH / 2 - 1}" width="${tickW}" height="2" fill="var(--c-overlap)" fill-opacity="0.85"/>`;
  } else {
    // accounted: layout segments by clc fraction of total
    let cursor = x1;
    for (const seg of derived.composition) {
      const family = group.familyOf(seg.counter);
      const segW = (seg.value / derived.clcCycle) * w;
      if (segW < 0.4) continue;
      out += `<rect class="sl-seg" x="${cursor}" y="${top}" width="${Math.min(w - (cursor - x1), segW)}" height="${barH}" fill="${group.familyColor(family)}" fill-opacity="0.85"/>`;
      cursor += segW;
    }
  }
  return out;
}

function renderMarkers(ts) {
  // Markers: critical task / wait suspect / overlap suspect — one per critical wrap.
  const group = getGroup(state.groupId)?.impl;
  if (!group) return '';
  let out = '';
  for (const w of WRAPS) {
    if (!CRITICAL_WRAPS.has(w.id)) continue;
    // critical task = wrap primary AIC matmul
    const t = TASKS.find(t => t.wrapId === w.id && t.isWrapPrimary && t.laneKind === 'AIC');
    if (!t) continue;
    const derived = group.derive(t);
    const mx = ts(t.start);
    const my = TIME_AXIS_H + MARKER_H - 9;
    const klass = derived?.status === 'wait' ? 'is-wait' : derived?.status === 'overlap' ? 'is-overlap' : 'is-critical';
    const symbol = derived?.status === 'wait' ? '!' : derived?.status === 'overlap' ? '◇' : '▲';
    out += `<g class="sl-marker ${klass}" data-task-id="${t.id}" transform="translate(${mx}, ${my})">`;
    out += `<polygon class="sl-marker-shape" points="-7,0 7,0 0,9"/>`;
    out += `<text fill="#0d1117" font-family="var(--font-mono)" font-size="9" font-weight="700" text-anchor="middle" y="-1.5">${symbol}</text>`;
    out += `</g>`;
  }
  return out;
}

// ---------- legend ----------
export function renderLegend(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!state.mixMode) {
    // identity legend
    const items = [
      ['matmul / conv', 'var(--id-matmul)'],
      ['vec_softmax', 'var(--id-vec-softmax)'],
      ['vec_layernorm', 'var(--id-vec-layernorm)'],
      ['vec_elementwise', 'var(--id-vec-elementwise)'],
      ['vec_reduce', 'var(--id-vec-reduce)'],
      ['mte_load / store', 'var(--id-mte-load)'],
      ['cpu_sched / ctrl', 'var(--id-cpu-sched)'],
    ];
    el.innerHTML = `<span class="muted">默认着色 · op identity</span>` +
      items.map(([n, c]) => `<span class="lg"><span class="lg-sw" style="background:${c}"></span>${n}</span>`).join('');
  } else {
    const group = getGroup(state.groupId)?.impl;
    if (!group) {
      el.innerHTML = `<span class="muted">Mix · group ${state.groupId} 未采集</span>`;
      return;
    }
    el.innerHTML = `<span class="muted">Mix · group ${state.groupId} composition</span>` +
      group.legend.map(it => `<span class="lg"><span class="lg-sw" style="background:${it.color};${it.striped ? 'background-image:repeating-linear-gradient(45deg,'+it.color+' 0,'+it.color+' 2px,transparent 2px,transparent 4px);' : ''}"></span>${it.label}</span>`).join('');
  }
}

export function renderTitle(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const group = getGroup(state.groupId)?.impl;
  const orderTag = state.mixMode ? 'Wrap-grouped 顺序' : '默认顺序';
  el.textContent = `${group ? group.shortTitle : 'Group'} · ${orderTag}`;
}

// ---------- interactions ----------
function attachInteractions() {
  host.querySelectorAll('.sl-task, .sl-marker').forEach(el => {
    el.addEventListener('click', e => {
      const id = el.dataset.taskId;
      if (id) setState({ selectedTaskId: id });
      e.stopPropagation();
    });
    el.addEventListener('mouseenter', e => {
      const id = el.dataset.taskId;
      const task = TASKS.find(t => t.id === id);
      if (task) showTooltip(task, e);
    });
    el.addEventListener('mousemove', moveTooltip);
    el.addEventListener('mouseleave', hideTooltip);
  });
}

function showTooltip(task, e) {
  const group = getGroup(state.groupId)?.impl;
  const derived = task.g2 && group ? group.derive(task) : null;
  let html = `<div class="tt-op">${task.opName}</div>`;
  html += `<div class="tt-row"><span class="tt-k">lane</span><span class="tt-v">${task.laneKind} · ${task.laneId}</span></div>`;
  html += `<div class="tt-row"><span class="tt-k">total</span><span class="tt-v">${task.totalCycle.toFixed(0)} µs</span></div>`;
  if (derived) {
    html += `<div class="tt-row"><span class="tt-k">clc</span><span class="tt-v">${derived.clcCycle.toFixed(0)} µs</span></div>`;
    const gapStr = derived.gap >= 0 ? `+${derived.gap.toFixed(0)}` : `${derived.gap.toFixed(0)}`;
    html += `<div class="tt-row"><span class="tt-k">gap</span><span class="tt-v">${gapStr} µs (${(derived.gapRatio * 100).toFixed(1)}%)</span></div>`;
    html += `<div class="tt-row"><span class="tt-k">status</span><span class="tt-v ${derived.status === 'wait' ? 'bad' : derived.status === 'overlap' ? 'warn-fg' : 'ok'}">${derived.status}</span></div>`;
    if (derived.dominantCounter) {
      html += `<div class="tt-row"><span class="tt-k">dominant</span><span class="tt-v">${derived.dominantCounter}</span></div>`;
    }
  }
  if (task.wrapId) {
    html += `<div class="tt-row"><span class="tt-k">wrap</span><span class="tt-v">${task.wrapId}</span></div>`;
  }
  tooltipEl.innerHTML = html;
  tooltipEl.classList.add('visible');
  moveTooltip(e);
}
function moveTooltip(e) {
  if (!tooltipEl.classList.contains('visible')) return;
  const rect = host.getBoundingClientRect();
  const x = e.clientX - rect.left + 14;
  const y = e.clientY - rect.top + 14;
  tooltipEl.style.left = `${Math.min(x, host.clientWidth - 280)}px`;
  tooltipEl.style.top = `${Math.min(y, host.clientHeight - 160)}px`;
}
function hideTooltip() {
  tooltipEl.classList.remove('visible');
}

// scroll to a task
export function scrollToTask(taskId) {
  const task = TASKS.find(t => t.id === taskId);
  if (!task) return;
  const hostWidth = host.clientWidth;
  const ts = timeScale(hostWidth, state.zoom);
  const xCenter = (ts(task.start) + ts(task.end)) / 2;
  const target = Math.max(0, xCenter - hostWidth / 2);
  host.scrollTo({ left: target, behavior: 'smooth' });

  // y scroll: find the task's row
  const rows = computeLaneOrder(state.mixMode);
  let y = TIME_AXIS_H + MARKER_H;
  for (const row of rows) {
    if (row.separator) { y += SECTION_GAP; continue; }
    if (row.wrapHeader) { y += WRAP_GUTTER; continue; }
    if (row.lane.id === task.laneId) break;
    y += LANE_H;
  }
  host.scrollTo({ top: Math.max(0, y - host.clientHeight / 2), left: target, behavior: 'smooth' });
}
