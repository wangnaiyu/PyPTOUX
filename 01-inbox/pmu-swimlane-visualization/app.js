const PMU_GROUPS = {
  dav3510: {
    label: "A5 / dav_3510",
    counterCapacity: 10,
    groups: {
      1: {
        name: "Arithmetic",
        events: [
          ["cube_fp_instr_busy", "Compute", "Cube FP 指令忙"],
          ["cube_int_instr_busy", "Compute", "Cube INT 指令忙"],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""]
        ]
      },
      2: {
        name: "Pipeline Utilization",
        events: [
          ["pmu_idc_aic_vec_busy_o", "Compute", "AIC/Vector busy 观察"],
          ["cube_instr_busy", "Compute", "Cube 指令忙"],
          ["scalar_instr_busy", "Compute", "Scalar 指令忙"],
          ["mte1_instr_busy", "Memory Pipe", "MTE1 搬运忙"],
          ["mte2_instr_busy", "Memory Pipe", "MTE2 搬运忙"],
          ["mte3_instr_busy", "Memory Pipe", "MTE3 搬运忙"],
          ["icache_req", "Instruction", "I-cache 请求"],
          ["icache_miss", "Instruction", "I-cache miss"],
          ["pmu_fix_instr_busy", "Compute", "FixPipe 指令忙"],
          ["0x0", "Invalid", ""]
        ]
      },
      4: {
        name: "Main / UB / L1 Memory",
        events: [
          ["bif_sc_pmu_read_main_instr_core", "Memory Pipe", "主存读"],
          ["bif_sc_pmu_write_main_instr_core", "Memory Pipe", "主存写"],
          ["pmu_aiv_ext_rd_ub_instr", "Local Memory", "AIV ext 读 UB"],
          ["ub_pmu_vec_rd_ub_acc", "Local Memory", "Vector 读 UB/ACC"],
          ["pmu_aiv_ext_wr_ub_instr", "Local Memory", "AIV ext 写 UB"],
          ["ub_pmu_vec_wr_ub_acc", "Local Memory", "Vector 写 UB/ACC"],
          ["pmu_rd_l1_instr", "Local Memory", "读 L1"],
          ["pmu_wr_l1_instr", "Local Memory", "写 L1"],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""]
        ]
      },
      5: {
        name: "L0 Memory",
        events: [
          ["cube_sc_pmu_read_l0a_instr", "Local Memory", "读 L0A"],
          ["pmu_wr_l0a_instr", "Local Memory", "写 L0A"],
          ["cube_sc_pmu_read_l0b_instr", "Local Memory", "读 L0B"],
          ["pmu_wr_l0b_instr", "Local Memory", "写 L0B"],
          ["fixp_rd_l0c_instr", "Local Memory", "FixPipe 读 L0C"],
          ["cube_sc_pmu_read_l0c_instr", "Local Memory", "Cube 读 L0C"],
          ["cube_sc_pmu_write_l0c_instr", "Local Memory", "Cube 写 L0C"],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""]
        ]
      },
      6: {
        name: "Conflict / Issue",
        events: [
          ["stu_pmu_wctl_ub_cflt", "Conflict / Stall", "STU UB 写控制冲突"],
          ["ldu_pmu_ib_ub_cflt", "Conflict / Stall", "LDU IB/UB 冲突"],
          ["pmu_idc_aic_vec_instr_vf_busy_o", "Compute", "VF 指令忙"],
          ["idu_pmu_ins_iss_cnt", "Instruction", "发射计数"],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""]
        ]
      },
      7: {
        name: "UB / ACC Access",
        events: [
          ["pmu_rd_acc_ub_instr_p", "Local Memory", "读 ACC/UB"],
          ["pmu_wr_acc_ub_instr_p", "Local Memory", "写 ACC/UB"],
          ["pmu_fix_wr_ub_instr", "Local Memory", "FixPipe 写 UB"],
          ["mte_sc_pmu_write_acc_ub_instr_0", "Memory Pipe", "MTE 写 ACC/UB"],
          ["mte_sc_pmu_read_acc_ub_instr_0", "Memory Pipe", "MTE 读 ACC/UB"],
          ["ub_pmu_vec_rd_ub_acc", "Local Memory", "Vector 读 UB/ACC"],
          ["ub_pmu_vec_wr_ub_acc", "Local Memory", "Vector 写 UB/ACC"],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""]
        ]
      },
      8: {
        name: "L2 Cache",
        events: [
          ["bif_sc_pmu_ar_close_l2_hit_core", "Cache / L2", "L2 读 hit"],
          ["bif_sc_pmu_ar_close_l2_miss_core", "Cache / L2", "L2 读 miss"],
          ["bif_sc_pmu_ar_close_l2_victim_core", "Cache / L2", "L2 读 victim"],
          ["bif_sc_pmu_aw_close_l2_hit_core", "Cache / L2", "L2 写 hit"],
          ["bif_sc_pmu_aw_close_l2_miss_core", "Cache / L2", "L2 写 miss"],
          ["bif_sc_pmu_aw_close_l2_victim_core", "Cache / L2", "L2 写 victim"],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""],
          ["0x0", "Invalid", ""]
        ]
      }
    }
  },
  dav2201: {
    label: "dav_2201",
    counterCapacity: 8,
    groups: {
      1: {
        name: "Arithmetic",
        events: [
          ["cube_fp16_exec", "Compute", "Cube FP16 执行"],
          ["cube_int8_exec", "Compute", "Cube INT8 执行"],
          ["vec_fp32_exec", "Compute", "Vector FP32 执行"],
          ["vec_fp16_128lane_exec", "Compute", "Vector FP16 128 lane"],
          ["vec_fp16_64lane_exec", "Compute", "Vector FP16 64 lane"],
          ["vec_int32_exec", "Compute", "Vector INT32 执行"],
          ["vec_misc_exec", "Compute", "Vector misc 执行"]
        ]
      },
      2: {
        name: "Pipeline Utilization",
        events: [
          ["vec_busy_cycles", "Compute", "Vector busy cycles"],
          ["cube_busy_cycles", "Compute", "Cube busy cycles"],
          ["scalar_busy_cycles", "Compute", "Scalar busy cycles"],
          ["mte1_busy_cycles", "Memory Pipe", "MTE1 busy cycles"],
          ["mte2_busy_cycles", "Memory Pipe", "MTE2 busy cycles"],
          ["mte3_busy_cycles", "Memory Pipe", "MTE3 busy cycles"],
          ["icache_miss", "Instruction", "I-cache miss"],
          ["icache_req", "Instruction", "I-cache request"]
        ]
      },
      4: {
        name: "Memory",
        events: [
          ["ub_read_req", "Local Memory", "UB read request"],
          ["ub_write_req", "Local Memory", "UB write request"],
          ["l1_read_req", "Local Memory", "L1 read request"],
          ["l1_write_req", "Local Memory", "L1 write request"],
          ["l2_read_req", "Cache / L2", "L2 read request"],
          ["l2_write_req", "Cache / L2", "L2 write request"],
          ["main_read_req", "Memory Pipe", "Main memory read"],
          ["main_write_req", "Memory Pipe", "Main memory write"]
        ]
      },
      5: {
        name: "L0 Memory",
        events: [
          ["l0a_read_req", "Local Memory", "L0A read request"],
          ["l0a_write_req", "Local Memory", "L0A write request"],
          ["l0b_read_req", "Local Memory", "L0B read request"],
          ["l0b_write_req", "Local Memory", "L0B write request"],
          ["l0c_read_req", "Local Memory", "L0C read request"],
          ["l0c_write_req", "Local Memory", "L0C write request"]
        ]
      },
      6: {
        name: "Conflict / Stall",
        events: [
          ["bankgroup_stall_cycles", "Conflict / Stall", "Bank group stall"],
          ["bank_stall_cycles", "Conflict / Stall", "Bank stall"],
          ["vec_resc_conflict_cycles", "Conflict / Stall", "Vector resource conflict"]
        ]
      },
      7: {
        name: "UB Bandwidth",
        events: [
          ["ub_read_bw_mte", "Memory Pipe", "MTE UB read bandwidth"],
          ["l2_write_bw", "Cache / L2", "L2 write bandwidth"],
          ["main_mem_write_bw", "Memory Pipe", "Main memory write bandwidth"],
          ["ub_write_bw_mte", "Memory Pipe", "MTE UB write bandwidth"],
          ["ub_read_bw_vector", "Local Memory", "Vector UB read bandwidth"],
          ["ub_write_bw_vector", "Local Memory", "Vector UB write bandwidth"],
          ["ub_read_bw_scalar", "Local Memory", "Scalar UB read bandwidth"],
          ["ub_write_bw_scalar", "Local Memory", "Scalar UB write bandwidth"]
        ]
      },
      8: {
        name: "L2 Cache",
        events: [
          ["write_cache_hit", "Cache / L2", "Write cache hit"],
          ["write_cache_miss_allocate", "Cache / L2", "Write cache miss allocate"],
          ["r0_read_cache_hit", "Cache / L2", "R0 read cache hit"],
          ["r0_read_cache_miss_allocate", "Cache / L2", "R0 read cache miss allocate"],
          ["r1_read_cache_hit", "Cache / L2", "R1 read cache hit"],
          ["r1_read_cache_miss_allocate", "Cache / L2", "R1 read cache miss allocate"]
        ]
      }
    }
  }
};

const CATEGORY = {
  "Compute": { icon: "C", className: "type-compute" },
  "Memory Pipe": { icon: "M", className: "type-memory" },
  "Local Memory": { icon: "L", className: "type-memory" },
  "Cache / L2": { icon: "K", className: "type-cache" },
  "Instruction": { icon: "I", className: "type-instruction" },
  "Conflict / Stall": { icon: "S", className: "type-conflict" },
  "Sync / Wait": { icon: "W", className: "type-sync" },
  "Outlier": { icon: "O", className: "type-outlier" }
};

const SAMPLE_RUNS = {
  dav3510: {
    name: "A5 sample run",
    group: "2",
    lanes: ["AIC 0", "AIC 1", "AIV 0", "AIV 1", "AI-CPU"],
    tasks: [
      makeTask("t1", "AIC 0", "CALL Q-MatMul", 6, 170, "AIC", 0, 10015, 2, {
        pmu_idc_aic_vec_busy_o: 18, cube_instr_busy: 920, scalar_instr_busy: 106, mte1_instr_busy: 214,
        mte2_instr_busy: 442, mte3_instr_busy: 60, icache_req: 92, icache_miss: 4, pmu_fix_instr_busy: 318
      }, ["compute", "memory", "compute", "sync"], "mix-0"),
      makeTask("t2", "AIV 0", "Dequant + RoPE", 42, 168, "AIV", 2, 10016, 3, {
        pmu_idc_aic_vec_busy_o: 706, cube_instr_busy: 18, scalar_instr_busy: 82, mte1_instr_busy: 30,
        mte2_instr_busy: 326, mte3_instr_busy: 284, icache_req: 144, icache_miss: 19, pmu_fix_instr_busy: 12
      }, ["wait", "compute", "memory"], "mix-0", { waitFor: "t1", wait: 31 }),
      makeTask("t3", "AIC 1", "CALL Cache-MatMul", 190, 164, "AIC", 1, 10017, 2, {
        pmu_idc_aic_vec_busy_o: 16, cube_instr_busy: 740, scalar_instr_busy: 91, mte1_instr_busy: 244,
        mte2_instr_busy: 638, mte3_instr_busy: 58, icache_req: 86, icache_miss: 3, pmu_fix_instr_busy: 264
      }, ["memory", "compute", "sync"], "mix-1"),
      makeTask("t4", "AIV 1", "Softmax vector", 210, 142, "AIV", 3, 10018, 3, {
        pmu_idc_aic_vec_busy_o: 622, cube_instr_busy: 14, scalar_instr_busy: 76, mte1_instr_busy: 20,
        mte2_instr_busy: 398, mte3_instr_busy: 364, icache_req: 118, icache_miss: 12, pmu_fix_instr_busy: 8
      }, ["wait", "compute", "memory"], "mix-1", { waitFor: "t3", wait: 24 }),
      makeTask("t5", "AIC 0", "OutCast", 386, 96, "AIC", 0, 10019, 4, {
        pmu_idc_aic_vec_busy_o: 28, cube_instr_busy: 168, scalar_instr_busy: 54, mte1_instr_busy: 74,
        mte2_instr_busy: 246, mte3_instr_busy: 226, icache_req: 62, icache_miss: 2, pmu_fix_instr_busy: 512
      }, ["compute", "memory"], "mix-2"),
      makeTask("t6", "AI-CPU", "schedule dispatch", 18, 88, "AI-CPU", 8, 10020, 1, {
        pmu_idc_aic_vec_busy_o: 0, cube_instr_busy: 0, scalar_instr_busy: 48, mte1_instr_busy: 0,
        mte2_instr_busy: 0, mte3_instr_busy: 0, icache_req: 34, icache_miss: 1, pmu_fix_instr_busy: 0
      }, ["unknown"], null),
      makeTask("t7", "AIV 0", "Cast + copy out", 405, 118, "AIV", 2, 10021, 5, {
        pmu_idc_aic_vec_busy_o: 332, cube_instr_busy: 4, scalar_instr_busy: 42, mte1_instr_busy: 8,
        mte2_instr_busy: 252, mte3_instr_busy: 624, icache_req: 60, icache_miss: 2, pmu_fix_instr_busy: 6
      }, ["compute", "memory"], "mix-2")
    ]
  },
  dav2201: {
    name: "dav_2201 sample run",
    group: "2",
    lanes: ["Core 0", "Core 1", "Core 2", "AI-CPU"],
    tasks: [
      makeTask("d1", "Core 0", "CALL MatMul", 8, 150, "AICore", 0, 9015, 2, {
        vec_busy_cycles: 42, cube_busy_cycles: 770, scalar_busy_cycles: 88, mte1_busy_cycles: 206,
        mte2_busy_cycles: 388, mte3_busy_cycles: 56, icache_miss: 5, icache_req: 84
      }, ["compute", "memory"]),
      makeTask("d2", "Core 1", "Vector post", 74, 136, "AICore", 1, 9016, 3, {
        vec_busy_cycles: 642, cube_busy_cycles: 22, scalar_busy_cycles: 72, mte1_busy_cycles: 28,
        mte2_busy_cycles: 288, mte3_busy_cycles: 298, icache_miss: 16, icache_req: 132
      }, ["compute", "memory"]),
      makeTask("d3", "Core 2", "Copy out", 230, 122, "AICore", 2, 9017, 4, {
        vec_busy_cycles: 188, cube_busy_cycles: 86, scalar_busy_cycles: 56, mte1_busy_cycles: 40,
        mte2_busy_cycles: 186, mte3_busy_cycles: 538, icache_miss: 3, icache_req: 54
      }, ["memory", "compute"]),
      makeTask("d4", "AI-CPU", "schedule", 22, 82, "AI-CPU", 8, 9018, 1, {
        vec_busy_cycles: 0, cube_busy_cycles: 0, scalar_busy_cycles: 46, mte1_busy_cycles: 0,
        mte2_busy_cycles: 0, mte3_busy_cycles: 0, icache_miss: 1, icache_req: 30
      }, ["unknown"])
    ]
  }
};

const state = {
  chip: "dav3510",
  group: "2",
  selectedTaskId: null,
  markerRules: new Set(["top-duration", "top-counter", "outlier"]),
  manualPins: new Set(),
  mixMode: true,
  activeIssueId: null,
  activeView: "issues",
  openedArtifact: null
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  setupControls();
  renderAll();
  showToast("已加载 sample-driven PMU 泳道原型。真实 A5 CSV 接入后可替换数据源。");
});

function bindElements() {
  [
    "chipSelect", "groupSelect", "refreshButton", "compareButton", "expertButton", "validCounterBadge",
    "captureSummary", "captureMeta", "issueList", "ruleList", "clearMarkersButton", "mixToggle",
    "timelineSubtitle", "legendRow", "timeline", "jumpStatus", "jumpChain", "hardwareStatus",
    "hardwareMap", "emptyState", "detailPanel", "detailKicker", "detailTitle", "pinButton",
    "taskIdentity", "evidenceCard", "counterList", "jumpTargets", "futureList", "artifactViewer",
    "artifactTitle", "artifactMeta", "artifactBody", "closeArtifactButton", "toast"
  ].forEach(id => {
    els[id] = document.getElementById(id);
  });
}

function setupControls() {
  els.chipSelect.value = state.chip;
  populateGroupSelect();

  els.chipSelect.addEventListener("change", event => {
    state.chip = event.target.value;
    state.group = SAMPLE_RUNS[state.chip].group;
    state.selectedTaskId = null;
    state.activeIssueId = null;
    populateGroupSelect();
    renderAll();
    showToast("已切换芯片 / 架构上下文，并刷新泳道与 PMU 映射。");
  });

  els.groupSelect.addEventListener("change", event => {
    state.group = event.target.value;
    state.selectedTaskId = null;
    renderAll();
    showToast("PMU group 已切换。真实环境中需要重新运行采集才能得到该组数据。");
  });

  els.refreshButton.addEventListener("click", () => {
    state.selectedTaskId = null;
    renderAll();
    showToast("当前上下文已刷新。");
  });

  els.clearMarkersButton.addEventListener("click", () => {
    state.markerRules.clear();
    state.manualPins.clear();
    renderAll();
  });

  els.mixToggle.addEventListener("change", event => {
    state.mixMode = event.target.checked;
    renderAll();
  });

  els.compareButton.addEventListener("click", () => showToast("Compare runs 是预留入口：首版展示空状态，后续接入多次运行对比。"));
  els.expertButton.addEventListener("click", () => showToast("Expert explanation 是预留入口：后续为每个 counter 补充完整专家解释。"));

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  document.querySelectorAll(".seg-button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".seg-button").forEach(item => item.classList.remove("active"));
      btn.classList.add("active");
      state.activeView = btn.dataset.view;
      renderAll();
    });
  });

  els.closeArtifactButton.addEventListener("click", () => {
    state.openedArtifact = null;
    renderArtifactViewer();
  });

  els.pinButton.addEventListener("click", () => {
    if (!state.selectedTaskId) return;
    if (state.manualPins.has(state.selectedTaskId)) {
      state.manualPins.delete(state.selectedTaskId);
      showToast("已取消手动 pin。");
    } else {
      state.manualPins.add(state.selectedTaskId);
      showToast("已将当前 task pin 到时间轴。");
    }
    renderAll();
  });
}

function populateGroupSelect() {
  const groupIds = Object.keys(PMU_GROUPS[state.chip].groups);
  els.groupSelect.innerHTML = groupIds.map(id => {
    const group = PMU_GROUPS[state.chip].groups[id];
    return `<option value="${id}">Group ${id} · ${group.name}</option>`;
  }).join("");
  els.groupSelect.value = state.group;
}

function renderAll() {
  renderViewControls();
  renderContext();
  renderLegend();
  renderRules();
  renderIssues();
  renderTimeline();
  renderDetail();
  renderArtifactViewer();
}

function renderViewControls() {
  document.querySelectorAll(".seg-button").forEach(button => {
    button.classList.toggle("active", button.dataset.view === state.activeView);
  });
}

function renderContext() {
  const chip = PMU_GROUPS[state.chip];
  const group = chip.groups[state.group];
  const effective = getEffectiveEvents();
  const collected = hasCollectedGroup();
  els.validCounterBadge.textContent = `valid ${effective.length}/${chip.counterCapacity}`;
  els.captureSummary.textContent = collected
    ? `本次上下文为 ${chip.label}，当前展示已采集的 Group ${state.group} · ${group.name}。每次运行只采集一个 PMU group，界面只展示有效 counter。`
    : `当前切到 Group ${state.group} · ${group.name} 的 schema 说明。真实运行只采集 Group ${SAMPLE_RUNS[state.chip].group}；若要查看该组 counter 值，需要重新运行采集。`;
  els.captureMeta.innerHTML = [
    ["chip", chip.label],
    ["group", `PROF_PMU_EVENT_TYPE=${state.group}`],
    ["capacity", `${chip.counterCapacity} slots`],
    ["effective", `${effective.length} counters`],
    ["data", collected ? "collected" : "schema only"]
  ].map(([k, v]) => `<div class="meta-item"><span>${k}</span><strong>${v}</strong></div>`).join("");
  els.timelineSubtitle.textContent = `${chip.label} · Group ${state.group} · ${group.name} · ${collected ? "sample values" : "schema only"}`;
  if (state.activeView === "markers") {
    els.timelineSubtitle.textContent += " · marker rule review";
  } else if (state.activeView === "paths") {
    els.timelineSubtitle.textContent += " · jump path inspection";
  }
  els.mixToggle.disabled = state.chip !== "dav3510";
  if (state.chip !== "dav3510") state.mixMode = false;
  els.mixToggle.checked = state.mixMode;
}

function renderLegend() {
  const categories = [...new Set(getEffectiveEvents().map(event => event.category))];
  if (state.mixMode) categories.push("Sync / Wait");
  categories.push("Outlier");
  els.legendRow.innerHTML = categories.map(category => {
    const meta = CATEGORY[category] || CATEGORY.Outlier;
    return `<span class="legend-item"><i class="legend-dot ${meta.className}">${meta.icon}</i>${category}</span>`;
  }).join("");
}

function renderRules() {
  const rules = [
    ["top-duration", "标出 total cycle 最长 task"],
    ["top-counter", "标出每个有效 counter 的 Top hotspot"],
    ["outlier", "标出 P95 以上异常 task"],
    ["icache", "标出 I-cache 相关异常"],
    ["memory", "标出 Memory Pipe 压力"]
  ];
  els.ruleList.innerHTML = rules.map(([id, label]) => {
    const active = state.markerRules.has(id) ? " active" : "";
    return `<button class="rule-button${active}" data-rule="${id}" type="button">${label}</button>`;
  }).join("");
  els.ruleList.querySelectorAll(".rule-button").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.rule;
      if (state.markerRules.has(id)) state.markerRules.delete(id);
      else state.markerRules.add(id);
      renderAll();
    });
  });
}

function renderIssues() {
  const issues = getIssues().slice(0, 5);
  els.issueList.innerHTML = issues.map(issue => `
    <button class="issue-item${state.activeIssueId === issue.id ? " active" : ""}" data-issue="${issue.id}" data-task="${issue.taskId}" type="button">
      <span>${issue.type}</span>
      <strong>${issue.title}</strong>
      <p>${issue.detail}</p>
    </button>
  `).join("");
  els.issueList.querySelectorAll(".issue-item").forEach(item => {
    item.addEventListener("click", () => {
      state.activeIssueId = item.dataset.issue;
      state.selectedTaskId = item.dataset.task;
      renderAll();
    });
  });
}

function renderTimeline() {
  const run = SAMPLE_RUNS[state.chip];
  const maxEnd = Math.max(...run.tasks.map(task => task.start + task.duration));
  const scaleEnd = Math.ceil(maxEnd / 100) * 100;
  const markers = getMarkers();
  let html = `<div class="time-scale"><strong>lane / task</strong>${Array.from({ length: 10 }, (_, index) => `<span>${Math.round(scaleEnd * index / 10)}us</span>`).join("")}</div>`;

  run.lanes.forEach(lane => {
    const laneTasks = run.tasks.filter(task => task.lane === lane);
    const laneSelected = laneTasks.some(task => task.id === state.selectedTaskId) ? " has-selection" : "";
    html += `<section class="lane"><div class="lane-row${laneSelected}"><h3 class="lane-title">${lane}</h3><div class="track">`;
    laneTasks.forEach(task => {
      const left = task.start / scaleEnd * 100;
      const width = task.duration / scaleEnd * 100;
      const compact = !state.mixMode || state.chip !== "dav3510" ? " compact" : "";
      const selected = state.selectedTaskId === task.id ? " selected" : "";
      html += `
        <button class="task-bar${compact}${selected}" data-task="${task.id}" style="left:${left}%;width:${width}%;" type="button" aria-label="${task.name}">
          <span class="task-sub">${task.seqNo} · ${task.subTaskId}</span>
          ${renderSegments(task)}
          <span class="task-label">${task.name}</span>
        </button>
        ${markers.filter(marker => marker.taskId === task.id).map(marker => renderMarker(marker, left + width / 2)).join("")}`;
    });
    html += `</div></div></section>`;
  });

  els.timeline.innerHTML = html;
  els.timeline.querySelectorAll(".task-bar[data-task]").forEach(node => {
    node.addEventListener("click", event => {
      event.stopPropagation();
      state.selectedTaskId = node.dataset.task;
      renderAll();
    });
  });
  els.timeline.querySelectorAll(".marker").forEach(marker => {
    marker.addEventListener("click", event => {
      event.stopPropagation();
      openArtifact("counter", marker.dataset.task);
      switchTab("summary");
    });
  });
}

function renderSegments(task) {
  const segments = task.segments || [{ type: "unknown", ratio: 1 }];
  return segments.map(segment => {
    const type = segment.type === "sync set" ? "sync" : segment.type;
    const title = `${segment.type} · ${Math.round(segment.ratio * task.duration)}us`;
    return `<i class="segment ${type}" title="${title}" style="width:${segment.ratio * 100}%"></i>`;
  }).join("");
}

function renderMarker(marker, center) {
  const meta = CATEGORY[marker.category] || CATEGORY.Outlier;
  const active = state.selectedTaskId === marker.taskId ? " active" : "";
  return `<button class="marker ${meta.className}${active}" data-task="${marker.taskId}" style="left:${center}%;" type="button" title="${marker.title}">${meta.icon}</button>`;
}

function renderDetail() {
  const task = getSelectedTask();
  if (!task) {
    els.emptyState.classList.remove("hidden");
    els.detailPanel.classList.add("hidden");
    renderJumpAndHardware(null);
    return;
  }

  els.emptyState.classList.add("hidden");
  els.detailPanel.classList.remove("hidden");
  const dominant = getDominantCounter(task);
  els.detailKicker.textContent = `${task.coreType} · ${task.lane}`;
  els.detailTitle.textContent = task.name;
  els.taskIdentity.innerHTML = [
    ["thread id", task.threadId],
    ["task id", task.taskId],
    ["stream id", task.streamId],
    ["core id", task.coreId],
    ["seqNo", task.seqNo],
    ["sub task id", task.subTaskId],
    ["total cycle", task.totalCycle],
    ["Mix group", task.mixGroup || "not available"]
  ].map(([k, v]) => `<div class="identity-item"><span>${k}</span><strong>${v}</strong></div>`).join("");

  els.evidenceCard.innerHTML = `
    <h3>触发证据</h3>
    <p>当前 task 的主导关注项为 <strong>${dominant.event}</strong>，语义分类为 <strong>${dominant.category}</strong>。${hasCollectedGroup() ? "该判断基于 sample PMU counter 排序，不等价于自动根因诊断。" : "当前 group 仅展示 schema，真实 counter 值需要重新运行采集。"}</p>
  `;

  const effective = getEffectiveEvents();
  const collected = hasCollectedGroup();
  const maxValue = Math.max(...effective.map(event => task.counters[event.name] || 0), 1);
  els.counterList.innerHTML = effective.map(event => {
    const value = task.counters[event.name] || 0;
    const width = collected ? Math.max(2, value / maxValue * 100) : 0;
    return `
      <div class="counter-item">
        <span>${event.category}</span>
        <strong>${event.name}</strong>
        <p>${event.explanation}</p>
        <div class="counter-row">
          <div class="mini-bar"><i style="width:${width}%"></i></div>
          <div class="counter-value">${collected ? value : "N/A"}</div>
        </div>
      </div>`;
  }).join("");

  els.jumpTargets.innerHTML = [
    ["source", "源码", "semantic_label / source mapping", true],
    ["call", "Execute Graph CALL", `callOpMagic=${task.callOpMagic}`, true],
    ["block", "Block Graph leaf", `leafHash=${task.leafHash}`, true],
    ["root", "Execute Graph root", `rootHash=${task.rootHash}`, true],
    ["hardware", "硬件路径", `${dominant.category} -> ${hardwarePathFor(task, dominant.category).join(" -> ")}`, true],
    ["bufferid", "BufferID", "not available in current trace", false]
  ].map(([kind, label, desc, enabled]) => `
    <button class="jump-target${enabled ? "" : " disabled"}" data-artifact="${kind}" type="button" ${enabled ? "" : "disabled"}>
      <div><span>${desc}</span><strong>${label}</strong></div>
      <strong>${enabled ? "Open" : "N/A"}</strong>
    </button>
  `).join("");
  els.jumpTargets.querySelectorAll(".jump-target:not(.disabled)").forEach(target => {
    target.addEventListener("click", () => openArtifact(target.dataset.artifact, task.id));
  });

  els.futureList.innerHTML = [
    ["Compare runs", "多次运行对比入口，后续比较同一 task / counter 在不同 run 中的变化。"],
    ["Expert explanation", "完整专家解释入口，后续补充 group 选择建议、counter 解释和调参方向。"],
    ["BufferID direct field", "Sync / Wait 详情预留字段，真实 trace 支持后升级为直出。"],
    ["URMA / CCU extension layer", "硬件路径扩展层入口，默认关闭，避免误认为当前 runtime 事实。"],
    ["View all groups", "完整 PMU group 说明入口，帮助用户决定下一次采集选择。"]
  ].map(([title, desc]) => `
    <div class="future-item">
      <div><strong>${title}</strong><p>${desc}</p></div>
      <span class="future-state">reserved</span>
    </div>
  `).join("");

  renderJumpAndHardware(task);
}

function bindChainActions() {
  els.jumpChain.querySelectorAll("button.chain-node").forEach(button => {
    button.addEventListener("click", () => openArtifact(button.dataset.artifact, button.dataset.task));
  });
}

function bindHardwareActions() {
  els.hardwareMap.querySelectorAll("button.hardware-node").forEach(button => {
    button.addEventListener("click", () => openArtifact("hardware", button.dataset.task, button.dataset.node));
  });
}

function openArtifact(kind, taskId, focus = "") {
  const fallbackTask = getSelectedTask() || SAMPLE_RUNS[state.chip].tasks[0];
  const task = SAMPLE_RUNS[state.chip].tasks.find(item => item.id === taskId) || fallbackTask;
  if (task) state.selectedTaskId = task.id;
  state.openedArtifact = { kind, taskId: task?.id || null, focus };
  renderAll();
}

function renderArtifactViewer() {
  if (!state.openedArtifact) {
    els.artifactViewer.classList.add("hidden");
    return;
  }
  const task = SAMPLE_RUNS[state.chip].tasks.find(item => item.id === state.openedArtifact.taskId) || getSelectedTask();
  const content = buildArtifactContent(state.openedArtifact.kind, task, state.openedArtifact.focus);
  els.artifactViewer.classList.remove("hidden");
  els.artifactTitle.textContent = content.title;
  els.artifactMeta.textContent = content.meta;
  els.artifactBody.innerHTML = content.body;
}

function buildArtifactContent(kind, task, focus = "") {
  if (!task) {
    return {
      title: "选择 task 后查看定位内容",
      meta: "empty state",
      body: "<p>请先点击泳道上的 task 或 marker，再打开源码、CALL、Block Graph 或硬件路径。</p>"
    };
  }

  const dominant = getDominantCounter(task);
  const path = hardwarePathFor(task, dominant.category);
  const snippets = {
    source: {
      title: `源码片段 · ${task.name}`,
      meta: `semantic_label -> ${task.name}`,
      body: `<p>这是原型中的源码定位示例。真实接入后由 <code>semantic_label</code> 或源码映射表打开对应文件与行号。</p><pre><code>${escapeHtml(sourceSnippet(task))}</code></pre>`
    },
    task: {
      title: `Swimlane task · ${task.name}`,
      meta: `${task.lane} · ${task.seqNo}`,
      body: `<p>该 task 是 PMU marker 与一跳定位链路的运行时锚点。</p><pre><code>${escapeHtml(JSON.stringify(taskRuntimeView(task), null, 2))}</code></pre>`
    },
    counter: {
      title: `PMU counter evidence · ${dominant.event}`,
      meta: `${dominant.category} · Group ${state.group}`,
      body: `<p>异常 counter 打开后展示证据，不直接下根因结论。</p><pre><code>${escapeHtml(JSON.stringify(counterEvidence(task), null, 2))}</code></pre>`
    },
    call: {
      title: `Execute Graph CALL · ${task.callOpMagic}`,
      meta: `event-hint.callOpMagic`,
      body: `<p>CALL 是从泳道 task 回到 Execute Graph 的核心定位点。</p><pre><code>${escapeHtml(JSON.stringify(callNode(task), null, 2))}</code></pre>`
    },
    block: {
      title: `Block Graph leaf · ${task.leafHash}`,
      meta: `event-hint.leafHash`,
      body: `<p>Block Graph leaf 用于查看更细的算子、buffer 与 pass 后结构。</p><pre><code>${escapeHtml(JSON.stringify(blockLeaf(task), null, 2))}</code></pre>`
    },
    root: {
      title: `Execute Graph root · ${task.rootHash}`,
      meta: `event-hint.rootHash`,
      body: `<p>Root 定位当前 CALL 所属的 Execute Graph 上下文。</p><pre><code>${escapeHtml(JSON.stringify(rootGraph(task), null, 2))}</code></pre>`
    },
    hardware: {
      title: `硬件路径 · ${focus || path[path.length - 1]}`,
      meta: `${task.coreType} · ${dominant.category}`,
      body: `<p>硬件路径基于 core type、counter 语义和 Mix 状态推导；它是解释层，不等价于所有节点都由当前 trace 直出。</p><pre><code>${escapeHtml(path.join(" -> "))}</code></pre>`
    }
  };
  return snippets[kind] || snippets.task;
}

function renderJumpAndHardware(task) {
  if (state.activeView === "markers") {
    els.jumpStatus.textContent = "markers";
    const markers = getMarkers();
    els.jumpChain.innerHTML = markers.length ? markers.slice(0, 10).map(marker => {
      const taskLabel = SAMPLE_RUNS[state.chip].tasks.find(item => item.id === marker.taskId)?.name || marker.taskId;
      return `<button class="chain-node" data-task="${marker.taskId}" data-artifact="counter" type="button">${marker.title} · ${taskLabel}</button>`;
    }).join("") : `<span class="chain-node">当前没有可见 marker</span>`;
    bindChainActions();
    if (!task) {
      els.hardwareStatus.textContent = "marker mode";
      els.hardwareMap.innerHTML = ["点击 marker", "打开 evidence", "再跳 source / CALL / Block / hardware"].map(node => `<button class="hardware-node" data-artifact="hardware" data-node="${node}" type="button">${node}</button>`).join("");
      bindHardwareActions();
      return;
    }
    const markerDominant = getDominantCounter(task);
    const markerPath = hardwarePathFor(task, markerDominant.category);
    els.hardwareStatus.textContent = "selected marker";
    els.hardwareMap.innerHTML = markerPath.map((node, index) => `<button class="hardware-node${index === markerPath.length - 1 ? " active" : ""}" data-artifact="hardware" data-task="${task.id}" data-node="${node}" type="button">${node}</button>`).join("");
    bindHardwareActions();
    return;
  }

  if (!task) {
    els.jumpStatus.textContent = "ready";
    if (state.activeView === "paths") {
      els.jumpStatus.textContent = "select task";
      els.jumpChain.innerHTML = ["source", "CALL", "Block Graph", "hardware path"]
        .map(node => `<button class="chain-node" data-artifact="${node === "source" ? "source" : node === "CALL" ? "call" : node === "Block Graph" ? "block" : "hardware"}" type="button">${node}</button>`)
        .join('<span class="chain-arrow">-&gt;</span>');
      bindChainActions();
    } else {
      els.jumpChain.innerHTML = ["PMU marker", "swimlane task", "source", "CALL", "Block Graph", "hardware path"]
        .map((node, index, arr) => `<span class="chain-node">${node}</span>${index < arr.length - 1 ? '<span class="chain-arrow">-&gt;</span>' : ""}`)
        .join("");
    }
    els.hardwareStatus.textContent = "inferred";
    els.hardwareMap.innerHTML = ["AIC/AIV", "GM", "L2", "local buffer", "sync path"].map(node => `<button class="hardware-node" data-artifact="hardware" data-node="${node}" type="button">${node}</button>`).join("");
    bindHardwareActions();
    return;
  }

  const dominant = getDominantCounter(task);
  const path = hardwarePathFor(task, dominant.category);
  els.jumpStatus.textContent = "linked";
  els.jumpChain.innerHTML = [
    ["counter", dominant.event],
    ["task", task.name],
    ["source", "semantic_label"],
    ["call", `CALL ${task.callOpMagic}`],
    ["block", `leaf ${task.leafHash}`],
    ["hardware", path[path.length - 1]]
  ].map(([kind, node], index, arr) => `<button class="chain-node" data-artifact="${kind}" data-task="${task.id}" type="button">${node}</button>${index < arr.length - 1 ? '<span class="chain-arrow">-&gt;</span>' : ""}`).join("");
  els.hardwareStatus.textContent = task.coreType === "AIV" && state.mixMode ? "mix inferred" : "inferred";
  els.hardwareMap.innerHTML = path.map((node, index) => `<button class="hardware-node${index === path.length - 1 ? " active" : ""}" data-artifact="hardware" data-task="${task.id}" data-node="${node}" type="button">${node}</button>`).join("");
  bindChainActions();
  bindHardwareActions();
}

function switchTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.toggle("active", tab.dataset.tab === tabId));
  document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.toggle("hidden", panel.dataset.panel !== tabId));
}

function getEffectiveEvents() {
  const events = PMU_GROUPS[state.chip].groups[state.group].events;
  return events
    .filter(event => event[0] !== "0x0" && event[1] !== "Invalid")
    .map(([name, category, explanation]) => ({ name, category, explanation }));
}

function getSelectedTask() {
  return SAMPLE_RUNS[state.chip].tasks.find(task => task.id === state.selectedTaskId) || null;
}

function getIssues() {
  const tasks = SAMPLE_RUNS[state.chip].tasks;
  const effective = getEffectiveEvents();
  const collected = hasCollectedGroup();
  const longest = [...tasks].sort((a, b) => b.totalCycle - a.totalCycle)[0];
  const topCounter = collected ? effective.map(event => {
    const task = [...tasks].sort((a, b) => (b.counters[event.name] || 0) - (a.counters[event.name] || 0))[0];
    return {
      id: `counter-${event.name}`,
      taskId: task.id,
      type: event.category,
      title: `${event.name} hotspot`,
      detail: `${task.name} 在该 counter 上最高，值为 ${task.counters[event.name] || 0}。`
    };
  }) : [];
  const outlier = [...tasks].sort((a, b) => scoreTask(b) - scoreTask(a))[0];
  const issues = [
    { id: "longest", taskId: longest.id, type: "Longest task", title: longest.name, detail: `total cycle ${longest.totalCycle}，优先检查耗时与主导 counter。` },
    { id: "outlier", taskId: outlier.id, type: "Outlier", title: outlier.name, detail: "综合 duration 与 PMU counter 后属于优先关注项。" },
    ...topCounter
  ];
  const unique = [];
  issues.forEach(issue => {
    if (!unique.some(item => item.id === issue.id || (item.taskId === issue.taskId && item.type === issue.type))) {
      unique.push(issue);
    }
  });
  return unique;
}

function getMarkers() {
  const markers = [];
  const issues = getIssues();
  const collected = hasCollectedGroup();
  if (state.markerRules.has("top-duration")) {
    const issue = issues.find(item => item.id === "longest");
    if (issue) markers.push(markerFromIssue(issue, "Outlier"));
  }
  if (collected && state.markerRules.has("top-counter")) {
    issues.filter(item => item.id.startsWith("counter-")).slice(0, 5).forEach(issue => markers.push(markerFromIssue(issue, issue.type)));
  }
  if (state.markerRules.has("outlier")) {
    const issue = issues.find(item => item.id === "outlier");
    if (issue) markers.push(markerFromIssue(issue, "Outlier"));
  }
  if (collected && state.markerRules.has("icache")) {
    issues.filter(item => item.title.includes("icache")).forEach(issue => markers.push(markerFromIssue(issue, "Instruction")));
  }
  if (collected && state.markerRules.has("memory")) {
    issues.filter(item => item.type === "Memory Pipe" || item.type === "Local Memory").slice(0, 3).forEach(issue => markers.push(markerFromIssue(issue, issue.type)));
  }
  state.manualPins.forEach(taskId => markers.push({ id: `pin-${taskId}`, taskId, category: "Outlier", title: "manual pin" }));
  return dedupeMarkers(markers);
}

function markerFromIssue(issue, category) {
  return { id: issue.id, taskId: issue.taskId, category, title: issue.title };
}

function dedupeMarkers(markers) {
  const seen = new Set();
  return markers.filter(marker => {
    const key = `${marker.id}-${marker.taskId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getDominantCounter(task) {
  if (!hasCollectedGroup()) {
    return { event: "total cycle", category: "Outlier", value: task.totalCycle };
  }
  const effective = getEffectiveEvents();
  const sorted = [...effective].sort((a, b) => (task.counters[b.name] || 0) - (task.counters[a.name] || 0));
  const top = sorted[0] || { name: "total cycle", category: "Outlier" };
  return { event: top.name, category: top.category, value: task.counters[top.name] || task.totalCycle };
}

function hardwarePathFor(task, category) {
  if (category === "Compute") {
    if (task.coreType === "AIV") return ["GM/L2", "Unified Buffer", "Vector", "Unified Buffer", "GM"];
    if (task.name.includes("OutCast")) return ["L0C", "FixPipe", "GM/L1"];
    return ["GM/L2", "L1", "L0A/L0B", "Cube", "L0C", "FixPipe"];
  }
  if (category === "Memory Pipe") return ["GM", "L2", "MTE", "local buffer", task.coreType];
  if (category === "Local Memory") return [task.coreType, "local buffer", "UB/L1/L0", "task"];
  if (category === "Cache / L2") return ["GM", "L2", task.coreType, "task"];
  if (category === "Instruction") return ["program", "I-cache", task.coreType, "task"];
  if (category === "Conflict / Stall") return ["issue", "resource conflict", task.coreType, "task"];
  if (category === "Sync / Wait") return ["CV_SYNC_SET", "control dependency", "CV_SYNC_WAIT"];
  return ["PMU", "swimlane task", "hardware context"];
}

function scoreTask(task) {
  const effective = getEffectiveEvents();
  if (!hasCollectedGroup()) return task.totalCycle;
  return task.totalCycle + effective.reduce((sum, event) => sum + (task.counters[event.name] || 0) * 0.25, 0);
}

function hasCollectedGroup() {
  return state.group === SAMPLE_RUNS[state.chip].group;
}

function makeTask(id, lane, name, start, duration, coreType, coreId, callOpMagic, subTaskId, counters, segmentTypes, mixGroup, sync = null) {
  const ratios = splitRatios(segmentTypes);
  return {
    id,
    lane,
    name,
    start,
    duration,
    coreType,
    coreId,
    threadId: coreId + 100,
    taskId: callOpMagic + subTaskId,
    streamId: coreId % 2,
    seqNo: `seq-${Math.floor(callOpMagic / 10)}`,
    subTaskId,
    totalCycle: Math.round(duration * 1000 + Object.values(counters).reduce((a, b) => a + b, 0)),
    rootHash: `root-${callOpMagic - 7}`,
    callOpMagic,
    leafHash: `leaf-${callOpMagic + 123}`,
    counters,
    segments: segmentTypes.map((type, index) => ({ type: type === "sync" ? "sync set" : type, ratio: ratios[index] })),
    mixGroup,
    sync
  };
}

function splitRatios(types) {
  if (!types.length) return [1];
  const base = {
    compute: 0.48,
    memory: 0.28,
    wait: 0.22,
    sync: 0.10,
    unknown: 1
  };
  const raw = types.map(type => base[type] || 0.2);
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map(value => value / sum);
}

function sourceSnippet(task) {
  const label = task.name.replace(/\s+/g, "_").replace(/[^\w]/g, "").toLowerCase();
  if (task.coreType === "AIV") {
    return `# source mapping sample
with pypto.scope("${label}") as s:
    q = pypto.load(tile_q)
    y = pypto.dequant(q, scale)
    y = pypto.rope(y, rotary)
    out = pypto.cast(y, dtype="float16")

# semantic_label: ${task.name}
# jump anchor: callOpMagic=${task.callOpMagic}`;
  }
  if (task.name.includes("OutCast")) {
    return `# source mapping sample
with pypto.scope("${label}") as s:
    acc = pypto.matmul(q, k, out_dtype="float32")
    out = pypto.cast(acc, dtype="float16")
    pypto.store(out, output)

# semantic_label: ${task.name}
# jump anchor: leafHash=${task.leafHash}`;
  }
  return `# source mapping sample
with pypto.scope("${label}") as s:
    lhs_tile = pypto.load(lhs)
    rhs_tile = pypto.load(rhs)
    acc = pypto.matmul(lhs_tile, rhs_tile)
    pypto.store(acc, workspace)

# semantic_label: ${task.name}
# jump anchor: rootHash=${task.rootHash}`;
}

function taskRuntimeView(task) {
  return {
    lane: task.lane,
    coreType: task.coreType,
    seqNo: task.seqNo,
    taskId: task.taskId,
    subTaskId: task.subTaskId,
    totalCycle: task.totalCycle,
    mixGroup: task.mixGroup,
    sync: task.sync || "not available"
  };
}

function counterEvidence(task) {
  const dominant = getDominantCounter(task);
  return {
    group: `PROF_PMU_EVENT_TYPE=${state.group}`,
    collected: hasCollectedGroup(),
    event: dominant.event,
    category: dominant.category,
    value: hasCollectedGroup() ? dominant.value : "N/A",
    interpretation: "Evidence only. Use source / CALL / Block Graph / hardware path to continue diagnosis."
  };
}

function callNode(task) {
  return {
    nodeType: "CALL",
    callOpMagic: task.callOpMagic,
    rootHash: task.rootHash,
    semanticLabel: task.name,
    coreHint: task.coreType,
    jumpTargets: ["source", "block_graph_leaf", "swimlane_task", "hardware_path"]
  };
}

function blockLeaf(task) {
  return {
    leafHash: task.leafHash,
    seqNo: task.seqNo,
    subTaskId: task.subTaskId,
    taskKind: task.coreType === "AIV" ? "Vector / AIV" : "Cube / AIC",
    segments: task.segments,
    mixGroup: task.mixGroup || "not available"
  };
}

function rootGraph(task) {
  return {
    rootHash: task.rootHash,
    calls: [
      { callOpMagic: task.callOpMagic, semanticLabel: task.name, selected: true },
      { callOpMagic: task.callOpMagic + 1, semanticLabel: "peer / next CALL", selected: false }
    ],
    note: "Prototype root graph payload. Real integration should open Execute Graph view."
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2800);
}
