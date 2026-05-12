/* ===================================================================
 * PyPTO Studio · Symptom Fingerprint Library
 * 数据等级 L3。每个 Playbook 都有一条"症状指纹"作为索引键；
 * 工具用当前 session 指纹与库里指纹做 Jaccard-ish 距离匹配，给出 Top-K 候选。
 * =================================================================== */

window.FINGERPRINT = {
  // 当前 session 的特征向量
  current: {
    cube_util: 0.28,
    vec_idle: 0.68,
    mix_mode: 'sequential',
    dma_busy: 'normal',
    pipe_depth: 'shallow',
    scope_split: true,
  },

  // 已沉淀的 Playbook（带各自的"症状指纹"）
  candidates: [
    {
      playbook: 'mix_pipeline_block',
      name: 'Mix 流水阻塞',
      author: '@张明',
      team: '性能调优组',
      uses: 47,
      success: 0.89,
      avgMin: 8,
      match: 0.89,
      fingerprint: {
        cube_util: '<0.40',
        vec_idle: '>0.50',
        mix_mode: 'sequential',
        scope_split: true,
      },
      matchExplain: [
        { signal: 'cube_util 28% < 40%', hit: true },
        { signal: 'vec_idle 68% > 50%',  hit: true },
        { signal: 'mix_mode = sequential', hit: true },
        { signal: 'scope_split = true',    hit: true },
      ],
    },
    {
      playbook: 'cube_single_core_low',
      name: 'Cube 单核利用率低',
      author: '@李华',
      team: '算子优化组',
      uses: 23,
      success: 0.74,
      avgMin: 12,
      match: 0.62,
      fingerprint: {
        cube_util: '<0.50',
        per_core_imbalance: '>0.30',
      },
      matchExplain: [
        { signal: 'cube_util 28% < 50%', hit: true },
        { signal: 'per_core_imbalance ≈ 0.18 < 0.30', hit: false, hint: '本 session 单核相对均衡' },
      ],
    },
    {
      playbook: 'dma_bandwidth_bottleneck',
      name: 'DMA 带宽瓶颈',
      author: '@王芳',
      team: 'IO 优化组',
      uses: 12,
      success: 0.67,
      avgMin: 15,
      match: 0.41,
      fingerprint: {
        dma_busy: '>0.80',
        mte_in_p99: '>40μs',
      },
      matchExplain: [
        { signal: 'dma_busy normal (~0.42)', hit: false, hint: 'DMA 不是瓶颈' },
        { signal: 'mte_in_p99 ≈ 28μs', hit: false },
      ],
    },
  ],
};
