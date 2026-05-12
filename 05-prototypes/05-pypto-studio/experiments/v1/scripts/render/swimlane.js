/* ===================================================================
 * PyPTO Studio · Swimlane Renderer (SVG)
 * 渲染 78 lane × 500μs 泳道图，支持:
 *   - 分组折叠（展开则逐 lane 渲染，折叠则展示聚合利用率热力条）
 *   - Playbook 当前步骤的关注区域蒙版叠加（含注释气泡）
 *   - op 块 hover tooltip
 *   - 缩放（×0.6 / ×1 / ×1.6）
 * =================================================================== */

window.Swimlane = (function () {

  // ---------- geometry ----------
  const LABEL_W = 96;
  const PAD_L = 10;
  const PAD_R = 18;
  const PAD_T = 6;
  const PAD_B = 12;
  const LANE_H = 14;        // 单 lane 行高
  const AGG_H = 22;         // 聚合行高
  const GROUP_HEAD_H = 22;
  const AXIS_H = 26;

  let host = null;
  let svg = null;
  let tooltip = null;
  let groupState = {};      // groupId -> { expanded: bool }
  let zoom = 1.0;
  let pxPerUs = 0;          // 计算自宽度

  // 通过 dispatchEvent 通知外部
  function emit(name, detail) {
    document.dispatchEvent(new CustomEvent(name, { detail }));
  }

  // ---------- init ----------
  function init() {
    host = document.getElementById('swimlane-host');
    // 默认折叠态
    window.SWIMLANE.groups.forEach(g => {
      groupState[g.id] = { expanded: !!g.defaultExpanded };
    });
    // tooltip
    tooltip = document.createElement('div');
    tooltip.className = 'sl-tooltip';
    host.appendChild(tooltip);

    // toolbar 按钮
    document.querySelectorAll('.sl-toolbar .sl-tool').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (i === 0) zoom = Math.max(0.6, zoom - 0.2);
        if (i === 1) zoom = Math.min(2.4, zoom + 0.2);
        if (i === 2) jumpToOverlay();
        render();
      });
    });

    render();
    // 适配窗口宽度变化
    window.addEventListener('resize', () => render());
  }

  function jumpToOverlay() {
    const step = window.PLAYBOOK.steps.find(s => s.n === window.SESSION_STATE.currentStep);
    if (!step) return;
    const hl = window.SWIMLANE.highlights[step.n];
    if (!hl) return;
    const el = host.querySelector('.sl-overlay');
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ---------- render ----------
  function render() {
    const step = window.PLAYBOOK.steps.find(s => s.n === window.SESSION_STATE.currentStep);
    const hl = step ? (window.SWIMLANE.highlights[step.n] || null) : null;

    // 自动展开 highlight 要求的 group
    if (hl && hl.autoExpand) {
      hl.autoExpand.forEach(gid => {
        if (groupState[gid]) groupState[gid].expanded = true;
      });
    }

    // 计算宽度
    const hostW = host.clientWidth || 540;
    const innerW = hostW - PAD_L - PAD_R;
    const trackW = innerW - LABEL_W;
    pxPerUs = (trackW / window.SWIMLANE.duration) * zoom;

    // 计算每个 group 在垂直方向的位置
    const rows = []; // { type, group, lane?, y, h }
    let y = AXIS_H + PAD_T;

    window.SWIMLANE.groups.forEach(g => {
      const expanded = groupState[g.id].expanded;
      rows.push({ type: 'group-head', group: g, y, h: GROUP_HEAD_H });
      y += GROUP_HEAD_H;
      if (!expanded) {
        // 聚合行
        rows.push({ type: 'aggregate', group: g, y, h: AGG_H });
        y += AGG_H + 2;
      } else {
        // 逐 lane
        const lanes = window.SWIMLANE.lanes.filter(l => l.group === g.id);
        lanes.forEach(l => {
          rows.push({ type: 'lane', group: g, lane: l, y, h: LANE_H });
          y += LANE_H;
        });
        y += 2;
      }
    });

    const totalH = y + PAD_B;
    const totalW = LABEL_W + Math.max(trackW, window.SWIMLANE.duration * pxPerUs) + PAD_L + PAD_R;

    // 重建 svg
    if (svg) svg.remove();
    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'sl-svg');
    svg.setAttribute('width', totalW);
    svg.setAttribute('height', totalH);
    host.appendChild(svg);

    // bg
    drawBg(totalW, totalH);
    // time axis
    drawAxis(totalW);
    // rows
    rows.forEach(r => drawRow(r));
    // overlay (highlight)
    if (hl) drawOverlay(hl, rows);

    // sync host scroll min height (确保滚动)
    host.scrollTop = 0;
  }

  function drawBg(w, h) {
    const bg = svgEl('rect', { x: 0, y: 0, width: w, height: h, fill: 'transparent' });
    svg.appendChild(bg);
    // label column bg
    const lc = svgEl('rect', { x: 0, y: AXIS_H, width: LABEL_W + PAD_L, height: h - AXIS_H,
      fill: 'rgba(28,33,40,0.92)' });
    svg.appendChild(lc);
    // label border
    const lcb = svgEl('line', { x1: LABEL_W + PAD_L, y1: AXIS_H, x2: LABEL_W + PAD_L, y2: h,
      stroke: 'var(--border)', 'stroke-width': 1 });
    svg.appendChild(lcb);
  }

  function drawAxis(w) {
    const axisY = AXIS_H - 1;
    const startX = LABEL_W + PAD_L;
    // axis line
    const line = svgEl('line', { x1: startX, y1: axisY, x2: w - PAD_R, y2: axisY,
      stroke: 'var(--border-strong)', 'stroke-width': 1 });
    svg.appendChild(line);
    // ticks every 50μs
    for (let us = 0; us <= window.SWIMLANE.duration; us += 50) {
      const x = startX + us * pxPerUs;
      const tick = svgEl('line', { x1: x, y1: axisY - 4, x2: x, y2: axisY,
        stroke: 'var(--text-tertiary)', 'stroke-width': 1 });
      svg.appendChild(tick);
      const txt = svgEl('text', { x: x, y: axisY - 8, 'text-anchor': 'middle',
        fill: 'var(--text-tertiary)', 'font-family': 'var(--font-mono)', 'font-size': 9.5 });
      txt.textContent = us + 'μs';
      svg.appendChild(txt);
    }
    // axis label
    const al = svgEl('text', { x: PAD_L, y: axisY - 8, fill: 'var(--text-secondary)',
      'font-family': 'var(--font-mono)', 'font-size': 9.5, 'font-weight': 700,
      'letter-spacing': '0.06em' });
    al.textContent = 'TIME';
    svg.appendChild(al);
  }

  function drawRow(r) {
    if (r.type === 'group-head') drawGroupHead(r);
    else if (r.type === 'aggregate') drawAggregate(r);
    else if (r.type === 'lane') drawLane(r);
  }

  function drawGroupHead(r) {
    const g = r.group;
    const expanded = groupState[g.id].expanded;
    const startX = LABEL_W + PAD_L;
    const endX = (svg.getAttribute('width') | 0) - PAD_R;

    // bg strip
    const bg = svgEl('rect', { x: 0, y: r.y, width: endX + PAD_R, height: r.h,
      fill: 'rgba(33,38,45,0.45)' });
    svg.appendChild(bg);

    // caret
    const caret = svgEl('text', {
      x: PAD_L + 4, y: r.y + r.h - 6,
      fill: 'var(--text-secondary)', 'font-family': 'var(--font-mono)',
      'font-size': 10, 'font-weight': 700,
      class: 'sl-caret', 'data-group': g.id,
    });
    caret.style.cursor = 'pointer';
    caret.textContent = expanded ? '▾' : '▸';
    svg.appendChild(caret);

    // group name
    const name = svgEl('text', {
      x: PAD_L + 18, y: r.y + r.h - 7,
      fill: 'var(--text-primary)', 'font-family': 'var(--font-ui)',
      'font-size': 11, 'font-weight': 600,
    });
    name.textContent = g.label;
    svg.appendChild(name);

    // count
    const count = svgEl('text', {
      x: PAD_L + 18 + textWidth(g.label, 11, 600) + 8,
      y: r.y + r.h - 7,
      fill: 'var(--text-tertiary)', 'font-family': 'var(--font-mono)',
      'font-size': 10,
    });
    count.textContent = `(${g.count})`;
    svg.appendChild(count);

    // aggregate util chip on right of label column
    if (g.aggregateUtil !== undefined) {
      const utilColor = utilToColor(g.aggregateUtil);
      const chipX = LABEL_W + PAD_L - 50;
      const chipBg = svgEl('rect', {
        x: chipX, y: r.y + 4, width: 44, height: r.h - 8,
        fill: utilColor.dim, stroke: utilColor.solid, 'stroke-width': 1,
        rx: 3,
      });
      svg.appendChild(chipBg);
      const chipTxt = svgEl('text', {
        x: chipX + 22, y: r.y + r.h - 7,
        fill: utilColor.solid, 'font-family': 'var(--font-mono)',
        'font-size': 9.5, 'font-weight': 700, 'text-anchor': 'middle',
      });
      chipTxt.textContent = Math.round(g.aggregateUtil * 100) + '%';
      svg.appendChild(chipTxt);
    }

    // click handler
    bg.style.cursor = 'pointer';
    [bg, caret, name].forEach(el => {
      el.addEventListener('click', () => toggleGroup(g.id));
    });
  }

  function toggleGroup(gid) {
    groupState[gid].expanded = !groupState[gid].expanded;
    render();
  }

  function drawAggregate(r) {
    const g = r.group;
    const startX = LABEL_W + PAD_L;
    // label
    const lbl = svgEl('text', {
      x: PAD_L + 20, y: r.y + r.h / 2 + 3.5,
      fill: 'var(--text-tertiary)', 'font-family': 'var(--font-mono)',
      'font-size': 10, 'font-style': 'italic',
    });
    lbl.textContent = `~ ${g.aggregate || 'aggregate'} ${g.count}`;
    svg.appendChild(lbl);

    // heat bar across time
    // 用 group 的代表性 op 时段填充，颜色按 util 决定（demo: 用聚合 util 做整体 alpha）
    const repLane = window.SWIMLANE.lanes.find(l => l.group === g.id && /(_0$)/.test(l.id));
    const tone = aggToneByUtil(g.aggregateUtil);

    // 底色框
    const bar = svgEl('rect', {
      x: startX, y: r.y + 4, width: window.SWIMLANE.duration * pxPerUs, height: r.h - 8,
      fill: 'rgba(255,255,255,0.02)', stroke: 'var(--border)', 'stroke-width': 1, rx: 2,
    });
    svg.appendChild(bar);

    // 用代表 lane 的 ops 画"占用强度"
    if (repLane) {
      repLane.ops.forEach(op => {
        const x = startX + op.t * pxPerUs;
        const w = Math.max(2, op.d * pxPerUs);
        const fill = laneFillByKind(g.id === 'AIC' ? 'aic' : g.id === 'AIV' ? 'aiv' : repLane.kind, 'soft');
        const seg = svgEl('rect', {
          x, y: r.y + 4 + 1, width: w, height: r.h - 10,
          fill, opacity: 0.45 + g.aggregateUtil * 0.5, rx: 1.5,
        });
        svg.appendChild(seg);
      });
    }

    // 标注 "聚合" 提示文字
    const hint = svgEl('text', {
      x: startX + 6, y: r.y + r.h - 6,
      fill: tone.solid, 'font-family': 'var(--font-mono)',
      'font-size': 9, 'font-weight': 600,
    });
    hint.textContent = `${g.count} cores · avg util ${(g.aggregateUtil * 100).toFixed(0)}%`;
    svg.appendChild(hint);
  }

  function drawLane(r) {
    const lane = r.lane;
    const startX = LABEL_W + PAD_L;
    // label
    const lbl = svgEl('text', {
      x: PAD_L + 20, y: r.y + r.h / 2 + 3.5,
      fill: 'var(--text-secondary)', 'font-family': 'var(--font-mono)',
      'font-size': 10,
      class: `sl-lane-label sl-lane-${lane.id}`,
    });
    lbl.textContent = lane.label;
    svg.appendChild(lbl);

    // track bg
    const tb = svgEl('rect', {
      x: startX, y: r.y + 1, width: window.SWIMLANE.duration * pxPerUs, height: r.h - 2,
      fill: 'rgba(255,255,255,0.012)',
    });
    svg.appendChild(tb);

    // ops
    lane.ops.forEach(op => {
      const x = startX + op.t * pxPerUs;
      const w = Math.max(2, op.d * pxPerUs);
      const fill = laneFillByKind(lane.kind, op.tone);
      const stroke = laneStrokeByKind(lane.kind, op.tone);
      const rect = svgEl('rect', {
        x, y: r.y + 2, width: w, height: r.h - 4,
        fill, stroke, 'stroke-width': 0.6, rx: 1.5,
        class: 'sl-op',
      });
      // hover
      rect.addEventListener('mouseenter', (e) => showTooltip(e, lane, op));
      rect.addEventListener('mouseleave', hideTooltip);
      svg.appendChild(rect);
    });
  }

  function drawOverlay(hl, rows) {
    if (!hl.range) return;
    const startX = LABEL_W + PAD_L;
    const [t0, t1] = hl.range;
    const x = startX + t0 * pxPerUs;
    const w = (t1 - t0) * pxPerUs;

    // 找到被高亮的行（lane id 或 __aggregate__GROUP）
    const targetRows = [];
    (hl.lanes || []).forEach(targetId => {
      if (targetId.startsWith('__aggregate__')) {
        const gid = targetId.replace('__aggregate__', '');
        const ar = rows.find(r => r.type === 'aggregate' && r.group.id === gid);
        if (ar) targetRows.push(ar);
        else {
          // 已展开 → 找该组所有 lane 行
          const groupRows = rows.filter(r => r.type === 'lane' && r.group.id === gid);
          if (groupRows.length) {
            targetRows.push({ y: groupRows[0].y, h: groupRows[groupRows.length - 1].y + groupRows[groupRows.length - 1].h - groupRows[0].y });
          }
        }
      } else {
        const lr = rows.find(r => r.type === 'lane' && r.lane && r.lane.id === targetId);
        if (lr) targetRows.push(lr);
      }
    });
    if (!targetRows.length) {
      // fallback: 整个工作区
      const first = rows.find(r => r.type !== 'group-head');
      const last = rows[rows.length - 1];
      if (first && last) targetRows.push({ y: first.y, h: last.y + last.h - first.y });
    }

    const yMin = Math.min(...targetRows.map(r => r.y)) - 3;
    const yMax = Math.max(...targetRows.map(r => r.y + r.h)) + 3;
    const h = yMax - yMin;

    const toneMap = {
      warn: { fill: 'rgba(210,153,34,0.18)', stroke: '#d29922' },
      bad:  { fill: 'rgba(248,81,73,0.18)',  stroke: '#f85149' },
      ok:   { fill: 'rgba(63,185,80,0.18)',  stroke: '#3fb950' },
      info: { fill: 'rgba(88,166,255,0.18)', stroke: '#58a6ff' },
    };
    const c = toneMap[hl.tone] || toneMap.warn;

    // 蒙版矩形
    const overlay = svgEl('rect', {
      x, y: yMin, width: w, height: h,
      fill: c.fill, stroke: c.stroke, 'stroke-width': 1.5,
      'stroke-dasharray': '4 3', rx: 3,
      class: 'sl-overlay',
    });
    // 脉冲动画
    const animate = svgEl('animate', {
      attributeName: 'stroke-opacity', values: '1;0.4;1', dur: '1.8s', repeatCount: 'indefinite',
    });
    overlay.appendChild(animate);
    svg.appendChild(overlay);

    // 注释气泡
    if (hl.annotation) {
      const balloonY = Math.max(yMin - 28, AXIS_H + 4);
      const balloonX = Math.min(x, (svg.getAttribute('width') | 0) - 320);
      const g = svgEl('g', { class: 'sl-balloon' });
      const bw = Math.min(300, Math.max(200, hl.annotation.length * 6.5));
      const bbg = svgEl('rect', {
        x: balloonX, y: balloonY, width: bw, height: 22,
        fill: c.stroke, opacity: 0.92, rx: 4,
      });
      g.appendChild(bbg);
      const btxt = svgEl('text', {
        x: balloonX + 8, y: balloonY + 15,
        fill: '#0d1117', 'font-family': 'var(--font-ui)',
        'font-size': 10.5, 'font-weight': 600,
      });
      btxt.textContent = hl.annotation;
      g.appendChild(btxt);
      // 小三角
      const tri = svgEl('polygon', {
        points: `${balloonX + 14},${balloonY + 22} ${balloonX + 24},${balloonY + 22} ${balloonX + 18},${balloonY + 28}`,
        fill: c.stroke, opacity: 0.92,
      });
      g.appendChild(tri);
      svg.appendChild(g);
    }

    // 标签
    const lbl = svgEl('text', {
      x: x + 6, y: yMax - 4,
      fill: c.stroke, 'font-family': 'var(--font-mono)',
      'font-size': 10, 'font-weight': 700,
    });
    lbl.textContent = hl.label || '';
    svg.appendChild(lbl);
  }

  // ---------- tooltip ----------
  function showTooltip(e, lane, op) {
    tooltip.innerHTML = `
      <div class="tt-op">${escapeHtml(op.op)}</div>
      <div class="tt-row"><span class="tt-k">lane</span><span class="tt-v mono">${lane.label}</span></div>
      <div class="tt-row"><span class="tt-k">t</span><span class="tt-v mono">${op.t.toFixed(1)}μs → ${(op.t + op.d).toFixed(1)}μs</span></div>
      <div class="tt-row"><span class="tt-k">dur</span><span class="tt-v mono">${op.d.toFixed(1)}μs</span></div>
    `;
    const rect = host.getBoundingClientRect();
    tooltip.style.display = 'block';
    tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
    tooltip.style.top = (e.clientY - rect.top + 12) + 'px';
  }
  function hideTooltip() { tooltip.style.display = 'none'; }

  // ---------- helpers ----------
  function svgEl(name, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }
  function textWidth(s, size, weight) {
    return s.length * size * (weight > 500 ? 0.62 : 0.55);
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }
  function laneFillByKind(kind, tone) {
    const map = {
      cpu_ctrl: '#1f3a5f',
      cpu_sched: '#1d4d6e',
      aic: '#4a2f7a',
      aiv: '#7a2c5e',
      mte_in: '#7a4416',
      mte_out: '#8c5a2a',
      mte: '#7a4416',
    };
    const base = map[kind] || '#444';
    if (tone === 'dim') return base + '99';
    if (tone === 'meta') return '#3a4148';
    if (tone === 'soft') return base + 'cc';
    return base;
  }
  function laneStrokeByKind(kind, tone) {
    const map = {
      cpu_ctrl: '#58a6ff',
      cpu_sched: '#79c0ff',
      aic: '#bc8cff',
      aiv: '#f778ba',
      mte_in: '#db6d28',
      mte_out: '#e8a85f',
      mte: '#db6d28',
    };
    return map[kind] || '#666';
  }
  function utilToColor(u) {
    if (u >= 0.6) return { solid: '#3fb950', dim: 'rgba(63,185,80,0.18)' };
    if (u >= 0.4) return { solid: '#d29922', dim: 'rgba(210,153,34,0.18)' };
    return { solid: '#f85149', dim: 'rgba(248,81,73,0.18)' };
  }
  function aggToneByUtil(u) {
    if (u >= 0.6) return { solid: '#3fb950' };
    if (u >= 0.4) return { solid: '#d29922' };
    return { solid: '#f85149' };
  }

  // ---------- public ----------
  function expandGroup(gid) {
    if (groupState[gid]) {
      groupState[gid].expanded = true;
      render();
    }
  }

  function refresh() { render(); }

  return { init, render, refresh, expandGroup };
})();
