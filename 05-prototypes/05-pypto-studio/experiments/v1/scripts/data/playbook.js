/* ===================================================================
 * PyPTO Studio · Playbook · "Mix 流水阻塞"
 * 数据等级 L3。
 * 每步结构: { see, suspect, try, branches } ——
 *   "看到 X · 怀疑 Y · 试 Z" 三段卡片 + 决策分支
 * =================================================================== */

window.PLAYBOOK = {
  id: 'mix_pipeline_block',
  name: 'Mix 流水阻塞',
  author: { name: '张明', team: '性能调优组', avatar: '张' },
  stats: { uses: 47, success: 0.89, avgMin: 8 },
  symptom: 'cube_util 偏低 + vec 大段 idle + mix=sequential',
  steps: [
    {
      n: 1,
      title: '症状确认',
      mode: 'runtime',
      see: {
        title: 'Cube 利用率 28% · 持续 120μs',
        bullets: [
          'AIC 聚合利用率 28%（基线 65%+ 才算健康）',
          '低利用率窗口连续 120μs，不是抖动',
          'vec 同期 idle 68% → 不是 cube 自己慢',
        ],
        metric: { cube: 0.28, vec_idle: 0.68, window: '50–170μs' },
      },
      suspect: {
        text: 'Cube 真的在等什么 — 不是计算瓶颈，是<b>调度瓶颈</b>。',
        because: '如果 cube 自己慢，vec 应该也忙；现在 vec 比 cube 还闲 → 一定是两者被串起来了。',
      },
      try: {
        text: '切到 vec stream 看同一时间窗口有没有 gap。',
        action: { kind: 'focus', target: 'AIV', autoExpand: ['AIV'], rangeUs: [160, 240] },
        cta: '展开 AIV · 看 vec_0',
      },
      branches: [
        { label: '✓ 确认 vec 有 idle gap', target: 2, primary: true },
        { label: '× vec 也满载', target: 'leave', note: '换 "Cube 单核利用率" Playbook' },
      ],
    },

    {
      n: 2,
      title: '验证 vec idle',
      mode: 'runtime',
      see: {
        title: 'vec_0 在 t=160–240μs 完全空 · gap = 80μs',
        bullets: [
          'vec_0 stream 在这个窗口没有任何 op',
          '此时 cube 在跑 matmul_8x16x32',
          'AIV[1..15] 同样 idle（不是单核问题）',
        ],
        metric: { gap_us: 80, while_cube: 'matmul_8x16x32', affected: 'AIV[0..15]' },
      },
      suspect: {
        text: 'vec 没被调度 — <b>cube 跑时 vec 被强制等</b>。',
        because: '正常的 mix kernel 中 cube/vec 应该有重叠；这里完全互斥 → 调度策略锁了。',
      },
      try: {
        text: '看当前 mix_mode 配置。',
        action: { kind: 'highlight-knob', knob: 'mix_mode' },
        cta: '高亮底栏 mix_mode',
      },
      branches: [
        { label: '✓ mix_mode = sequential', target: 3, primary: true },
        { label: '× mix_mode 已是 parallel', target: 5, note: '直接跳调度根因' },
      ],
    },

    {
      n: 3,
      title: '试 · mix_mode = parallel',
      mode: 'runtime',
      see: {
        title: '当前 mix_mode = sequential',
        bullets: [
          '这个值会让 MixSchedule 把 cube/vec 串行排',
          'parallel 模式下两者会被尽量重叠',
        ],
        metric: { current: 'sequential', try: 'parallel' },
      },
      suspect: {
        text: '改成 parallel 应该能让 vec 在 cube 跑时也开起来。',
        because: '默认场景下 parallel 通常优于 sequential — 至少不会更差。',
      },
      try: {
        text: '把 mix_mode 改成 parallel，重跑这次 kernel。',
        action: { kind: 'change-knob', knob: 'mix_mode', value: 'parallel', triggerRerun: true },
        cta: '改并重跑',
      },
      branches: [
        { label: '▶ 重跑（用户操作）', target: 4, primary: true, requiresAction: true },
        { label: '跳过这一步', target: 5 },
      ],
    },

    {
      n: 4,
      title: '假设被证伪',
      mode: 'runtime',
      see: {
        title: '改完后 cube_util = 36% · 仅 +8pp · 仍串行',
        bullets: [
          '泳道图: AIC/AIV 还是基本不重叠',
          'mix_mode = parallel 没生效？还是有更深的原因？',
          '提示: 看 IR — 调度器看到的 scope 是什么样的',
        ],
        metric: { before: 0.28, after: 0.36, expected_min: 0.55 },
      },
      suspect: {
        text: '<b>不是 mix_mode 的问题</b>。调度器拿到的 scope 本身就不让并行。',
        because: 'parallel 模式只能在"同一个 scope 里"重叠 op；如果 cube/vec 被切到两个 scope，怎么改都没用。',
      },
      try: {
        text: '看 IR scope 划分。',
        action: { kind: 'open-ir', view: 'scope' },
        cta: '打开 IR · scope 视图',
      },
      branches: [
        { label: '✓ 看 IR · 发现 scope 分离', target: 5, primary: true },
      ],
    },

    {
      n: 5,
      title: '根因 · 编译期决策',
      mode: 'runtime',
      bridge: true,
      see: {
        title: 'IR: cube_scope / vec_scope 是分离的',
        bullets: [
          '调度器看到的是两个独立 scope',
          'scope 没合 → MixSchedule 无法跨 scope 重叠',
          '<b>scope 没合的原因是 axis_fusion 在编译期被禁了</b>',
        ],
        ir: {
          before: '// 当前\nscope cube_scope {\n  %0 = matmul(%a, %b)\n}\nscope vec_scope {\n  %1 = softmax(%0)\n}',
          after:  '// 期望（axis_fusion=on）\nscope mixed_scope {\n  %0 = matmul(%a, %b)\n  %1 = softmax(%0)\n}',
        },
      },
      suspect: {
        text: '嫌疑回到<b>编译期</b> — 当时 axis_fusion 被关，是因为 OoOSchedule Pass 炸了。',
        because: '关 axis_fusion 解决了编译失败，但代价是 scope 不合 → 运行期串行 → 慢。这就是"修了编译但藏了性能债"。',
      },
      try: {
        text: '跳到 Compile · Pass Tracer 看 AxisFusion 当时为什么炸。',
        action: { kind: 'cross-mode', to: 'compile', pass: 'AxisFusion', reason: '从 Playbook Step 5 跳来 — 查 axis_fusion 当时为何被禁' },
        cta: '🔗 跳到 Compile 模式',
        emphasis: true,
      },
      branches: [
        { label: '→ 进入 Compile 模式', target: 6, primary: true, requiresAction: true },
      ],
    },

    {
      n: 6,
      title: '在 Compile 模式: 找到绕过方案',
      mode: 'compile',
      see: {
        title: 'AxisFusion 当时炸在 OoOSchedule · cube/vec 合并后 OoO 排不开',
        bullets: [
          'V4 Suspect Ranking 当时 87% 怀疑 axis_fusion · 用户关掉了',
          '但 stitch_mode=concat 能让 cube/vec 合并后仍可被 OoO 排开',
          '社区 Playbook 中标注: "OoOSchedule 炸 → 试 stitch_mode=concat"',
        ],
      },
      suspect: {
        text: '<b>正确的组合应该是 axis_fusion=on + stitch_mode=concat</b>，而不是关掉 axis_fusion。',
        because: '关 axis_fusion 是错误的"快速修复" — 它让编译过但藏了性能问题。stitch_mode=concat 才是根治。',
      },
      try: {
        text: '同时打开 axis_fusion，并设 stitch_mode = concat，重新编译 + 重跑。',
        action: { kind: 'change-knobs', changes: { enable_axis_fusion: 'on', stitch_mode: 'concat' }, triggerRecompile: true },
        cta: '改并重新编译',
        emphasis: true,
      },
      branches: [
        { label: '▶ 重新编译 + 重跑', target: 7, primary: true, requiresAction: true },
      ],
    },

    {
      n: 7,
      title: '验收 · 沉淀',
      mode: 'runtime',
      see: {
        title: '重跑后: cube_util 71% · runtime 1.06× baseline · 提速 2.1×',
        bullets: [
          'AIC 聚合从 28% → 71%',
          'AIV idle 从 68% → 18%',
          'cube/vec 在泳道图上明显重叠',
        ],
        metric: { cube_before: 0.28, cube_after: 0.71, speedup_before: 2.3, speedup_after: 1.06 },
      },
      suspect: {
        text: '成功 — 这次的"症状指纹 → 处方"值得沉淀回 Playbook。',
        because: '原 Playbook 没有"axis_fusion + stitch_mode=concat"这条分支；你这次发现的路径可以让下一个工程师少走 5 步。',
      },
      try: {
        text: '把这次走过的路径贡献回 Playbook。',
        action: { kind: 'open-contribute' },
        cta: '⤴ 贡献回 Playbook',
        emphasis: true,
      },
      branches: [
        { label: '✓ 完成', target: 'done', primary: true },
      ],
    },
  ],
};
