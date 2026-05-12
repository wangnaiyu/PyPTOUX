const GROUPS = {
  "1": {
    lens: "Cube Arithmetic View",
    title: "Cube Arithmetic Instruction Pressure",
    desc: "只突出 AIC / Cube 算术指令压力；AIV lane 作为 peer / wait 上下文。",
    wrapTitle: "Wrap Cube-side Diagnosis",
    badge: "AIC arithmetic",
    goals: [
      "找出 Cube FP / INT 指令 busy 最高的 AIC task。",
      "判断 long AIC task 是否由 Cube arithmetic 解释。",
      "比较同 Wrap 内 C task 的 Cube pressure 与 V task 的等待关系。",
      "识别 long AIC task + low cube busy，提示转看 group 2 / 4 / 5 / 6。"
    ],
    legend: [
      ["negative", "Low arithmetic coverage", "AIC task 很长但 Cube FP / INT 不高，可能不是算术瓶颈。"],
      ["neutral", "Explained by Cube", "AIC task 的 Cube FP / INT 能解释主要耗时。"],
      ["positive", "Cube arithmetic pressure", "Cube 算术指令显著集中，优先看 C 侧计算。"]
    ],
    counters: [
      c("cube_fp_instr_busy", "Cube FP", "cycle", "cube", "Cube FP arithmetic"),
      c("cube_int_instr_busy", "Cube INT", "cycle", "fix", "Cube INT arithmetic")
    ],
    primaryLanes: ["AIC"],
    metric: "pressure"
  },
  "2": {
    lens: "Pipeline Balance View",
    title: "AIC / AIV Pipeline Balance",
    desc: "按 lane 聚合 wall-clock、cycle-like counter 与 gap；用于回答“谁占流水更多、谁拖尾”。",
    wrapTitle: "Wrap Pipeline Diagnosis",
    badge: "C / V balance",
    goals: [
      "一眼比较 AIC / AIV0 / AIV1 的 pipeline 占比。",
      "识别 clc_cycle < total_cycle 的 uncovered / wait suspect。",
      "识别 clc_cycle > total_cycle 的 overlap / double-count suspect。",
      "从 dominant counter 追溯到硬件 pipe 和 peer task。"
    ],
    legend: [
      ["negative", "Uncovered", "clc_cycle < total_cycle，疑似等待、空洞、未覆盖 stall。"],
      ["neutral", "Accounted", "clc_cycle 接近 total_cycle，pipeline 覆盖接近 wall-clock。"],
      ["positive", "Overlap", "clc_cycle > total_cycle，可能存在 pipeline 重叠或 double-count 风险。"]
    ],
    counters: [
      c("pmu_idc_aic_vec_busy_o", "AIC/VEC", "cycle", "vec", "Vector / IDC"),
      c("cube_instr_busy", "Cube", "cycle", "cube", "Cube"),
      c("scalar_instr_busy", "Scalar", "cycle", "scalar", "Scalar issue"),
      c("mte1_instr_busy", "MTE1", "cycle", "mte1", "L1 -> L0"),
      c("mte2_instr_busy", "MTE2", "cycle", "mte2", "GM/L2 -> local buffer"),
      c("mte3_instr_busy", "MTE3", "cycle", "mte3", "local buffer -> GM/L2"),
      c("pmu_fix_instr_busy", "FixPipe", "cycle", "fix", "L0C -> FixPipe -> GM/L1"),
      c("icache_req", "I$ req", "event", "scalar", "I-cache request"),
      c("icache_miss", "I$ miss", "event", "scalar", "I-cache miss")
    ],
    primaryLanes: ["AIC", "AIV0", "AIV1"],
    metric: "coverage"
  },
  "4": {
    lens: "Memory Access Flow View",
    title: "Main Memory + AIV / UB / L1 Access Flow",
    desc: "把 task 拆成 main、UB/ACC、L1 三类访问，判断数据是否在 GM/L2、L1、UB 间来回震荡。",
    wrapTitle: "Wrap Memory Exchange Diagnosis",
    badge: "main / UB / L1",
    goals: [
      "找出主存读写压力最高的 task。",
      "找出 AIV UB read / write 最高的 task。",
      "比较 AIC / AIV lane 的 memory access pressure。",
      "判断某个 Wrap 的 C/V 之间是否存在过多中间数据交换。"
    ],
    legend: [
      ["negative", "Main memory pressure", "long task + high main read/write，提示 GM/L2 数据流压力。"],
      ["neutral", "UB / ACC pressure", "AIV 后处理大量读写 UB / ACC。"],
      ["positive", "L1 pressure", "AIC 侧 L1 read/write 较高，需看 TileShape / reuse。"]
    ],
    counters: [
      c("bif_sc_pmu_read_main_instr_core", "Main RD", "count", "mainmem", "GM/L2 read"),
      c("bif_sc_pmu_write_main_instr_core", "Main WR", "count", "mainmem", "GM/L2 write"),
      c("pmu_aiv_ext_rd_ub_instr", "AIV UB RD", "count", "ub", "AIV ext read UB"),
      c("ub_pmu_vec_rd_ub_acc", "Vec UB RD", "count", "ub", "Vector read UB/ACC"),
      c("pmu_aiv_ext_wr_ub_instr", "AIV UB WR", "count", "ub", "AIV ext write UB"),
      c("ub_pmu_vec_wr_ub_acc", "Vec UB WR", "count", "ub", "Vector write UB/ACC"),
      c("pmu_rd_l1_instr", "L1 RD", "count", "l1", "L1 read"),
      c("pmu_wr_l1_instr", "L1 WR", "count", "l1", "L1 write")
    ],
    primaryLanes: ["AIC", "AIV0", "AIV1"],
    metric: "pressure"
  },
  "5": {
    lens: "Cube L0 Path View",
    title: "Cube L0 / L0C / FixPipe-adjacent Path",
    desc: "AIC / Cube 核内路径深钻，重点看 L0A、L0B、L0C 和 FixPipe 读 L0C。",
    wrapTitle: "Wrap AIC Core-local Diagnosis",
    badge: "L0 / L0C",
    goals: [
      "判断 L0A / L0B 输入是否均衡。",
      "判断 L0C read/write 是否异常高。",
      "找出 fixp_rd_l0c_instr 高的 task，追溯 FixPipe / output path。",
      "识别 Cube busy 不高但 L0 访问高，提示核内数据路径低效。"
    ],
    legend: [
      ["negative", "Input imbalance", "L0A / L0B 输入读写不均衡，可能与 TileShape 有关。"],
      ["neutral", "L0C pressure", "L0C read/write 高，关注累加或输出路径。"],
      ["positive", "FixPipe-adjacent", "fixp_rd_l0c_instr 高，优先追 FixPipe / output path。"]
    ],
    counters: [
      c("cube_sc_pmu_read_l0a_instr", "L0A RD", "count", "l0a", "Cube read L0A"),
      c("pmu_wr_l0a_instr", "L0A WR", "count", "l0a", "Write L0A"),
      c("cube_sc_pmu_read_l0b_instr", "L0B RD", "count", "l0b", "Cube read L0B"),
      c("pmu_wr_l0b_instr", "L0B WR", "count", "l0b", "Write L0B"),
      c("fixp_rd_l0c_instr", "Fix rd L0C", "count", "fix", "FixPipe read L0C"),
      c("cube_sc_pmu_read_l0c_instr", "L0C RD", "count", "l0c", "Cube read L0C"),
      c("cube_sc_pmu_write_l0c_instr", "L0C WR", "count", "l0c", "Cube write L0C")
    ],
    primaryLanes: ["AIC"],
    metric: "pressure"
  },
  "6": {
    lens: "Conflict / Issue View",
    title: "UB Conflict / Issue / VF Pressure",
    desc: "不做 clc_cycle 求和主视角，用 conflict severity、issue density、task duration 共同排序。",
    wrapTitle: "Wrap Conflict Diagnosis",
    badge: "conflict severity",
    goals: [
      "识别 UB write-control conflict 高的 task。",
      "识别 load / IB / UB conflict 高的 task。",
      "判断 VF busy 是否集中在某些 AIV 或 Mix task。",
      "区分 pipeline 没忙起来是等待、冲突，还是 issue 限制。"
    ],
    legend: [
      ["negative", "Conflict-driven", "long task + high conflict，优先看 UB / load-store 结构。"],
      ["neutral", "Issue-limited", "idu issue count 或 VF busy 异常，关注发射与 VF 路径。"],
      ["positive", "Explain gap", "group 2/4/5 解释不了时，用本组查资源冲突。"]
    ],
    counters: [
      c("stu_pmu_wctl_ub_cflt", "STU UB cflt", "count", "conflict", "UB write-control conflict"),
      c("ldu_pmu_ib_ub_cflt", "LDU UB cflt", "count", "conflict", "Load / IB / UB conflict"),
      c("pmu_idc_aic_vec_instr_vf_busy_o", "VF busy", "count", "vec", "VF instruction busy"),
      c("idu_pmu_ins_iss_cnt", "Issue cnt", "count", "issuepipe", "Instruction issue count")
    ],
    primaryLanes: ["AIC", "AIV0", "AIV1"],
    metric: "severity"
  },
  "7": {
    lens: "Local Buffer Pressure View",
    title: "ACC / UB / MTE Local Access Pressure",
    desc: "AIV lane 优先，展示 ACC/UB read、ACC/UB write、MTE read/write、Fix write UB。",
    wrapTitle: "Wrap Local Buffer Diagnosis",
    badge: "UB / ACC / MTE",
    goals: [
      "找出 UB / ACC 读写最重的 AIV task。",
      "判断 Vector 后处理是否被本地 buffer 访问主导。",
      "识别 MTE read/write ACC/UB 造成的本地通路压力。",
      "找出 pmu_fix_wr_ub_instr 高的输出类 task。"
    ],
    legend: [
      ["negative", "UB-read dominated", "Vector 后处理受 UB / ACC read 主导。"],
      ["neutral", "UB-write dominated", "UB / ACC write 高，关注输出或中间结果。"],
      ["positive", "MTE-local pressure", "MTE 读写 ACC/UB 高，关注本地 buffer 到搬运路径。"]
    ],
    counters: [
      c("pmu_rd_acc_ub_instr_p", "ACC/UB RD", "count", "ub", "Read ACC/UB"),
      c("pmu_wr_acc_ub_instr_p", "ACC/UB WR", "count", "ub", "Write ACC/UB"),
      c("pmu_fix_wr_ub_instr", "Fix WR UB", "count", "fix", "FixPipe write UB"),
      c("mte_sc_pmu_write_acc_ub_instr_0", "MTE WR UB", "count", "mte3", "MTE write ACC/UB"),
      c("mte_sc_pmu_read_acc_ub_instr_0", "MTE RD UB", "count", "mte2", "MTE read ACC/UB"),
      c("ub_pmu_vec_rd_ub_acc", "Vec RD UB", "count", "vec", "Vector read UB/ACC"),
      c("ub_pmu_vec_wr_ub_acc", "Vec WR UB", "count", "vec", "Vector write UB/ACC")
    ],
    primaryLanes: ["AIV0", "AIV1"],
    metric: "pressure"
  },
  "8": {
    lens: "L2 Efficiency View",
    title: "L2 Hit / Miss / Victim Efficiency",
    desc: "展示 AR/AW hit-miss-victim ratio，判断问题偏读侧还是写侧，以及是否存在 cache churn。",
    wrapTitle: "Wrap L2 Efficiency Diagnosis",
    badge: "hit / miss / victim",
    goals: [
      "计算 read hit rate、write hit rate。",
      "找出 read miss / write miss / victim 最高的 task。",
      "判断问题偏读侧还是写侧。",
      "按 Wrap 聚合 L2 efficiency，看哪些 Wrap 破坏局部性。"
    ],
    legend: [
      ["negative", "High miss", "read/write miss 高，提示 GM/L2 访问效率差。"],
      ["neutral", "High victim", "victim 高，提示 cache churn / 复用失败。"],
      ["positive", "Reuse effective", "hit rate 高，说明该层复用相对有效。"]
    ],
    counters: [
      c("bif_sc_pmu_ar_close_l2_hit_core", "AR hit", "count", "hit", "L2 read hit"),
      c("bif_sc_pmu_ar_close_l2_miss_core", "AR miss", "count", "miss", "L2 read miss"),
      c("bif_sc_pmu_ar_close_l2_victim_core", "AR victim", "count", "victim", "L2 read victim"),
      c("bif_sc_pmu_aw_close_l2_hit_core", "AW hit", "count", "hit", "L2 write hit"),
      c("bif_sc_pmu_aw_close_l2_miss_core", "AW miss", "count", "miss", "L2 write miss"),
      c("bif_sc_pmu_aw_close_l2_victim_core", "AW victim", "count", "victim", "L2 write victim")
    ],
    primaryLanes: ["AIC", "AIV0", "AIV1"],
    metric: "efficiency"
  }
};

const BASE_TASKS = [
  base("w0c", "W0", "AIC", "CALL Q-MatMul", 0, 1500, { waitFor: null }),
  base("w0v0", "W0", "AIV0", "Dequant + RoPE", 260, 1280, { waitFor: "w0c", waitCycle: 220 }),
  base("w0v1", "W0", "AIV1", "Softmax prep", 300, 1020, { waitFor: "w0c", waitCycle: 110 }),
  base("w1c", "W1", "AIC", "CALL Cache-MatMul", 1680, 1160, { waitFor: null }),
  base("w1v0", "W1", "AIV0", "Vector normalize", 1740, 1710, { waitFor: "w1c", waitCycle: 430 }),
  base("w1v1", "W1", "AIV1", "Cast + mask", 1760, 980, { waitFor: null }),
  base("w2c", "W2", "AIC", "OutCast / Fix", 3620, 1380, { waitFor: null }),
  base("w2v0", "W2", "AIV0", "Copy out V0", 3560, 1080, { waitFor: null }),
  base("w2v1", "W2", "AIV1", "Copy out V1", 3580, 1190, { waitFor: null })
];

const VALUES = {
  "1": {
    w0c: { cube_fp_instr_busy: 740, cube_int_instr_busy: 110 }, w1c: { cube_fp_instr_busy: 520, cube_int_instr_busy: 90 }, w2c: { cube_fp_instr_busy: 220, cube_int_instr_busy: 70 },
    w0v0: { cube_fp_instr_busy: 0, cube_int_instr_busy: 0 }, w0v1: { cube_fp_instr_busy: 0, cube_int_instr_busy: 0 }, w1v0: { cube_fp_instr_busy: 0, cube_int_instr_busy: 0 }, w1v1: { cube_fp_instr_busy: 0, cube_int_instr_busy: 0 }, w2v0: { cube_fp_instr_busy: 0, cube_int_instr_busy: 0 }, w2v1: { cube_fp_instr_busy: 0, cube_int_instr_busy: 0 }
  },
  "2": {
    w0c: { cube_instr_busy: 640, scalar_instr_busy: 90, mte1_instr_busy: 220, mte2_instr_busy: 330, mte3_instr_busy: 40, pmu_fix_instr_busy: 260, pmu_idc_aic_vec_busy_o: 0, icache_req: 96, icache_miss: 4 },
    w0v0: { pmu_idc_aic_vec_busy_o: 520, scalar_instr_busy: 70, mte2_instr_busy: 210, mte3_instr_busy: 180, cube_instr_busy: 0, mte1_instr_busy: 0, pmu_fix_instr_busy: 0, icache_req: 120, icache_miss: 12 },
    w0v1: { pmu_idc_aic_vec_busy_o: 430, scalar_instr_busy: 58, mte2_instr_busy: 160, mte3_instr_busy: 142, cube_instr_busy: 0, mte1_instr_busy: 0, pmu_fix_instr_busy: 0, icache_req: 88, icache_miss: 7 },
    w1c: { cube_instr_busy: 560, scalar_instr_busy: 76, mte1_instr_busy: 180, mte2_instr_busy: 248, mte3_instr_busy: 38, pmu_fix_instr_busy: 190, pmu_idc_aic_vec_busy_o: 0, icache_req: 82, icache_miss: 3 },
    w1v0: { pmu_idc_aic_vec_busy_o: 460, scalar_instr_busy: 82, mte2_instr_busy: 290, mte3_instr_busy: 310, cube_instr_busy: 0, mte1_instr_busy: 0, pmu_fix_instr_busy: 0, icache_req: 164, icache_miss: 23 },
    w1v1: { pmu_idc_aic_vec_busy_o: 330, scalar_instr_busy: 62, mte2_instr_busy: 156, mte3_instr_busy: 128, cube_instr_busy: 0, mte1_instr_busy: 0, pmu_fix_instr_busy: 0, icache_req: 72, icache_miss: 5 },
    w2c: { cube_instr_busy: 310, scalar_instr_busy: 66, mte1_instr_busy: 88, mte2_instr_busy: 190, mte3_instr_busy: 240, pmu_fix_instr_busy: 680, pmu_idc_aic_vec_busy_o: 0, icache_req: 70, icache_miss: 2 },
    w2v0: { pmu_idc_aic_vec_busy_o: 220, scalar_instr_busy: 44, mte2_instr_busy: 130, mte3_instr_busy: 620, cube_instr_busy: 0, mte1_instr_busy: 0, pmu_fix_instr_busy: 0, icache_req: 60, icache_miss: 3 },
    w2v1: { pmu_idc_aic_vec_busy_o: 260, scalar_instr_busy: 48, mte2_instr_busy: 150, mte3_instr_busy: 690, cube_instr_busy: 0, mte1_instr_busy: 0, pmu_fix_instr_busy: 0, icache_req: 64, icache_miss: 3 }
  },
  "4": {
    w0c: { bif_sc_pmu_read_main_instr_core: 260, bif_sc_pmu_write_main_instr_core: 90, pmu_rd_l1_instr: 330, pmu_wr_l1_instr: 160 },
    w0v0: { pmu_aiv_ext_rd_ub_instr: 240, ub_pmu_vec_rd_ub_acc: 420, pmu_aiv_ext_wr_ub_instr: 180, ub_pmu_vec_wr_ub_acc: 300, bif_sc_pmu_read_main_instr_core: 80, bif_sc_pmu_write_main_instr_core: 120 },
    w0v1: { pmu_aiv_ext_rd_ub_instr: 190, ub_pmu_vec_rd_ub_acc: 360, pmu_aiv_ext_wr_ub_instr: 150, ub_pmu_vec_wr_ub_acc: 260, bif_sc_pmu_read_main_instr_core: 60, bif_sc_pmu_write_main_instr_core: 80 },
    w1c: { bif_sc_pmu_read_main_instr_core: 220, bif_sc_pmu_write_main_instr_core: 70, pmu_rd_l1_instr: 260, pmu_wr_l1_instr: 120 },
    w1v0: { pmu_aiv_ext_rd_ub_instr: 360, ub_pmu_vec_rd_ub_acc: 620, pmu_aiv_ext_wr_ub_instr: 260, ub_pmu_vec_wr_ub_acc: 510, bif_sc_pmu_read_main_instr_core: 160, bif_sc_pmu_write_main_instr_core: 210 },
    w1v1: { pmu_aiv_ext_rd_ub_instr: 160, ub_pmu_vec_rd_ub_acc: 280, pmu_aiv_ext_wr_ub_instr: 120, ub_pmu_vec_wr_ub_acc: 190, bif_sc_pmu_read_main_instr_core: 50, bif_sc_pmu_write_main_instr_core: 70 },
    w2c: { bif_sc_pmu_read_main_instr_core: 150, bif_sc_pmu_write_main_instr_core: 260, pmu_rd_l1_instr: 160, pmu_wr_l1_instr: 220 },
    w2v0: { pmu_aiv_ext_rd_ub_instr: 120, ub_pmu_vec_rd_ub_acc: 240, pmu_aiv_ext_wr_ub_instr: 320, ub_pmu_vec_wr_ub_acc: 620, bif_sc_pmu_read_main_instr_core: 80, bif_sc_pmu_write_main_instr_core: 310 },
    w2v1: { pmu_aiv_ext_rd_ub_instr: 130, ub_pmu_vec_rd_ub_acc: 260, pmu_aiv_ext_wr_ub_instr: 350, ub_pmu_vec_wr_ub_acc: 680, bif_sc_pmu_read_main_instr_core: 84, bif_sc_pmu_write_main_instr_core: 340 }
  },
  "5": {
    w0c: { cube_sc_pmu_read_l0a_instr: 380, pmu_wr_l0a_instr: 320, cube_sc_pmu_read_l0b_instr: 410, pmu_wr_l0b_instr: 350, fixp_rd_l0c_instr: 120, cube_sc_pmu_read_l0c_instr: 210, cube_sc_pmu_write_l0c_instr: 330 },
    w1c: { cube_sc_pmu_read_l0a_instr: 300, pmu_wr_l0a_instr: 250, cube_sc_pmu_read_l0b_instr: 310, pmu_wr_l0b_instr: 260, fixp_rd_l0c_instr: 100, cube_sc_pmu_read_l0c_instr: 160, cube_sc_pmu_write_l0c_instr: 240 },
    w2c: { cube_sc_pmu_read_l0a_instr: 160, pmu_wr_l0a_instr: 140, cube_sc_pmu_read_l0b_instr: 165, pmu_wr_l0b_instr: 145, fixp_rd_l0c_instr: 610, cube_sc_pmu_read_l0c_instr: 420, cube_sc_pmu_write_l0c_instr: 500 }
  },
  "6": {
    w0c: { stu_pmu_wctl_ub_cflt: 16, ldu_pmu_ib_ub_cflt: 22, pmu_idc_aic_vec_instr_vf_busy_o: 80, idu_pmu_ins_iss_cnt: 520 },
    w0v0: { stu_pmu_wctl_ub_cflt: 60, ldu_pmu_ib_ub_cflt: 88, pmu_idc_aic_vec_instr_vf_busy_o: 260, idu_pmu_ins_iss_cnt: 680 },
    w0v1: { stu_pmu_wctl_ub_cflt: 40, ldu_pmu_ib_ub_cflt: 56, pmu_idc_aic_vec_instr_vf_busy_o: 210, idu_pmu_ins_iss_cnt: 520 },
    w1c: { stu_pmu_wctl_ub_cflt: 14, ldu_pmu_ib_ub_cflt: 18, pmu_idc_aic_vec_instr_vf_busy_o: 65, idu_pmu_ins_iss_cnt: 450 },
    w1v0: { stu_pmu_wctl_ub_cflt: 140, ldu_pmu_ib_ub_cflt: 170, pmu_idc_aic_vec_instr_vf_busy_o: 340, idu_pmu_ins_iss_cnt: 840 },
    w1v1: { stu_pmu_wctl_ub_cflt: 38, ldu_pmu_ib_ub_cflt: 48, pmu_idc_aic_vec_instr_vf_busy_o: 180, idu_pmu_ins_iss_cnt: 470 },
    w2c: { stu_pmu_wctl_ub_cflt: 28, ldu_pmu_ib_ub_cflt: 42, pmu_idc_aic_vec_instr_vf_busy_o: 72, idu_pmu_ins_iss_cnt: 510 },
    w2v0: { stu_pmu_wctl_ub_cflt: 72, ldu_pmu_ib_ub_cflt: 110, pmu_idc_aic_vec_instr_vf_busy_o: 190, idu_pmu_ins_iss_cnt: 560 },
    w2v1: { stu_pmu_wctl_ub_cflt: 90, ldu_pmu_ib_ub_cflt: 135, pmu_idc_aic_vec_instr_vf_busy_o: 220, idu_pmu_ins_iss_cnt: 610 }
  },
  "7": {
    w0v0: { pmu_rd_acc_ub_instr_p: 260, pmu_wr_acc_ub_instr_p: 220, pmu_fix_wr_ub_instr: 0, mte_sc_pmu_write_acc_ub_instr_0: 160, mte_sc_pmu_read_acc_ub_instr_0: 210, ub_pmu_vec_rd_ub_acc: 420, ub_pmu_vec_wr_ub_acc: 300 },
    w0v1: { pmu_rd_acc_ub_instr_p: 220, pmu_wr_acc_ub_instr_p: 180, pmu_fix_wr_ub_instr: 0, mte_sc_pmu_write_acc_ub_instr_0: 130, mte_sc_pmu_read_acc_ub_instr_0: 160, ub_pmu_vec_rd_ub_acc: 360, ub_pmu_vec_wr_ub_acc: 260 },
    w1v0: { pmu_rd_acc_ub_instr_p: 420, pmu_wr_acc_ub_instr_p: 380, pmu_fix_wr_ub_instr: 0, mte_sc_pmu_write_acc_ub_instr_0: 280, mte_sc_pmu_read_acc_ub_instr_0: 340, ub_pmu_vec_rd_ub_acc: 620, ub_pmu_vec_wr_ub_acc: 510 },
    w1v1: { pmu_rd_acc_ub_instr_p: 180, pmu_wr_acc_ub_instr_p: 160, pmu_fix_wr_ub_instr: 0, mte_sc_pmu_write_acc_ub_instr_0: 110, mte_sc_pmu_read_acc_ub_instr_0: 150, ub_pmu_vec_rd_ub_acc: 280, ub_pmu_vec_wr_ub_acc: 190 },
    w2c: { pmu_fix_wr_ub_instr: 520, pmu_rd_acc_ub_instr_p: 90, pmu_wr_acc_ub_instr_p: 120, mte_sc_pmu_write_acc_ub_instr_0: 220, mte_sc_pmu_read_acc_ub_instr_0: 110 },
    w2v0: { pmu_rd_acc_ub_instr_p: 160, pmu_wr_acc_ub_instr_p: 360, pmu_fix_wr_ub_instr: 0, mte_sc_pmu_write_acc_ub_instr_0: 390, mte_sc_pmu_read_acc_ub_instr_0: 150, ub_pmu_vec_rd_ub_acc: 240, ub_pmu_vec_wr_ub_acc: 620 },
    w2v1: { pmu_rd_acc_ub_instr_p: 180, pmu_wr_acc_ub_instr_p: 400, pmu_fix_wr_ub_instr: 0, mte_sc_pmu_write_acc_ub_instr_0: 420, mte_sc_pmu_read_acc_ub_instr_0: 170, ub_pmu_vec_rd_ub_acc: 260, ub_pmu_vec_wr_ub_acc: 680 }
  },
  "8": {
    w0c: { bif_sc_pmu_ar_close_l2_hit_core: 720, bif_sc_pmu_ar_close_l2_miss_core: 120, bif_sc_pmu_ar_close_l2_victim_core: 30, bif_sc_pmu_aw_close_l2_hit_core: 420, bif_sc_pmu_aw_close_l2_miss_core: 70, bif_sc_pmu_aw_close_l2_victim_core: 20 },
    w0v0: { bif_sc_pmu_ar_close_l2_hit_core: 440, bif_sc_pmu_ar_close_l2_miss_core: 180, bif_sc_pmu_ar_close_l2_victim_core: 60, bif_sc_pmu_aw_close_l2_hit_core: 360, bif_sc_pmu_aw_close_l2_miss_core: 160, bif_sc_pmu_aw_close_l2_victim_core: 50 },
    w0v1: { bif_sc_pmu_ar_close_l2_hit_core: 390, bif_sc_pmu_ar_close_l2_miss_core: 120, bif_sc_pmu_ar_close_l2_victim_core: 38, bif_sc_pmu_aw_close_l2_hit_core: 300, bif_sc_pmu_aw_close_l2_miss_core: 110, bif_sc_pmu_aw_close_l2_victim_core: 35 },
    w1c: { bif_sc_pmu_ar_close_l2_hit_core: 640, bif_sc_pmu_ar_close_l2_miss_core: 100, bif_sc_pmu_ar_close_l2_victim_core: 25, bif_sc_pmu_aw_close_l2_hit_core: 380, bif_sc_pmu_aw_close_l2_miss_core: 60, bif_sc_pmu_aw_close_l2_victim_core: 20 },
    w1v0: { bif_sc_pmu_ar_close_l2_hit_core: 360, bif_sc_pmu_ar_close_l2_miss_core: 420, bif_sc_pmu_ar_close_l2_victim_core: 180, bif_sc_pmu_aw_close_l2_hit_core: 320, bif_sc_pmu_aw_close_l2_miss_core: 360, bif_sc_pmu_aw_close_l2_victim_core: 160 },
    w1v1: { bif_sc_pmu_ar_close_l2_hit_core: 410, bif_sc_pmu_ar_close_l2_miss_core: 130, bif_sc_pmu_ar_close_l2_victim_core: 40, bif_sc_pmu_aw_close_l2_hit_core: 280, bif_sc_pmu_aw_close_l2_miss_core: 90, bif_sc_pmu_aw_close_l2_victim_core: 30 },
    w2c: { bif_sc_pmu_ar_close_l2_hit_core: 500, bif_sc_pmu_ar_close_l2_miss_core: 220, bif_sc_pmu_ar_close_l2_victim_core: 90, bif_sc_pmu_aw_close_l2_hit_core: 260, bif_sc_pmu_aw_close_l2_miss_core: 240, bif_sc_pmu_aw_close_l2_victim_core: 110 },
    w2v0: { bif_sc_pmu_ar_close_l2_hit_core: 360, bif_sc_pmu_ar_close_l2_miss_core: 260, bif_sc_pmu_ar_close_l2_victim_core: 100, bif_sc_pmu_aw_close_l2_hit_core: 240, bif_sc_pmu_aw_close_l2_miss_core: 300, bif_sc_pmu_aw_close_l2_victim_core: 130 },
    w2v1: { bif_sc_pmu_ar_close_l2_hit_core: 340, bif_sc_pmu_ar_close_l2_miss_core: 300, bif_sc_pmu_ar_close_l2_victim_core: 130, bif_sc_pmu_aw_close_l2_hit_core: 230, bif_sc_pmu_aw_close_l2_miss_core: 340, bif_sc_pmu_aw_close_l2_victim_core: 160 }
  }
};

const lanes = ["AIC", "AIV0", "AIV1"];
const state = { groupId: "2", selectedKind: null, selectedId: null, activeView: "balance" };
const els = {};

document.addEventListener("DOMContentLoaded", () => {
  ["groupSelect", "subtitle", "lensPill", "counterPill", "goalTitle", "goalList", "legendTitle", "semanticLegend", "workbenchTitle", "workbenchDesc", "timelineTitle", "timelineDesc", "timelineMode", "wrapTitle", "wrapBadge", "laneSummary", "timeline", "wrapGrid", "issueList", "issueCount", "detailPanel", "emptyPanel", "detailMeta", "detailTitle", "detailBody", "closeDetail"].forEach(id => {
    els[id] = document.getElementById(id);
  });
  els.groupSelect.addEventListener("change", event => {
    state.groupId = event.target.value;
    state.selectedKind = null;
    state.selectedId = null;
    renderAll();
  });
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.activeView = btn.dataset.view;
      document.querySelectorAll(".view-btn").forEach(item => item.classList.toggle("active", item.dataset.view === state.activeView));
      renderAll();
    });
  });
  els.closeDetail.addEventListener("click", () => {
    state.selectedKind = null;
    state.selectedId = null;
    renderAll();
  });
  renderAll();
});

function renderAll() {
  renderContext();
  renderLaneSummary();
  renderIssues();
  renderTimeline();
  renderWrapGrid();
  renderDetail();
}

function renderContext() {
  const g = group();
  const activeCounters = g.counters.length;
  const events = g.counters.filter(c => c.type === "event").map(c => c.key);
  els.subtitle.textContent = `dav_3510 · PROF_PMU_EVENT_TYPE=${state.groupId} · ${g.title}`;
  els.lensPill.textContent = g.lens;
  els.counterPill.textContent = events.length ? `${activeCounters} counters · event: ${events.join(" / ")}` : `${activeCounters} valid counters`;
  els.goalTitle.textContent = `Group ${state.groupId} 诊断目标`;
  els.goalList.innerHTML = g.goals.map(goal => `<li>${goal}</li>`).join("");
  els.semanticLegend.innerHTML = g.legend.map(([tone, title, text]) => `<div><span class="dot ${tone}"></span><strong>${title}</strong><p>${text}</p></div>`).join("");
  els.workbenchTitle.textContent = g.title;
  els.workbenchDesc.textContent = g.desc;
  els.timelineDesc.textContent = timelineDescription();
  els.timelineMode.textContent = g.metric === "coverage" ? "task gap badges on" : `${g.metric} badges on`;
  els.wrapTitle.textContent = g.wrapTitle;
  els.wrapBadge.textContent = g.badge;
}

function renderLaneSummary() {
  const metrics = lanes.map(laneMetrics);
  const maxScore = Math.max(...metrics.map(m => m.primaryScore), 1);
  els.laneSummary.innerHTML = metrics.map(m => {
    const selected = state.selectedKind === "lane" && state.selectedId === m.lane ? " selected" : "";
    const badge = metricBadge(m);
    return `<button class="lane-card${selected}" data-kind="lane" data-id="${m.lane}" type="button">
      <div class="lane-title"><h3>${m.lane}</h3><span class="badge ${badge.cls}">${badge.text}</span></div>
      <div class="metric-grid">
        ${kv("wall active", m.wall)}${kv(primaryLabel(), m.primaryScore)}
        ${kv("dominant", m.dominant.label)}${kv("critical wraps", `${m.criticalCount}/3`)}
      </div>
      <div class="stack-bar">${stackSegments(m.counterTotals, m.counterTotal)}</div>
      <p>${laneSummaryText(m, maxScore)}</p>
    </button>`;
  }).join("");
  bindClickable(els.laneSummary);
}

function renderIssues() {
  const issues = buildIssues();
  els.issueCount.textContent = issues.length;
  els.issueList.innerHTML = issues.map(issue => `<button class="issue${state.selectedId === issue.targetId ? " active" : ""}" data-kind="${issue.kind}" data-id="${issue.targetId}" type="button">
    <span>${issue.type}</span><strong>${issue.title}</strong><p>${issue.detail}</p>
  </button>`).join("");
  bindClickable(els.issueList);
}

function renderTimeline() {
  const taskList = tasks();
  const minStart = Math.min(...taskList.map(t => t.start));
  const maxEnd = Math.max(...taskList.map(t => t.end));
  const total = maxEnd - minStart;
  const wraps = wrapMetrics();
  let html = `<div class="time-scale"><strong>lane</strong><div class="ticks">${Array.from({ length: 10 }, (_, i) => `<span>${Math.round(total * i / 10)}</span>`).join("")}</div></div>`;
  lanes.forEach(lane => {
    html += `<div class="swim-lane"><div class="lane-label">${lane}</div><div class="track">`;
    wraps.forEach(w => {
      html += `<span class="wrap-band" style="left:${pct(w.start - minStart, total)}%;width:${pct(w.duration, total)}%"></span>`;
      html += `<span class="wrap-tag" style="left:${pct(w.start - minStart, total)}%">${w.wrap}</span>`;
    });
    taskList.filter(t => t.lane === lane).forEach(task => {
      const selected = state.selectedKind === "task" && state.selectedId === task.id ? " selected" : "";
      const badge = taskBadge(task);
      html += `<button class="task${selected}" data-kind="task" data-id="${task.id}" type="button" style="left:${pct(task.start - minStart, total)}%;width:${pct(task.totalCycle, total)}%">
        ${stackSegments(task.values, sumCounters(task.values))}
        <span class="task-label">${task.name}</span>
        <span class="task-badge ${badge.cls}">${badge.text}</span>
      </button>`;
    });
    html += `</div></div>`;
  });
  els.timeline.innerHTML = html;
  bindClickable(els.timeline);
}

function renderWrapGrid() {
  els.wrapGrid.innerHTML = wrapMetrics().map(w => {
    const selected = state.selectedKind === "wrap" && state.selectedId === w.wrap ? " selected" : "";
    return `<button class="wrap-item${selected}" data-kind="wrap" data-id="${w.wrap}" type="button">
      <h3>${w.wrap} · ${w.verdict}</h3>
      <div class="metric-grid">
        ${kv("duration", w.duration)}${kv(wrapPrimaryLabel(), w.primaryScore)}
        ${kv("critical lane", w.criticalLane)}${kv("end skew", w.endSkew)}
      </div>
      <div class="wrap-meter">${w.tasks.map(t => `<div class="meter-row"><span>${t.lane}</span><span class="meter-track"><i style="width:${pct(taskPrimaryScore(t), w.maxScore)}%"></i></span><code>${taskPrimaryScore(t)}</code></div>`).join("")}</div>
      <p>${w.summary}</p>
    </button>`;
  }).join("");
  bindClickable(els.wrapGrid);
}

function renderDetail() {
  if (!state.selectedKind) {
    els.emptyPanel.classList.remove("hidden");
    els.detailPanel.classList.add("hidden");
    return;
  }
  els.emptyPanel.classList.add("hidden");
  els.detailPanel.classList.remove("hidden");
  const payload = detailPayload(state.selectedKind, state.selectedId);
  els.detailTitle.textContent = payload.title;
  els.detailMeta.textContent = payload.meta;
  els.detailBody.innerHTML = payload.body;
  bindClickable(els.detailBody);
}

function detailPayload(kind, id) {
  if (kind === "lane") return laneDetail(id);
  if (kind === "wrap") return wrapDetail(id);
  if (kind === "hardware") return hardwareDetail(id);
  if (kind === "source") return sourceDetail(id);
  if (kind === "advice") return adviceDetail(id);
  return taskDetail(id);
}

function laneDetail(lane) {
  const m = laneMetrics(lane);
  const taskList = tasks().filter(t => t.lane === lane).sort((a, b) => taskPrimaryScore(b) - taskPrimaryScore(a));
  return {
    title: `${lane} · ${group().lens}`,
    meta: "lane aggregate",
    body: `<div class="detail-section"><h3>Lane 结论</h3><div class="kv-grid">
      ${kv("wall active", m.wall)}${kv(primaryLabel(), m.primaryScore)}${kv("dominant", m.dominant.label)}${kv("critical wraps", `${m.criticalCount}/3`)}
    </div><p>${laneSummaryText(m, Math.max(...lanes.map(l => laneMetrics(l).primaryScore), 1))}</p></div>
    <div class="detail-section"><h3>Task 排序</h3>${taskList.map(t => traceButton("task", t.id, `${t.name}`, `${primaryLabel()}: ${taskPrimaryScore(t)} · ${taskBadge(t).text}`)).join("")}</div>`
  };
}

function wrapDetail(wrap) {
  const w = wrapMetrics().find(item => item.wrap === wrap);
  return {
    title: `${wrap} · ${group().wrapTitle}`,
    meta: "wrap diagnosis",
    body: `<div class="detail-section"><h3>Wrap 结论</h3><div class="kv-grid">
      ${kv("duration", w.duration)}${kv(wrapPrimaryLabel(), w.primaryScore)}${kv("critical lane", w.criticalLane)}${kv("end skew", w.endSkew)}
    </div><p>${w.summary}</p></div>
    <div class="detail-section"><h3>C / V task</h3>${w.tasks.map(t => traceButton("task", t.id, `${t.lane} · ${t.name}`, `${primaryLabel()}: ${taskPrimaryScore(t)} · dominant ${dominantCounter(t).label}`)).join("")}</div>`
  };
}

function taskDetail(id) {
  const task = tasks().find(t => t.id === id);
  if (!task) return emptyDetail("未找到 task", id);
  const dom = dominantCounter(task);
  const hardware = hardwareFor(dom.key, task.lane);
  const peer = peerTasks(task);
  return {
    title: task.name,
    meta: `${task.wrap} · ${task.lane} · Group ${state.groupId}`,
    body: `<div class="detail-section"><h3>Task diagnosis</h3><div class="kv-grid">
      ${kv("total_cycle", task.totalCycle)}${kv(primaryLabel(), taskPrimaryScore(task))}${kv("dominant", dom.label)}${kv("state", taskState(task))}
    </div><p>${taskExplanation(task)}</p></div>
    <div class="detail-section"><h3>Counter breakdown</h3><div class="counter-list">${group().counters.map(cn => counterRow(cn, task)).join("")}</div></div>
    <div class="detail-section"><h3>追溯入口</h3>${traceButton("source", task.id, "源码片段", `semantic_label: ${task.name}`)}${traceButton("hardware", dom.key, `硬件路径 · ${hardware.title}`, hardware.path)}${peer.map(t => traceButton("task", t.id, `peer · ${t.lane}`, `${t.name} · ${primaryLabel()}: ${taskPrimaryScore(t)}`)).join("")}${nextGroupHint(task)}</div>`
  };
}

function hardwareDetail(counterKey) {
  const cn = group().counters.find(c => c.key === counterKey) || group().counters[0];
  const related = tasks().filter(t => dominantCounter(t).key === cn.key);
  const hardware = hardwareFor(cn.key, related[0]?.lane || "AIC");
  return {
    title: `硬件路径 · ${cn.label}`,
    meta: cn.key,
    body: `<div class="detail-section"><h3>Counter -> hardware</h3><div class="kv-grid">${kv("counter", cn.key)}${kv("type", cn.type)}${kv("pipe", cn.pipe)}${kv("path", hardware.path)}</div><p>${hardware.explain}</p></div>
    <div class="detail-section"><h3>相关 task</h3>${(related.length ? related : tasks().slice(0, 3)).map(t => traceButton("task", t.id, `${t.wrap} · ${t.lane} · ${t.name}`, `${primaryLabel()}: ${taskPrimaryScore(t)}`)).join("")}</div>`
  };
}

function sourceDetail(taskId) {
  const task = tasks().find(t => t.id === taskId);
  if (!task) return emptyDetail("未找到源码锚点", taskId);
  return {
    title: `源码片段 · ${task.name}`,
    meta: "semantic_label source anchor",
    body: `<div class="detail-section"><p>真实接入后，这里应打开对应源码文件与行号。当前用 sample 展示定位内容。</p><pre class="codebox">${escapeHtml(sourceSnippet(task))}</pre></div>`
  };
}

function buildIssues() {
  const taskList = tasks();
  const g = group();
  const topLane = lanes.map(laneMetrics).sort((a, b) => b.primaryScore - a.primaryScore)[0];
  const topTask = [...taskList].sort((a, b) => taskPrimaryScore(b) - taskPrimaryScore(a))[0];
  const critical = wrapMetrics().sort((a, b) => b.duration - a.duration)[0];
  const weakExplain = [...taskList].filter(t => g.primaryLanes.includes(t.lane)).sort((a, b) => explainScore(a) - explainScore(b))[0];
  return [
    { kind: "lane", targetId: topLane.lane, type: "Lane hotspot", title: `${topLane.lane} ${primaryLabel()} 最高`, detail: `dominant ${topLane.dominant.label}，critical wraps ${topLane.criticalCount}/3。` },
    { kind: "task", targetId: topTask.id, type: "Task hotspot", title: `${topTask.name} 最值得先看`, detail: `${primaryLabel()}=${taskPrimaryScore(topTask)}，dominant ${dominantCounter(topTask).label}。` },
    { kind: "wrap", targetId: critical.wrap, type: "Critical Wrap", title: `${critical.wrap} · ${critical.criticalLane} 拖尾`, detail: critical.summary },
    weakExplain ? { kind: "task", targetId: weakExplain.id, type: "This group may not explain", title: `${weakExplain.name} 解释度低`, detail: `建议下一次采集：${recommendNextGroup(weakExplain)}。` } : null
  ].filter(Boolean);
}

function tasks() {
  return BASE_TASKS.map(t => {
    const values = {};
    group().counters.forEach(cn => values[cn.key] = (VALUES[state.groupId]?.[t.id]?.[cn.key]) || 0);
    return { ...t, values, counterTotal: sumCounters(values), end: t.start + t.totalCycle };
  });
}

function laneMetrics(lane) {
  const list = tasks().filter(t => t.lane === lane);
  const counterTotals = {};
  group().counters.forEach(cn => counterTotals[cn.key] = list.reduce((sum, t) => sum + (t.values[cn.key] || 0), 0));
  const wall = list.reduce((sum, t) => sum + t.totalCycle, 0);
  const primaryScore = groupPrimaryScore(list, counterTotals, wall);
  return {
    lane, wall, primaryScore, counterTotals, counterTotal: sumCounters(counterTotals),
    dominant: dominantFromTotals(counterTotals),
    criticalCount: wrapMetrics().filter(w => w.criticalLane === lane).length
  };
}

function wrapMetrics() {
  const ids = [...new Set(BASE_TASKS.map(t => t.wrap))];
  return ids.map(wrap => {
    const list = tasks().filter(t => t.wrap === wrap);
    const start = Math.min(...list.map(t => t.start));
    const end = Math.max(...list.map(t => t.end));
    const critical = [...list].sort((a, b) => b.end - a.end)[0];
    const maxScore = Math.max(...list.map(taskPrimaryScore), 1);
    const primaryScore = Math.round(list.reduce((sum, t) => sum + taskPrimaryScore(t), 0));
    const endSkew = Math.max(...list.map(t => t.end)) - Math.min(...list.map(t => t.end));
    return {
      wrap, tasks: list, start, end, duration: end - start, criticalLane: critical.lane,
      criticalTask: critical.id, endSkew, maxScore, primaryScore,
      verdict: wrapVerdict(list, endSkew, end - start),
      summary: `${critical.lane} 的 ${critical.name} 最晚结束；${group().lens} 下 Wrap score 为 ${primaryScore}。`
    };
  });
}

function groupPrimaryScore(list, totals, wall) {
  if (group().metric === "coverage") return Math.round(sumCycleCounters(totals) / Math.max(wall, 1) * 100) / 100;
  if (group().metric === "efficiency") return l2Efficiency(totals);
  if (group().metric === "severity") return Math.round((totals.stu_pmu_wctl_ub_cflt || 0) + (totals.ldu_pmu_ib_ub_cflt || 0) + (totals.pmu_idc_aic_vec_instr_vf_busy_o || 0) * 0.5);
  return Math.round(sumCounters(totals));
}

function taskPrimaryScore(task) {
  if (group().metric === "coverage") return Math.round(sumCycleCounters(task.values) / Math.max(task.totalCycle, 1) * 100) / 100;
  if (group().metric === "efficiency") return l2Efficiency(task.values);
  if (group().metric === "severity") return Math.round((task.values.stu_pmu_wctl_ub_cflt || 0) + (task.values.ldu_pmu_ib_ub_cflt || 0) + (task.values.pmu_idc_aic_vec_instr_vf_busy_o || 0) * 0.5);
  return Math.round(sumCounters(task.values));
}

function primaryLabel() {
  if (group().metric === "coverage") return "coverage";
  if (group().metric === "efficiency") return "L2 score";
  if (group().metric === "severity") return "severity";
  return "pressure";
}

function wrapPrimaryLabel() {
  if (group().metric === "efficiency") return "efficiency score";
  return primaryLabel();
}

function taskBadge(task) {
  const score = taskPrimaryScore(task);
  if (group().metric === "coverage") {
    const ratio = score - 1;
    return { text: `${ratio > 0 ? "+" : ""}${Math.round(ratio * 100)}%`, cls: ratio < -0.08 ? "gap-neg" : ratio > 0.08 ? "gap-pos" : "gap-ok" };
  }
  if (group().metric === "efficiency") return { text: `${score}%`, cls: score < 58 ? "severity-high" : score < 75 ? "severity-mid" : "severity-good" };
  return { text: String(score), cls: score > highThreshold() ? "severity-high" : "severity-mid" };
}

function metricBadge(m) {
  if (group().metric === "efficiency") return { text: `${m.primaryScore}%`, cls: m.primaryScore < 58 ? "severity-high" : m.primaryScore < 75 ? "severity-mid" : "severity-good" };
  if (group().metric === "coverage") return { text: `${m.primaryScore}x`, cls: m.primaryScore < 0.92 ? "gap-neg" : m.primaryScore > 1.08 ? "gap-pos" : "gap-ok" };
  return { text: String(m.primaryScore), cls: m.primaryScore > highThreshold() ? "severity-high" : "severity-mid" };
}

function highThreshold() {
  return group().metric === "severity" ? 240 : 1200;
}

function laneSummaryText(m, maxScore) {
  const share = Math.round(m.primaryScore / Math.max(maxScore, 1) * 100);
  if (!group().primaryLanes.includes(m.lane)) return `${m.lane} 当前主要作为 peer / wait 上下文，不是该 group 的主诊断对象。`;
  return `dominant ${m.dominant.label} · ${primaryLabel()} share ${share}% of max lane。`;
}

function taskState(task) {
  if (group().metric === "coverage") {
    const score = taskPrimaryScore(task);
    if (score < 0.92) return "uncovered / wait suspect";
    if (score > 1.08) return "overlap / double-count suspect";
    return "mostly accounted";
  }
  if (group().metric === "efficiency") return taskPrimaryScore(task) < 58 ? "low L2 efficiency" : "acceptable L2 efficiency";
  if (group().metric === "severity") return taskPrimaryScore(task) > highThreshold() ? "conflict-driven suspect" : "low conflict";
  if (!group().primaryLanes.includes(task.lane)) return "peer context";
  return taskPrimaryScore(task) > highThreshold() ? "pressure hotspot" : "normal pressure";
}

function taskExplanation(task) {
  const dom = dominantCounter(task);
  if (!group().primaryLanes.includes(task.lane)) return `${task.lane} 在 ${group().lens} 中主要用于上下文。若该 task 很长，应切到更适合该 lane 的 group。`;
  if (group().metric === "coverage") return `coverage=${taskPrimaryScore(task)}x。该值不是 good/bad，需要结合 total_cycle、dominant counter 和 peer wait 判断。`;
  if (group().metric === "efficiency") return `L2 efficiency score=${taskPrimaryScore(task)}。dominant 为 ${dom.label}，优先判断读侧、写侧还是 victim/churn。`;
  return `dominant counter 是 ${dom.label}。它指向 ${hardwareFor(dom.key, task.lane).path}。`;
}

function nextGroupHint(task) {
  return traceButton("advice", task.id, "下一次采集建议", recommendNextGroup(task));
}

function adviceDetail(taskId) {
  const task = tasks().find(t => t.id === taskId);
  if (!task) return emptyDetail("未找到建议对象", taskId);
  return {
    title: `下一次采集建议 · ${task.name}`,
    meta: `current group ${state.groupId}`,
    body: `<div class="detail-section"><h3>建议</h3><p>${recommendNextGroup(task)}</p></div>
    <div class="detail-section"><h3>为什么</h3><p>PMU group 是诊断镜头。当前 group 如果不能解释 total_cycle 或 dominant counter 指向其他硬件层，就应切到更匹配的 group 继续采集。</p>${traceButton("task", task.id, "返回当前 task", `${task.wrap} · ${task.lane}`)}</div>`
  };
}

function recommendNextGroup(task) {
  if (state.groupId === "1" && taskPrimaryScore(task) < 500) return "Cube arithmetic 解释不足，建议看 group 2 pipeline 或 group 5 L0 path。";
  if (state.groupId === "2" && taskPrimaryScore(task) < 0.85) return "pipeline 覆盖不足，建议看 group 6 conflict / issue 或 sync/wrap 数据。";
  if (state.groupId === "4") return task.lane === "AIC" ? "若怀疑核内路径，下一次看 group 5。" : "若怀疑本地 UB/ACC，下一次看 group 7。";
  if (state.groupId === "5") return "若 L0 不高但 AIC 仍长，回看 group 1 或 group 2。";
  if (state.groupId === "6") return "若 conflict 不高，回看 group 2 pipeline 或 group 4/7 数据访问。";
  if (state.groupId === "7") return "若本地 buffer 压力不解释，下一次看 group 4 main memory 或 group 8 L2。";
  if (state.groupId === "8") return "若 L2 score 低，结合 group 4 main access 与 TileShape / layout 继续定位。";
  return "根据 dominant counter 选择下一组 PMU。";
}

function dominantCounter(task) {
  return dominantFromTotals(task.values);
}

function dominantFromTotals(totals) {
  const top = group().counters.sort((a, b) => (totals[b.key] || 0) - (totals[a.key] || 0))[0];
  return { ...top, value: totals[top.key] || 0 };
}

function peerTasks(task) {
  return tasks().filter(t => t.wrap === task.wrap && t.id !== task.id);
}

function hardwareFor(counterKey, lane) {
  const maps = {
    cube_fp_instr_busy: ["AIC", "Cube FP", "L0A/L0B", "L0C"],
    cube_int_instr_busy: ["AIC", "Cube INT", "L0A/L0B", "L0C"],
    cube_instr_busy: ["GM/L2", "L1", "L0A/L0B", "Cube", "L0C"],
    pmu_idc_aic_vec_busy_o: ["Unified Buffer", "Vector / IDC", "Unified Buffer"],
    scalar_instr_busy: ["Scalar", "issue/control", lane],
    mte1_instr_busy: ["L1", "MTE1", "L0A/L0B"],
    mte2_instr_busy: ["GM/L2", "MTE2", lane === "AIC" ? "L1" : "Unified Buffer"],
    mte3_instr_busy: [lane === "AIC" ? "L0C/FixPipe" : "Unified Buffer", "MTE3", "GM/L2"],
    pmu_fix_instr_busy: ["L0C", "FixPipe", "GM/L1"],
    bif_sc_pmu_read_main_instr_core: ["GM/L2", "read path", lane],
    bif_sc_pmu_write_main_instr_core: [lane, "write path", "GM/L2"],
    pmu_aiv_ext_rd_ub_instr: ["UB", "AIV ext read", "Vector"],
    pmu_aiv_ext_wr_ub_instr: ["Vector", "AIV ext write", "UB"],
    ub_pmu_vec_rd_ub_acc: ["UB/ACC", "Vector read", "Vector"],
    ub_pmu_vec_wr_ub_acc: ["Vector", "Vector write", "UB/ACC"],
    pmu_rd_l1_instr: ["L1", "read", "AIC"],
    pmu_wr_l1_instr: ["AIC", "write", "L1"],
    cube_sc_pmu_read_l0a_instr: ["L0A", "Cube input A"],
    pmu_wr_l0a_instr: ["MTE1", "write", "L0A"],
    cube_sc_pmu_read_l0b_instr: ["L0B", "Cube input B"],
    pmu_wr_l0b_instr: ["MTE1", "write", "L0B"],
    fixp_rd_l0c_instr: ["L0C", "FixPipe", "output path"],
    cube_sc_pmu_read_l0c_instr: ["L0C", "Cube accumulate read"],
    cube_sc_pmu_write_l0c_instr: ["Cube", "L0C write"],
    stu_pmu_wctl_ub_cflt: ["STU", "UB write-control conflict"],
    ldu_pmu_ib_ub_cflt: ["LDU", "IB/UB conflict"],
    pmu_idc_aic_vec_instr_vf_busy_o: ["VF", "Vector fused path"],
    idu_pmu_ins_iss_cnt: ["IDU", "issue count"],
    pmu_rd_acc_ub_instr_p: ["ACC/UB", "read"],
    pmu_wr_acc_ub_instr_p: ["ACC/UB", "write"],
    pmu_fix_wr_ub_instr: ["FixPipe", "write UB"],
    mte_sc_pmu_write_acc_ub_instr_0: ["MTE", "write ACC/UB"],
    mte_sc_pmu_read_acc_ub_instr_0: ["MTE", "read ACC/UB"],
    bif_sc_pmu_ar_close_l2_hit_core: ["L2", "AR hit"],
    bif_sc_pmu_ar_close_l2_miss_core: ["L2", "AR miss"],
    bif_sc_pmu_ar_close_l2_victim_core: ["L2", "AR victim"],
    bif_sc_pmu_aw_close_l2_hit_core: ["L2", "AW hit"],
    bif_sc_pmu_aw_close_l2_miss_core: ["L2", "AW miss"],
    bif_sc_pmu_aw_close_l2_victim_core: ["L2", "AW victim"]
  };
  const cn = group().counters.find(c => c.key === counterKey) || { label: counterKey };
  return { title: cn.label, path: (maps[counterKey] || [counterKey]).join(" -> "), explain: `${cn.key} 属于 ${group().lens} 的硬件追溯入口。` };
}

function stackSegments(values, total) {
  const denom = Math.max(total, 1);
  return group().counters.map(cn => {
    const width = Math.max(0, (values[cn.key] || 0) / denom * 100);
    return `<i class="stack-seg counter-seg ${cn.cls}" style="width:${width}%" title="${cn.label}: ${values[cn.key] || 0}"></i>`;
  }).join("");
}

function counterRow(cn, task) {
  const value = task.values[cn.key] || 0;
  const max = Math.max(...group().counters.map(c => task.values[c.key] || 0), 1);
  return `<div class="counter-row"><code>${cn.label}</code><span class="mini-bar"><i class="${cn.cls}" style="width:${value / max * 100}%"></i></span><code>${value}</code></div>`;
}

function wrapVerdict(list, endSkew, duration) {
  if (group().metric === "efficiency") return list.some(t => taskPrimaryScore(t) < 58) ? "low efficiency" : "reuse ok";
  if (group().metric === "severity") return list.some(t => taskPrimaryScore(t) > highThreshold()) ? "conflict suspect" : "low conflict";
  if (group().metric === "coverage") return endSkew / duration > 0.32 ? "imbalanced" : "balanced";
  return list.some(t => taskPrimaryScore(t) > highThreshold()) ? "pressure hotspot" : "normal";
}

function explainScore(task) {
  if (group().metric === "coverage") return taskPrimaryScore(task);
  return taskPrimaryScore(task) / Math.max(task.totalCycle, 1);
}

function l2Efficiency(values) {
  const arHit = values.bif_sc_pmu_ar_close_l2_hit_core || 0;
  const arMiss = values.bif_sc_pmu_ar_close_l2_miss_core || 0;
  const awHit = values.bif_sc_pmu_aw_close_l2_hit_core || 0;
  const awMiss = values.bif_sc_pmu_aw_close_l2_miss_core || 0;
  const victim = (values.bif_sc_pmu_ar_close_l2_victim_core || 0) + (values.bif_sc_pmu_aw_close_l2_victim_core || 0);
  const hitRate = (arHit + awHit) / Math.max(arHit + awHit + arMiss + awMiss, 1);
  return Math.max(0, Math.round(hitRate * 100 - victim / 20));
}

function sumCycleCounters(values) {
  return group().counters.filter(cn => cn.type === "cycle").reduce((sum, cn) => sum + (values[cn.key] || 0), 0);
}

function sumCounters(values) {
  return group().counters.reduce((sum, cn) => sum + (values[cn.key] || 0), 0);
}

function group() {
  return GROUPS[state.groupId];
}

function c(key, label, type, cls, pipe) {
  return { key, label, type, cls, pipe };
}

function base(id, wrap, lane, name, start, totalCycle, sync) {
  return { id, wrap, lane, name, start, totalCycle, end: start + totalCycle, sync };
}

function kv(k, v) {
  return `<div class="metric"><span>${k}</span><strong>${v}</strong></div>`;
}

function traceButton(kind, id, title, sub) {
  return `<button class="trace-link" data-kind="${kind}" data-id="${id}" type="button"><span>${sub}</span><strong>${title}</strong></button>`;
}

function bindClickable(root) {
  root.querySelectorAll("[data-kind]").forEach(node => node.addEventListener("click", () => select(node.dataset.kind, node.dataset.id)));
}

function select(kind, id) {
  state.selectedKind = kind;
  state.selectedId = id;
  renderAll();
}

function pct(value, total) {
  return total === 0 ? 0 : value / total * 100;
}

function sourceSnippet(task) {
  return `# prototype source anchor
with pypto.scope("${task.wrap}_${task.lane}") as scope:
    # semantic_label: ${task.name}
    # group: ${state.groupId}
    # dominant_counter: ${dominantCounter(task).key}
    # next jump: CALL -> Block Graph -> hardware pipe
    pass`;
}

function emptyDetail(title, id) {
  return { title, meta: "empty", body: `<div class="detail-section"><p>找不到 id: <code>${escapeHtml(id)}</code>。</p></div>` };
}

function timelineDescription() {
  if (group().metric === "coverage") return "任务外框是真实 total_cycle；内部堆叠为 cycle-like counter composition，event counters 独立解释。";
  if (group().metric === "efficiency") return "任务外框是真实 total_cycle；内部显示 AR/AW hit-miss-victim ratio。";
  return "任务外框是真实 total_cycle；内部堆叠为当前 group 的语义 counter pressure。";
}

function escapeHtml(text) {
  return String(text).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
