#!/usr/bin/env python3
"""Generate share-safe L2 demo data for Fusion Performance Diagnosis.

The generated data follows PyPTO traceEvents / PMU / Mix sync schema notes,
while keeping all task timings and memory numbers synthetic. Hardware lane
count uses A5 single-die CVID mapping: 18 clusters, 1 AIC + 2 AIV per cluster.
"""

from __future__ import annotations

import json
from pathlib import Path


OUT_FILE = Path(__file__).with_name("fusion-diagnosis-a5-demo-data.json")

CORE_PER_DIE = 18
AIV_RATIO = 2
AIC_AIV_PER_DIE = 54
PID = 1
BASE_TS_US = 1_000_000.0


def aic_core_id(cluster: int) -> int:
    return cluster


def aiv_core_id(cluster: int, subblock: int) -> int:
    return CORE_PER_DIE + cluster * AIV_RATIO + subblock


def lane_id(cluster: int, kind: str, subblock: int | None = None) -> str:
    if kind == "AIC":
        return f"die0.cluster{cluster:02d}.AIC"
    return f"die0.cluster{cluster:02d}.AIV{subblock}"


def build_lanes() -> list[dict]:
    lanes = []
    for cluster in range(CORE_PER_DIE):
        core_id = aic_core_id(cluster)
        lanes.append(
            {
                "laneId": lane_id(cluster, "AIC"),
                "die": 0,
                "cluster": cluster,
                "coreType": "AIC",
                "role": "Cube Core",
                "physicalCoreId": core_id,
                "tid": 1000 + core_id * 2,
            }
        )
        for subblock in range(AIV_RATIO):
            core_id = aiv_core_id(cluster, subblock)
            lanes.append(
                {
                    "laneId": lane_id(cluster, "AIV", subblock),
                    "die": 0,
                    "cluster": cluster,
                    "subblock": subblock,
                    "coreType": "AIV",
                    "role": "Vector Core",
                    "physicalCoreId": core_id,
                    "tid": 1000 + core_id * 2,
                }
            )
    return lanes


def metadata_events(lanes: list[dict]) -> list[dict]:
    events = [
        {
            "name": "process_name",
            "ph": "M",
            "pid": PID,
            "tid": 0,
            "args": {"name": "A5 / Ascend 950 single-die Fusion Diagnosis demo"},
        }
    ]
    for lane in lanes:
        events.append(
            {
                "name": "thread_name",
                "ph": "M",
                "pid": PID,
                "tid": lane["tid"],
                "args": {
                    "name": lane["laneId"],
                    "coreType": lane["coreType"],
                    "physicalCoreId": lane["physicalCoreId"],
                },
            }
        )
    return events


def event_hint(root_hash: int, call_op_magic: int, leaf_hash: int, task_id: str) -> str:
    return (
        f"rootHash:{root_hash}, callOpMagic:{call_op_magic}, "
        f"leafHash:{leaf_hash}, TaskId:{task_id}"
    )


def duration_event(
    *,
    name: str,
    lane: dict,
    ts: float,
    dur: float,
    task_id: str,
    seq_no: int,
    wrap_id: int,
    semantic_label: str,
    root_hash: int,
    call_op_magic: int,
    leaf_hash: int,
    segments: list[dict] | None = None,
    sync_events: list[dict] | None = None,
    diagnosis_tags: list[str] | None = None,
) -> dict:
    return {
        "name": name,
        "ph": "X",
        "pid": PID,
        "tid": lane["tid"],
        "ts": round(ts, 3),
        "dur": round(dur, 3),
        "cat": "event",
        "args": {
            "taskId": task_id,
            "seqNo": seq_no,
            "wrapId": wrap_id,
            "coreType": lane["coreType"],
            "physicalCoreId": lane["physicalCoreId"],
            "semantic_label": semantic_label,
            "event-hint": event_hint(root_hash, call_op_magic, leaf_hash, task_id),
            "execution-hint": f"{lane['laneId']} executes {semantic_label}",
            "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
            "ooperand-hint": "rope_q,rope_k,attention_partial",
            "segments": segments or [],
            "syncEvents": sync_events or [],
            "diagnosisTags": diagnosis_tags or [],
            "color": lane["coreType"],
        },
    }


def build_trace_events(lanes: list[dict]) -> tuple[list[dict], dict]:
    events = metadata_events(lanes)
    lane_by_id = {lane["laneId"]: lane for lane in lanes}
    target = {}
    seq = 0
    for cluster in range(CORE_PER_DIE):
        aic_lane = lane_by_id[lane_id(cluster, "AIC")]
        aiv0_lane = lane_by_id[lane_id(cluster, "AIV", 0)]
        aiv1_lane = lane_by_id[lane_id(cluster, "AIV", 1)]
        root_hash = 9_928_535_964_290_202_028 + cluster
        leaf_base = 1_231_527_610_565_308_428 + cluster * 10
        offset = cluster * 0.27
        aic_task = f"A5D0C{cluster:02d}C-T019"
        aiv0_task = f"A5D0C{cluster:02d}V0-T023"
        aiv1_task = f"A5D0C{cluster:02d}V1-T024"

        aic_dur = 70.0 + (cluster % 4) * 2.2
        if cluster == 7:
            aic_dur = 96.4
        events.append(
            duration_event(
                name=f"0-{cluster}-19-42-0(qk_matmul)",
                lane=aic_lane,
                ts=BASE_TS_US + offset,
                dur=aic_dur,
                task_id=aic_task,
                seq_no=seq,
                wrap_id=cluster,
                semantic_label="qk_matmul",
                root_hash=root_hash,
                call_op_magic=10010 + cluster,
                leaf_hash=leaf_base,
                segments=[
                    {"kind": "compute", "duration_us": round(aic_dur * 0.72, 3)},
                    {"kind": "memory_move", "duration_us": round(aic_dur * 0.18, 3)},
                    {"kind": "wait", "duration_us": round(aic_dur * 0.06, 3)},
                    {"kind": "unaccounted", "duration_us": round(aic_dur * 0.04, 3)},
                ],
                diagnosis_tags=["cube_main_path"],
            )
        )
        seq += 1

        if cluster == 7:
            aiv0_dur = 142.8
            segments = [
                {"kind": "compute", "duration_us": 38.4, "ratio": 0.269},
                {"kind": "memory_move", "duration_us": 56.1, "ratio": 0.393},
                {"kind": "wait", "duration_us": 36.5, "ratio": 0.256},
                {"kind": "unaccounted", "duration_us": 11.8, "ratio": 0.083},
            ]
            sync_events = [
                {
                    "time": round(BASE_TS_US + 18.9 + offset, 3),
                    "type": "CV_SYNC_WAIT",
                    "eventid": "sync-c07-aiv0-wait-aic",
                    "peerTaskId": aic_task,
                },
                {
                    "time": round(BASE_TS_US + 55.4 + offset, 3),
                    "type": "CV_SYNC_SET",
                    "eventid": "sync-c07-aic-set-aiv0",
                    "peerTaskId": aic_task,
                },
            ]
            tags = ["top_abnormal", "memory_movement", "ub_pressure", "wait_chain"]
        else:
            aiv0_dur = 48.0 + (cluster % 5) * 1.8
            segments = [
                {"kind": "compute", "duration_us": round(aiv0_dur * 0.62, 3)},
                {"kind": "memory_move", "duration_us": round(aiv0_dur * 0.24, 3)},
                {"kind": "wait", "duration_us": round(aiv0_dur * 0.09, 3)},
                {"kind": "unaccounted", "duration_us": round(aiv0_dur * 0.05, 3)},
            ]
            sync_events = []
            tags = ["vector_path"]

        aiv0_event = duration_event(
            name=f"0-{cluster}-23-42-0(interleave_rope)",
            lane=aiv0_lane,
            ts=BASE_TS_US + 9.0 + offset,
            dur=aiv0_dur,
            task_id=aiv0_task,
            seq_no=seq,
            wrap_id=cluster,
            semantic_label="interleave_rope_split_kv",
            root_hash=root_hash,
            call_op_magic=10020 + cluster,
            leaf_hash=leaf_base + 1,
            segments=segments,
            sync_events=sync_events,
            diagnosis_tags=tags,
        )
        events.append(aiv0_event)
        if cluster == 7:
            target = aiv0_event
        seq += 1

        aiv1_dur = 54.0 + (cluster % 3) * 2.5
        if cluster == 7:
            aiv1_dur = 63.6
        events.append(
            duration_event(
                name=f"0-{cluster}-24-42-0(softmax_acc)",
                lane=aiv1_lane,
                ts=BASE_TS_US + 13.5 + offset,
                dur=aiv1_dur,
                task_id=aiv1_task,
                seq_no=seq,
                wrap_id=cluster,
                semantic_label="softmax_acc",
                root_hash=root_hash,
                call_op_magic=10030 + cluster,
                leaf_hash=leaf_base + 2,
                segments=[
                    {"kind": "compute", "duration_us": round(aiv1_dur * 0.66, 3)},
                    {"kind": "memory_move", "duration_us": round(aiv1_dur * 0.21, 3)},
                    {"kind": "wait", "duration_us": round(aiv1_dur * 0.08, 3)},
                    {"kind": "unaccounted", "duration_us": round(aiv1_dur * 0.05, 3)},
                ],
                diagnosis_tags=["vector_path"],
            )
        )
        seq += 1
    return events, target


def pmu_row(event: dict) -> dict:
    args = event["args"]
    core_type = args["coreType"]
    core_id = args["physicalCoreId"]
    dur = event["dur"]
    is_target = args["taskId"] == "A5D0C07V0-T023"
    total_cycle = int(dur * 1180)
    if core_type == "AIC":
        cube = int(total_cycle * (0.48 if is_target else 0.42))
        vec = 0
        mte1 = int(total_cycle * 0.15)
        mte2 = int(total_cycle * (0.31 if is_target else 0.24))
        mte3 = 0
        fix = int(total_cycle * 0.18)
    else:
        cube = 0
        vec = int(total_cycle * (0.28 if is_target else 0.42))
        mte1 = 0
        mte2 = int(total_cycle * (0.36 if is_target else 0.12))
        mte3 = int(total_cycle * (0.34 if is_target else 0.22))
        fix = 0
    return {
        "thread id": str(19791 + core_id // 18),
        "task id": args["taskId"],
        "stream id": "0",
        "core id": str(core_id),
        "seqNo": str(args["seqNo"]),
        "sub task id": str(65536 + args["seqNo"]),
        "total cycle": str(total_cycle),
        "pmu_idc_aic_vec_busy_o": str(vec),
        "cube_instr_busy": str(cube),
        "scalar_instr_busy": str(int(total_cycle * 0.23)),
        "mte1_instr_busy": str(mte1),
        "mte2_instr_busy": str(mte2),
        "mte3_instr_busy": str(mte3),
        "icache_req": str(1800 + core_id * 7),
        "icache_miss": str(70 + core_id % 23),
        "pmu_fix_instr_busy": str(fix),
    }


def build_dyn_topo_rows(events: list[dict]) -> list[dict]:
    rows = []
    for event in events:
        if event.get("ph") != "X":
            continue
        args = event["args"]
        if args["wrapId"] not in {6, 7, 8}:
            continue
        rows.append(
            {
                "seqNo": args["seqNo"],
                "taskId": args["taskId"],
                "rootIndex": args["wrapId"],
                "rootHash": 9_928_535_964_290_202_028 + args["wrapId"],
                "opmagic": 10020 + args["wrapId"],
                "leafIndex": args["seqNo"],
                "leafHash": 1_231_527_610_565_308_428 + args["wrapId"] * 10 + 1,
                "coreType": args["coreType"],
                "psgId": f"mix-wrap-{args['wrapId']}",
                "successors": [args["seqNo"] + 1] if args["wrapId"] != 8 else [],
            }
        )
    return rows


def build_payload() -> dict:
    lanes = build_lanes()
    trace_events, target = build_trace_events(lanes)
    x_events = [event for event in trace_events if event.get("ph") == "X"]
    pmu_rows = [pmu_row(event) for event in x_events]
    dyn_topo_rows = build_dyn_topo_rows(x_events)
    payload = {
        "version": "fusion-diagnosis-demo-v0.1",
        "generatedBy": "demo-data-script.py",
        "dataLevel": "L2",
        "dataRole": "schema-generated",
        "shareSafe": True,
        "scenario": {
            "issue": "#2141",
            "operator": "interleave_rope_attention_fuse",
            "userRole": "Fusion Performance Engineer",
            "storyFocus": "slow task diagnosis for UB pressure, extra GM/UB movement, and AIC/AIV wait chain",
        },
        "sourceBasis": [
            {
                "source": "pto-isa/docs/reference/pto-cvid-cluster-id-mapping.md",
                "claim": "A5 single die has 18 core clusters, AIV_RATIO=2, AIC_AIV_PER_DIE=54.",
                "usedFor": "hardware lane count and physical core id mapping",
            },
            {
                "source": "02-knowledge/00-shared/pypto-data/schemas/swimlane-trace-events.md",
                "claim": "traceEvents commonly use name/ph/pid/tid/ts/dur/cat/args and event-hint literals.",
                "usedFor": "traceEvents shape",
            },
            {
                "source": "02-knowledge/00-shared/pypto-data/schemas/pmu-msprof.md",
                "claim": "PMU CSV headers include thread id, task id, core id, seqNo, total cycle and busy counters.",
                "usedFor": "pmuRows shape",
            },
            {
                "source": "02-knowledge/00-shared/pypto-data/schemas/mix-sync-events.md",
                "claim": "Mix sync events use wrapId and syncEvents with CV_SYNC_SET / CV_SYNC_WAIT.",
                "usedFor": "wait chain fields",
            },
            {
                "source": "02-knowledge/00-shared/pypto-data/datasets/a5-pmu-g2.md",
                "claim": "A5 PMU G2 dataset contains merged_swimlane.json, msprof trace, and tilefwk_prof_pmu.csv.",
                "usedFor": "demo realism and PMU / swimlane evidence style",
            },
            {
                "source": "02-knowledge/00-shared/ascend-a5-950-hardware/overview.md",
                "claim": "A5 / Ascend 950 UX explanations should separate verified PyPTO fields from inferred hardware paths.",
                "usedFor": "claim boundary and hardware explanation wording",
            },
        ],
        "hardware": {
            "target": "A5 / Ascend 950",
            "scope": "single die demo",
            "CORE_PER_DIE": CORE_PER_DIE,
            "AIV_RATIO": AIV_RATIO,
            "AIC_AIV_PER_DIE": AIC_AIV_PER_DIE,
            "laneCount": len(lanes),
            "lanePolicy": "show all 54 hardware execution lanes; UI may fold by cluster but data keeps every lane",
        },
        "lanes": lanes,
        "diagnosisSummary": {
            "targetTaskId": "A5D0C07V0-T023",
            "targetLaneId": "die0.cluster07.AIV0",
            "wrapId": 7,
            "semanticLabel": "interleave_rope_split_kv",
            "duration_us": 142.8,
            "bottleneckType": "memory_movement",
            "secondaryBottleneck": "wait_chain",
            "evidenceLevel": "L2-schema-generated/high-within-demo",
            "explanation": "AIV0 task has high memory_move ratio, low demo UB headroom, and CV_SYNC_WAIT from peer AIC.",
            "targetTraceEvent": target,
        },
        "traceEvents": trace_events,
        "pmuRows": pmu_rows,
        "dynTopoRows": dyn_topo_rows,
        "memoryPressure": {
            "taskId": "A5D0C07V0-T023",
            "ubBudgetBytes": 262144,
            "ubBudgetMeaning": "L2 demo diagnosis threshold; not asserted as hardware UB capacity",
            "peakLiveBytes": 248320,
            "ubHeadroomBytes": 13824,
            "extraGmUbBytes": 393216,
            "topContributors": [
                {"name": "rope_cache_split.k_cache_tile", "bytes": 81920, "lifetime": [1_000_031.1, 1_000_112.4]},
                {"name": "rope_cache_split.v_cache_tile", "bytes": 73728, "lifetime": [1_000_033.6, 1_000_118.9]},
                {"name": "interleave_rope.tmp_sin_cos", "bytes": 49152, "lifetime": [1_000_025.4, 1_000_099.8]},
                {"name": "attention_score.partial_acc", "bytes": 28672, "lifetime": [1_000_064.0, 1_000_126.3]},
            ],
            "copyEdges": [
                {
                    "edge": "GM->UB",
                    "bytes": 262144,
                    "reason": "reload k/v tile after live range overlap",
                    "avoidability": "likely",
                },
                {
                    "edge": "UB->GM",
                    "bytes": 131072,
                    "reason": "spill-like temporary output before softmax_acc",
                    "avoidability": "partial",
                },
            ],
        },
        "waitChain": {
            "waitingTaskId": "A5D0C07V0-T023",
            "signalTaskId": "A5D0C07C-T019",
            "waitingLaneId": "die0.cluster07.AIV0",
            "signalLaneId": "die0.cluster07.AIC",
            "syncType": "CV_SYNC_WAIT",
            "waitDurationUs": 36.5,
            "note": "Sync is a control dependency; AIC/AIV data exchange should still be explained through GM/L2 or trace evidence.",
        },
        "recommendations": [
            {
                "id": "R1",
                "action": "reduce K/V tile size for interleave_rope_split_kv",
                "expectedMetricMove": ["extraGmUbBytes down", "ubHeadroomBytes up", "task_time_us down"],
            },
            {
                "id": "R2",
                "action": "review vec_nbuffer_setting to avoid over-merging AIV live ranges",
                "expectedMetricMove": ["memory_move ratio down", "wait ratio down"],
            },
        ],
        "beforeAfter": {
            "before": {
                "taskTimeUs": 142.8,
                "extraGmUbBytes": 393216,
                "ubHeadroomBytes": 13824,
                "waitRatio": 0.256,
            },
            "after": {
                "taskTimeUs": 101.6,
                "extraGmUbBytes": 163840,
                "ubHeadroomBytes": 59392,
                "waitRatio": 0.142,
            },
            "validationStatement": "The synthetic after-run reduces memory movement and improves demo UB headroom, matching the recommended action path.",
        },
    }
    return payload


def main() -> None:
    payload = build_payload()
    OUT_FILE.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {OUT_FILE}")
    print(f"laneCount={payload['hardware']['laneCount']}")
    print(f"traceEvents={len(payload['traceEvents'])}")
    print(f"pmuRows={len(payload['pmuRows'])}")


if __name__ == "__main__":
    main()
