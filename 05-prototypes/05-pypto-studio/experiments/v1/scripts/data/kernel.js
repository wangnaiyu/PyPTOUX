/* ===================================================================
 * PyPTO Studio · Kernel Session State
 * 数据等级 L3。session/旋钮/历次 run 的当前状态。
 * =================================================================== */

window.KERNEL = {
  session: '#c4a7e21',
  kernel: 'glm_attention.py',
  device: 'Ascend910B',
  compile: { status: 'ok', durationS: 1.8 },
  runtime: { status: 'warn', speedup: 2.3, cubeUtil: 0.28, vecIdle: 0.68, baseline: 1.0 },

  // 同一组旋钮 · 编译期决定 Pass 路径 · 运行期决定调度
  // 来历列说明该旋钮当前值的"由来"，用于在 UI 上提示用户。
  knobs: [
    {
      id: 'enable_axis_fusion',
      label: 'axis_fusion',
      type: 'toggle',
      value: 'off',
      values: ['on', 'off'],
      from: 'Pass Tracer 第一幕关闭（OoOSchedule 炸）',
      affects: { compile: 'AxisFusion → OoOSchedule', runtime: 'cube/vec scope 是否合并' },
      hot: true,
    },
    {
      id: 'enable_unroll',
      label: 'unroll',
      type: 'toggle',
      value: 'on',
      values: ['on', 'off'],
      from: '默认',
      affects: { compile: 'LoopUnroll Pass', runtime: '指令并行度' },
    },
    {
      id: 'mix_mode',
      label: 'mix_mode',
      type: 'select',
      value: 'sequential',
      values: ['sequential', 'parallel', 'pipelined'],
      from: '默认',
      affects: { compile: 'MixSchedule 策略', runtime: 'cube/vec 并行性' },
      hot: true,
    },
    {
      id: 'stitch_mode',
      label: 'stitch_mode',
      type: 'select',
      value: 'none',
      values: ['none', 'concat', 'split'],
      from: '默认',
      affects: { compile: 'StitchFusion Pass', runtime: '中间产物落盘' },
    },
    {
      id: 'block_dim',
      label: 'block_dim',
      type: 'number',
      value: 24,
      values: [8, 16, 24, 32, 48],
      from: 'matmul shape 推导',
      affects: { compile: 'BlockTiling', runtime: 'core 占用' },
    },
  ],

  // 同 session 的历次 run
  runs: [
    {
      id: 'run1',
      seq: 1,
      knobs: { axis_fusion: 'on', unroll: 'on', mix_mode: 'sequential', stitch_mode: 'none', block_dim: 24 },
      compile: 'fail',
      compileError: 'AxisFusion → OoOSchedule',
      runtime: null,
      note: '编译期炸',
    },
    {
      id: 'run2',
      seq: 2,
      knobs: { axis_fusion: 'off', unroll: 'on', mix_mode: 'sequential', stitch_mode: 'none', block_dim: 24 },
      compile: 'ok',
      runtime: { speedup: 2.3, cubeUtil: 0.28 },
      current: true,
      note: '当前 · 编译过 · 跑得慢',
    },
    // run3..6 在 Playbook 走完后陆续追加
  ],
};

// 当前 step 在 Playbook 里的进度
window.SESSION_STATE = {
  mode: 'runtime',       // 'runtime' | 'compile'
  currentStep: 1,        // playbook step index (1..7)
  visitedSteps: [1],     // 已走过的 step
  branchTaken: {},       // stepIndex -> branch decision
  contributeSeen: false,
};
