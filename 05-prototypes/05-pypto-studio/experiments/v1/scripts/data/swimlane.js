/* ===================================================================
 * PyPTO Studio · Swimlane Data (msprof slice)
 * 数据等级 L3。78 lane × 500μs 构造数据，用于剧本驱动的 UX demo。
 *
 * 故事约束（当前 "bad" run, axis_fusion=off, mix_mode=sequential）:
 *   - cube 和 vec 被强串行 → AIC 平均 28% 利用率，AIV 32%
 *   - vec_0 在 t=160-240μs 有 80μs 明显 gap（Step 2 观察点）
 *   - AIC[8..23] 和 AIV[16..47] 几乎全空（under-utilization 视觉证据）
 * =================================================================== */
(function () {
  // ---------- seeded random (deterministic) ----------
  function rng(seed) {
    let s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 0xffffffff;
    };
  }

  // ---------- per-kind generators ----------
  function genAicOps(coreIdx) {
    const r = rng(coreIdx * 131 + 7);
    const active = coreIdx < 8;       // 前 8 个 core 活跃
    const halfActive = coreIdx < 12;  // 8..11 弱活跃
    if (!active && !halfActive) {
      return coreIdx < 16
        ? [{ t: 80 + r() * 40, d: 18 + r() * 12, op: 'cube_init', tone: 'dim' }]
        : [];
    }
    const ops = [];
    // pattern: matmul big blocks, sandwiched with init
    const bigW = active ? 78 : 34;
    const slot = [
      { t: 50, d: bigW, op: 'matmul_8x16x32' },
      { t: 240 + (coreIdx % 4) * 4, d: bigW, op: 'matmul_8x16x32' },
      { t: 360 + (coreIdx % 3) * 6, d: bigW * 0.7, op: 'matmul_tail' },
    ];
    slot.forEach((s, i) => {
      // 加一点小抖动让不同 core 错位（更像真实）
      const jitter = (r() - 0.5) * 4;
      ops.push({
        t: s.t + jitter + (coreIdx % 8) * 1.2,
        d: s.d + (r() - 0.5) * 3,
        op: s.op,
        tone: halfActive && !active ? 'dim' : (i === 2 ? 'soft' : 'normal'),
      });
    });
    // 小的 sync/init
    if (active) {
      ops.unshift({ t: 32, d: 6, op: 'cube_init', tone: 'meta' });
      ops.push({ t: 460 + r() * 6, d: 8, op: 'cube_sync', tone: 'meta' });
    }
    return ops;
  }

  function genAivOps(coreIdx) {
    const r = rng(coreIdx * 197 + 13);
    const active = coreIdx < 16;
    const halfActive = coreIdx < 24;
    if (!active && !halfActive) {
      return coreIdx < 32
        ? [{ t: 330 + r() * 30, d: 12 + r() * 8, op: 'vec_add', tone: 'dim' }]
        : [];
    }
    // 关键剧本: vec_0 在 t=160-240μs 完全空（80μs gap）
    const ops = [];
    // 前段：t=30-50 vec 预处理（短）
    if (active) ops.push({ t: 30 + (coreIdx % 8) * 0.8, d: 14, op: 'vec_pre', tone: 'normal' });
    // ⚠ t=160-240μs gap — vec_0 这里完全没事干
    // 后段：softmax/layernorm 在 t=320 之后才开始
    const softT = 320 + (coreIdx % 16) * 1.5;
    ops.push({
      t: softT,
      d: 38 + r() * 6,
      op: coreIdx % 2 === 0 ? 'softmax_partial' : 'layernorm_partial',
      tone: halfActive && !active ? 'dim' : 'normal',
    });
    if (active && coreIdx < 8) {
      ops.push({ t: softT + 50, d: 22, op: 'vec_add', tone: 'soft' });
    }
    return ops;
  }

  // ---------- explicit lane data ----------
  const cpuCtrlOps = [
    { t: 4, d: 14, op: 'kernel_launch', tone: 'meta' },
    { t: 38, d: 6, op: 'sync_event', tone: 'meta' },
    { t: 142, d: 6, op: 'sync_event', tone: 'meta' },
    { t: 232, d: 6, op: 'sync_event', tone: 'meta' },
    { t: 316, d: 6, op: 'sync_event', tone: 'meta' },
    { t: 444, d: 6, op: 'sync_event', tone: 'meta' },
    { t: 488, d: 10, op: 'kernel_end', tone: 'meta' },
  ];

  const cpuSchedOps = [
    [ // sched 0
      { t: 8, d: 12, op: 'dispatch_cube', tone: 'normal' },
      { t: 148, d: 10, op: 'dispatch_cube', tone: 'normal' },
      { t: 318, d: 10, op: 'dispatch_vec', tone: 'soft' },
      { t: 446, d: 8, op: 'dispatch_mte', tone: 'soft' },
    ],
    [ // sched 1
      { t: 24, d: 8, op: 'wait_event', tone: 'meta' },
      { t: 158, d: 8, op: 'wait_event', tone: 'meta' },
      { t: 244, d: 10, op: 'dispatch_cube', tone: 'normal' },
      { t: 360, d: 8, op: 'wait_event', tone: 'meta' },
    ],
    [ // sched 2
      { t: 42, d: 14, op: 'dispatch_vec', tone: 'soft' },
      { t: 240, d: 6, op: 'wait_event', tone: 'meta' },
      { t: 326, d: 14, op: 'dispatch_vec', tone: 'soft' },
      { t: 412, d: 8, op: 'wait_event', tone: 'meta' },
    ],
  ];

  const mteInOps = [
    { t: 6, d: 28, op: 'gm_to_l1 · A_tile', tone: 'normal' },
    { t: 38, d: 18, op: 'gm_to_l1 · B_tile', tone: 'normal' },
    { t: 148, d: 26, op: 'gm_to_l1 · A_tile', tone: 'normal' },
    { t: 244, d: 22, op: 'l1_to_ub · vec_in', tone: 'soft' },
    { t: 314, d: 18, op: 'gm_to_l1 · B_tile', tone: 'normal' },
    { t: 410, d: 14, op: 'gm_to_ub · norm_w', tone: 'soft' },
  ];

  const mteOutOps = [
    { t: 132, d: 14, op: 'ub_to_gm · partial', tone: 'soft' },
    { t: 318, d: 12, op: 'ub_to_gm · partial', tone: 'soft' },
    { t: 444, d: 22, op: 'ub_to_gm · result', tone: 'normal' },
    { t: 470, d: 16, op: 'l1_to_gm · result', tone: 'normal' },
  ];

  // ---------- assemble all lanes ----------
  const lanes = [];

  // group: AI CPU
  lanes.push({ id: 'cpu_ctrl_0',  group: 'AI CPU', label: 'Ctrl',     kind: 'cpu_ctrl',  ops: cpuCtrlOps });
  for (let i = 0; i < 3; i++)
    lanes.push({ id: `cpu_sched_${i}`, group: 'AI CPU', label: `Sched[${i}]`, kind: 'cpu_sched', ops: cpuSchedOps[i] });

  // group: AIC (24)
  for (let i = 0; i < 24; i++)
    lanes.push({ id: `aic_${i}`, group: 'AIC', label: `AIC[${i}]`, kind: 'aic', ops: genAicOps(i) });

  // group: AIV (48)
  for (let i = 0; i < 48; i++)
    lanes.push({ id: `aiv_${i}`, group: 'AIV', label: `AIV[${i}]`, kind: 'aiv', ops: genAivOps(i) });

  // group: MTE
  lanes.push({ id: 'mte_in',  group: 'MTE', label: 'mte_in',  kind: 'mte_in',  ops: mteInOps  });
  lanes.push({ id: 'mte_out', group: 'MTE', label: 'mte_out', kind: 'mte_out', ops: mteOutOps });

  // ---------- groups (collapsible) ----------
  const groups = [
    { id: 'AI CPU', label: 'AI CPU',  collapsible: true,  defaultExpanded: true,  aggregateUtil: 0.18, count: 4 },
    { id: 'AIC',    label: 'AIC',     collapsible: true,  defaultExpanded: false, aggregateUtil: 0.28, count: 24, aggregate: 'cube' },
    { id: 'AIV',    label: 'AIV',     collapsible: true,  defaultExpanded: false, aggregateUtil: 0.32, count: 48, aggregate: 'vec' },
    { id: 'MTE',    label: 'MTE',     collapsible: true,  defaultExpanded: true,  aggregateUtil: 0.42, count: 2  },
  ];

  // ---------- highlights per playbook step ----------
  // 每步在泳道图上的"该看哪里"
  const highlights = {
    1: {
      lanes: ['__aggregate__AIC'],
      range: [50, 170],
      label: 'Cube 利用率 28% · 持续 120μs',
      annotation: '作者说: 注意 AIC 这条聚合条颜色淡 — cube 真的在等。',
      tone: 'warn',
      autoExpand: ['AIC'],
    },
    2: {
      lanes: ['aiv_0'],
      range: [160, 240],
      label: 'vec_0 idle gap · 80μs',
      annotation: '作者说: 这正是 cube 等的那 80μs — vec 完全没事干。',
      tone: 'warn',
      autoExpand: ['AIV'],
    },
    3: {
      lanes: ['aic_0', 'aic_1', 'aiv_0', 'aiv_1'],
      range: [40, 280],
      label: 'cube/vec 串行 · mix_mode=sequential',
      annotation: '作者说: AIC 在跑时 AIV 全空，反过来也一样。改 mix_mode 试试。',
      tone: 'warn',
      autoExpand: ['AIC', 'AIV'],
    },
    4: {
      lanes: ['aic_0', 'aiv_0'],
      range: [40, 280],
      label: '改 mix_mode=parallel 后仍串行',
      annotation: '作者说: 假设被证伪 — 不是 mix_mode 问题。',
      tone: 'bad',
      autoExpand: ['AIC', 'AIV'],
    },
    5: {
      lanes: ['aic_0', 'aiv_0'],
      range: [50, 240],
      label: 'IR: cube/vec 在不同 scope',
      annotation: '作者说: scope 没合 → 调度器无法重叠它们。这是编译期决策。',
      tone: 'bad',
      autoExpand: ['AIC', 'AIV'],
    },
    6: { // cross-mode: shown in compile mode
      lanes: [],
      range: [0, 500],
      label: '跳到 Compile · AxisFusion Pass',
      annotation: '',
      tone: 'info',
    },
    7: {
      lanes: ['__aggregate__AIC', '__aggregate__AIV'],
      range: [30, 480],
      label: '重跑后: cube_util 71% · 提速 2.1×',
      annotation: '作者说: cube/vec 现在能并行了 — axis_fusion + stitch_mode=concat 的组合很优雅。',
      tone: 'ok',
      autoExpand: ['AIC', 'AIV'],
    },
  };

  // ---------- "after fix" aggregate (for exp table & Step 7 view) ----------
  const runAfter = {
    cubeUtil: 0.71,
    vecIdle: 0.18,
    speedup: 1.06,
    aicAggregate: 0.71,
    aivAggregate: 0.68,
  };

  window.SWIMLANE = {
    duration: 500,
    lanes,
    groups,
    highlights,
    runAfter,
  };
})();
