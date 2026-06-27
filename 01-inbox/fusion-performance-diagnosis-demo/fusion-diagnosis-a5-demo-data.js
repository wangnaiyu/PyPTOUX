window.FUSION_DIAGNOSIS_DEMO_DATA = {
  "version": "fusion-diagnosis-demo-v0.1",
  "generatedBy": "demo-data-script.py",
  "dataLevel": "L2",
  "dataRole": "schema-generated",
  "shareSafe": true,
  "scenario": {
    "issue": "#2141",
    "operator": "interleave_rope_attention_fuse",
    "userRole": "Fusion Performance Engineer",
    "storyFocus": "slow task diagnosis for UB pressure, extra GM/UB movement, and AIC/AIV wait chain"
  },
  "sourceBasis": [
    {
      "source": "pto-isa/docs/reference/pto-cvid-cluster-id-mapping.md",
      "claim": "A5 single die has 18 core clusters, AIV_RATIO=2, AIC_AIV_PER_DIE=54.",
      "usedFor": "hardware lane count and physical core id mapping"
    },
    {
      "source": "02-knowledge/00-shared/pypto-data/schemas/swimlane-trace-events.md",
      "claim": "traceEvents commonly use name/ph/pid/tid/ts/dur/cat/args and event-hint literals.",
      "usedFor": "traceEvents shape"
    },
    {
      "source": "02-knowledge/00-shared/pypto-data/schemas/pmu-msprof.md",
      "claim": "PMU CSV headers include thread id, task id, core id, seqNo, total cycle and busy counters.",
      "usedFor": "pmuRows shape"
    },
    {
      "source": "02-knowledge/00-shared/pypto-data/schemas/mix-sync-events.md",
      "claim": "Mix sync events use wrapId and syncEvents with CV_SYNC_SET / CV_SYNC_WAIT.",
      "usedFor": "wait chain fields"
    },
    {
      "source": "02-knowledge/00-shared/pypto-data/datasets/a5-pmu-g2.md",
      "claim": "A5 PMU G2 dataset contains merged_swimlane.json, msprof trace, and tilefwk_prof_pmu.csv.",
      "usedFor": "demo realism and PMU / swimlane evidence style"
    },
    {
      "source": "02-knowledge/00-shared/ascend-a5-950-hardware/overview.md",
      "claim": "A5 / Ascend 950 UX explanations should separate verified PyPTO fields from inferred hardware paths.",
      "usedFor": "claim boundary and hardware explanation wording"
    }
  ],
  "hardware": {
    "target": "A5 / Ascend 950",
    "scope": "single die demo",
    "CORE_PER_DIE": 18,
    "AIV_RATIO": 2,
    "AIC_AIV_PER_DIE": 54,
    "laneCount": 54,
    "lanePolicy": "show all 54 hardware execution lanes; UI may fold by cluster but data keeps every lane"
  },
  "lanes": [
    {
      "laneId": "die0.cluster00.AIC",
      "die": 0,
      "cluster": 0,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 0,
      "tid": 1000
    },
    {
      "laneId": "die0.cluster00.AIV0",
      "die": 0,
      "cluster": 0,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 18,
      "tid": 1036
    },
    {
      "laneId": "die0.cluster00.AIV1",
      "die": 0,
      "cluster": 0,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 19,
      "tid": 1038
    },
    {
      "laneId": "die0.cluster01.AIC",
      "die": 0,
      "cluster": 1,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 1,
      "tid": 1002
    },
    {
      "laneId": "die0.cluster01.AIV0",
      "die": 0,
      "cluster": 1,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 20,
      "tid": 1040
    },
    {
      "laneId": "die0.cluster01.AIV1",
      "die": 0,
      "cluster": 1,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 21,
      "tid": 1042
    },
    {
      "laneId": "die0.cluster02.AIC",
      "die": 0,
      "cluster": 2,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 2,
      "tid": 1004
    },
    {
      "laneId": "die0.cluster02.AIV0",
      "die": 0,
      "cluster": 2,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 22,
      "tid": 1044
    },
    {
      "laneId": "die0.cluster02.AIV1",
      "die": 0,
      "cluster": 2,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 23,
      "tid": 1046
    },
    {
      "laneId": "die0.cluster03.AIC",
      "die": 0,
      "cluster": 3,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 3,
      "tid": 1006
    },
    {
      "laneId": "die0.cluster03.AIV0",
      "die": 0,
      "cluster": 3,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 24,
      "tid": 1048
    },
    {
      "laneId": "die0.cluster03.AIV1",
      "die": 0,
      "cluster": 3,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 25,
      "tid": 1050
    },
    {
      "laneId": "die0.cluster04.AIC",
      "die": 0,
      "cluster": 4,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 4,
      "tid": 1008
    },
    {
      "laneId": "die0.cluster04.AIV0",
      "die": 0,
      "cluster": 4,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 26,
      "tid": 1052
    },
    {
      "laneId": "die0.cluster04.AIV1",
      "die": 0,
      "cluster": 4,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 27,
      "tid": 1054
    },
    {
      "laneId": "die0.cluster05.AIC",
      "die": 0,
      "cluster": 5,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 5,
      "tid": 1010
    },
    {
      "laneId": "die0.cluster05.AIV0",
      "die": 0,
      "cluster": 5,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 28,
      "tid": 1056
    },
    {
      "laneId": "die0.cluster05.AIV1",
      "die": 0,
      "cluster": 5,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 29,
      "tid": 1058
    },
    {
      "laneId": "die0.cluster06.AIC",
      "die": 0,
      "cluster": 6,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 6,
      "tid": 1012
    },
    {
      "laneId": "die0.cluster06.AIV0",
      "die": 0,
      "cluster": 6,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 30,
      "tid": 1060
    },
    {
      "laneId": "die0.cluster06.AIV1",
      "die": 0,
      "cluster": 6,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 31,
      "tid": 1062
    },
    {
      "laneId": "die0.cluster07.AIC",
      "die": 0,
      "cluster": 7,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 7,
      "tid": 1014
    },
    {
      "laneId": "die0.cluster07.AIV0",
      "die": 0,
      "cluster": 7,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 32,
      "tid": 1064
    },
    {
      "laneId": "die0.cluster07.AIV1",
      "die": 0,
      "cluster": 7,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 33,
      "tid": 1066
    },
    {
      "laneId": "die0.cluster08.AIC",
      "die": 0,
      "cluster": 8,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 8,
      "tid": 1016
    },
    {
      "laneId": "die0.cluster08.AIV0",
      "die": 0,
      "cluster": 8,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 34,
      "tid": 1068
    },
    {
      "laneId": "die0.cluster08.AIV1",
      "die": 0,
      "cluster": 8,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 35,
      "tid": 1070
    },
    {
      "laneId": "die0.cluster09.AIC",
      "die": 0,
      "cluster": 9,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 9,
      "tid": 1018
    },
    {
      "laneId": "die0.cluster09.AIV0",
      "die": 0,
      "cluster": 9,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 36,
      "tid": 1072
    },
    {
      "laneId": "die0.cluster09.AIV1",
      "die": 0,
      "cluster": 9,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 37,
      "tid": 1074
    },
    {
      "laneId": "die0.cluster10.AIC",
      "die": 0,
      "cluster": 10,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 10,
      "tid": 1020
    },
    {
      "laneId": "die0.cluster10.AIV0",
      "die": 0,
      "cluster": 10,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 38,
      "tid": 1076
    },
    {
      "laneId": "die0.cluster10.AIV1",
      "die": 0,
      "cluster": 10,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 39,
      "tid": 1078
    },
    {
      "laneId": "die0.cluster11.AIC",
      "die": 0,
      "cluster": 11,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 11,
      "tid": 1022
    },
    {
      "laneId": "die0.cluster11.AIV0",
      "die": 0,
      "cluster": 11,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 40,
      "tid": 1080
    },
    {
      "laneId": "die0.cluster11.AIV1",
      "die": 0,
      "cluster": 11,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 41,
      "tid": 1082
    },
    {
      "laneId": "die0.cluster12.AIC",
      "die": 0,
      "cluster": 12,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 12,
      "tid": 1024
    },
    {
      "laneId": "die0.cluster12.AIV0",
      "die": 0,
      "cluster": 12,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 42,
      "tid": 1084
    },
    {
      "laneId": "die0.cluster12.AIV1",
      "die": 0,
      "cluster": 12,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 43,
      "tid": 1086
    },
    {
      "laneId": "die0.cluster13.AIC",
      "die": 0,
      "cluster": 13,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 13,
      "tid": 1026
    },
    {
      "laneId": "die0.cluster13.AIV0",
      "die": 0,
      "cluster": 13,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 44,
      "tid": 1088
    },
    {
      "laneId": "die0.cluster13.AIV1",
      "die": 0,
      "cluster": 13,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 45,
      "tid": 1090
    },
    {
      "laneId": "die0.cluster14.AIC",
      "die": 0,
      "cluster": 14,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 14,
      "tid": 1028
    },
    {
      "laneId": "die0.cluster14.AIV0",
      "die": 0,
      "cluster": 14,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 46,
      "tid": 1092
    },
    {
      "laneId": "die0.cluster14.AIV1",
      "die": 0,
      "cluster": 14,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 47,
      "tid": 1094
    },
    {
      "laneId": "die0.cluster15.AIC",
      "die": 0,
      "cluster": 15,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 15,
      "tid": 1030
    },
    {
      "laneId": "die0.cluster15.AIV0",
      "die": 0,
      "cluster": 15,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 48,
      "tid": 1096
    },
    {
      "laneId": "die0.cluster15.AIV1",
      "die": 0,
      "cluster": 15,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 49,
      "tid": 1098
    },
    {
      "laneId": "die0.cluster16.AIC",
      "die": 0,
      "cluster": 16,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 16,
      "tid": 1032
    },
    {
      "laneId": "die0.cluster16.AIV0",
      "die": 0,
      "cluster": 16,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 50,
      "tid": 1100
    },
    {
      "laneId": "die0.cluster16.AIV1",
      "die": 0,
      "cluster": 16,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 51,
      "tid": 1102
    },
    {
      "laneId": "die0.cluster17.AIC",
      "die": 0,
      "cluster": 17,
      "coreType": "AIC",
      "role": "Cube Core",
      "physicalCoreId": 17,
      "tid": 1034
    },
    {
      "laneId": "die0.cluster17.AIV0",
      "die": 0,
      "cluster": 17,
      "subblock": 0,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 52,
      "tid": 1104
    },
    {
      "laneId": "die0.cluster17.AIV1",
      "die": 0,
      "cluster": 17,
      "subblock": 1,
      "coreType": "AIV",
      "role": "Vector Core",
      "physicalCoreId": 53,
      "tid": 1106
    }
  ],
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
    "targetTraceEvent": {
      "name": "0-7-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1064,
      "ts": 1000010.89,
      "dur": 142.8,
      "cat": "event",
      "args": {
        "taskId": "A5D0C07V0-T023",
        "seqNo": 22,
        "wrapId": 7,
        "coreType": "AIV",
        "physicalCoreId": 32,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202035, callOpMagic:10027, leafHash:1231527610565308499, TaskId:A5D0C07V0-T023",
        "execution-hint": "die0.cluster07.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 38.4,
            "ratio": 0.269
          },
          {
            "kind": "memory_move",
            "duration_us": 56.1,
            "ratio": 0.393
          },
          {
            "kind": "wait",
            "duration_us": 36.5,
            "ratio": 0.256
          },
          {
            "kind": "unaccounted",
            "duration_us": 11.8,
            "ratio": 0.083
          }
        ],
        "syncEvents": [
          {
            "time": 1000020.79,
            "type": "CV_SYNC_WAIT",
            "eventid": "sync-c07-aiv0-wait-aic",
            "peerTaskId": "A5D0C07C-T019"
          },
          {
            "time": 1000057.29,
            "type": "CV_SYNC_SET",
            "eventid": "sync-c07-aic-set-aiv0",
            "peerTaskId": "A5D0C07C-T019"
          }
        ],
        "diagnosisTags": [
          "top_abnormal",
          "memory_movement",
          "ub_pressure",
          "wait_chain"
        ],
        "color": "AIV"
      }
    }
  },
  "traceEvents": [
    {
      "name": "process_name",
      "ph": "M",
      "pid": 1,
      "tid": 0,
      "args": {
        "name": "A5 / Ascend 950 single-die Fusion Diagnosis demo"
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1000,
      "args": {
        "name": "die0.cluster00.AIC",
        "coreType": "AIC",
        "physicalCoreId": 0
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1036,
      "args": {
        "name": "die0.cluster00.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 18
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1038,
      "args": {
        "name": "die0.cluster00.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 19
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1002,
      "args": {
        "name": "die0.cluster01.AIC",
        "coreType": "AIC",
        "physicalCoreId": 1
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1040,
      "args": {
        "name": "die0.cluster01.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 20
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1042,
      "args": {
        "name": "die0.cluster01.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 21
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1004,
      "args": {
        "name": "die0.cluster02.AIC",
        "coreType": "AIC",
        "physicalCoreId": 2
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1044,
      "args": {
        "name": "die0.cluster02.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 22
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1046,
      "args": {
        "name": "die0.cluster02.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 23
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1006,
      "args": {
        "name": "die0.cluster03.AIC",
        "coreType": "AIC",
        "physicalCoreId": 3
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1048,
      "args": {
        "name": "die0.cluster03.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 24
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1050,
      "args": {
        "name": "die0.cluster03.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 25
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1008,
      "args": {
        "name": "die0.cluster04.AIC",
        "coreType": "AIC",
        "physicalCoreId": 4
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1052,
      "args": {
        "name": "die0.cluster04.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 26
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1054,
      "args": {
        "name": "die0.cluster04.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 27
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1010,
      "args": {
        "name": "die0.cluster05.AIC",
        "coreType": "AIC",
        "physicalCoreId": 5
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1056,
      "args": {
        "name": "die0.cluster05.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 28
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1058,
      "args": {
        "name": "die0.cluster05.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 29
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1012,
      "args": {
        "name": "die0.cluster06.AIC",
        "coreType": "AIC",
        "physicalCoreId": 6
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1060,
      "args": {
        "name": "die0.cluster06.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 30
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1062,
      "args": {
        "name": "die0.cluster06.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 31
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1014,
      "args": {
        "name": "die0.cluster07.AIC",
        "coreType": "AIC",
        "physicalCoreId": 7
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1064,
      "args": {
        "name": "die0.cluster07.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 32
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1066,
      "args": {
        "name": "die0.cluster07.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 33
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1016,
      "args": {
        "name": "die0.cluster08.AIC",
        "coreType": "AIC",
        "physicalCoreId": 8
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1068,
      "args": {
        "name": "die0.cluster08.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 34
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1070,
      "args": {
        "name": "die0.cluster08.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 35
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1018,
      "args": {
        "name": "die0.cluster09.AIC",
        "coreType": "AIC",
        "physicalCoreId": 9
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1072,
      "args": {
        "name": "die0.cluster09.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 36
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1074,
      "args": {
        "name": "die0.cluster09.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 37
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1020,
      "args": {
        "name": "die0.cluster10.AIC",
        "coreType": "AIC",
        "physicalCoreId": 10
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1076,
      "args": {
        "name": "die0.cluster10.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 38
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1078,
      "args": {
        "name": "die0.cluster10.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 39
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1022,
      "args": {
        "name": "die0.cluster11.AIC",
        "coreType": "AIC",
        "physicalCoreId": 11
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1080,
      "args": {
        "name": "die0.cluster11.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 40
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1082,
      "args": {
        "name": "die0.cluster11.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 41
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1024,
      "args": {
        "name": "die0.cluster12.AIC",
        "coreType": "AIC",
        "physicalCoreId": 12
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1084,
      "args": {
        "name": "die0.cluster12.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 42
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1086,
      "args": {
        "name": "die0.cluster12.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 43
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1026,
      "args": {
        "name": "die0.cluster13.AIC",
        "coreType": "AIC",
        "physicalCoreId": 13
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1088,
      "args": {
        "name": "die0.cluster13.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 44
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1090,
      "args": {
        "name": "die0.cluster13.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 45
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1028,
      "args": {
        "name": "die0.cluster14.AIC",
        "coreType": "AIC",
        "physicalCoreId": 14
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1092,
      "args": {
        "name": "die0.cluster14.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 46
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1094,
      "args": {
        "name": "die0.cluster14.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 47
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1030,
      "args": {
        "name": "die0.cluster15.AIC",
        "coreType": "AIC",
        "physicalCoreId": 15
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1096,
      "args": {
        "name": "die0.cluster15.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 48
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1098,
      "args": {
        "name": "die0.cluster15.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 49
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1032,
      "args": {
        "name": "die0.cluster16.AIC",
        "coreType": "AIC",
        "physicalCoreId": 16
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1100,
      "args": {
        "name": "die0.cluster16.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 50
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1102,
      "args": {
        "name": "die0.cluster16.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 51
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1034,
      "args": {
        "name": "die0.cluster17.AIC",
        "coreType": "AIC",
        "physicalCoreId": 17
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1104,
      "args": {
        "name": "die0.cluster17.AIV0",
        "coreType": "AIV",
        "physicalCoreId": 52
      }
    },
    {
      "name": "thread_name",
      "ph": "M",
      "pid": 1,
      "tid": 1106,
      "args": {
        "name": "die0.cluster17.AIV1",
        "coreType": "AIV",
        "physicalCoreId": 53
      }
    },
    {
      "name": "0-0-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1000,
      "ts": 1000000.0,
      "dur": 70.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C00C-T019",
        "seqNo": 0,
        "wrapId": 0,
        "coreType": "AIC",
        "physicalCoreId": 0,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202028, callOpMagic:10010, leafHash:1231527610565308428, TaskId:A5D0C00C-T019",
        "execution-hint": "die0.cluster00.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 50.4
          },
          {
            "kind": "memory_move",
            "duration_us": 12.6
          },
          {
            "kind": "wait",
            "duration_us": 4.2
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.8
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-0-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1036,
      "ts": 1000009.0,
      "dur": 48.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C00V0-T023",
        "seqNo": 1,
        "wrapId": 0,
        "coreType": "AIV",
        "physicalCoreId": 18,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202028, callOpMagic:10020, leafHash:1231527610565308429, TaskId:A5D0C00V0-T023",
        "execution-hint": "die0.cluster00.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 29.76
          },
          {
            "kind": "memory_move",
            "duration_us": 11.52
          },
          {
            "kind": "wait",
            "duration_us": 4.32
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.4
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-0-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1038,
      "ts": 1000013.5,
      "dur": 54.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C00V1-T024",
        "seqNo": 2,
        "wrapId": 0,
        "coreType": "AIV",
        "physicalCoreId": 19,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202028, callOpMagic:10030, leafHash:1231527610565308430, TaskId:A5D0C00V1-T024",
        "execution-hint": "die0.cluster00.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 35.64
          },
          {
            "kind": "memory_move",
            "duration_us": 11.34
          },
          {
            "kind": "wait",
            "duration_us": 4.32
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.7
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-1-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1002,
      "ts": 1000000.27,
      "dur": 72.2,
      "cat": "event",
      "args": {
        "taskId": "A5D0C01C-T019",
        "seqNo": 3,
        "wrapId": 1,
        "coreType": "AIC",
        "physicalCoreId": 1,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202029, callOpMagic:10011, leafHash:1231527610565308438, TaskId:A5D0C01C-T019",
        "execution-hint": "die0.cluster01.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 51.984
          },
          {
            "kind": "memory_move",
            "duration_us": 12.996
          },
          {
            "kind": "wait",
            "duration_us": 4.332
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.888
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-1-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1040,
      "ts": 1000009.27,
      "dur": 49.8,
      "cat": "event",
      "args": {
        "taskId": "A5D0C01V0-T023",
        "seqNo": 4,
        "wrapId": 1,
        "coreType": "AIV",
        "physicalCoreId": 20,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202029, callOpMagic:10021, leafHash:1231527610565308439, TaskId:A5D0C01V0-T023",
        "execution-hint": "die0.cluster01.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 30.876
          },
          {
            "kind": "memory_move",
            "duration_us": 11.952
          },
          {
            "kind": "wait",
            "duration_us": 4.482
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.49
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-1-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1042,
      "ts": 1000013.77,
      "dur": 56.5,
      "cat": "event",
      "args": {
        "taskId": "A5D0C01V1-T024",
        "seqNo": 5,
        "wrapId": 1,
        "coreType": "AIV",
        "physicalCoreId": 21,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202029, callOpMagic:10031, leafHash:1231527610565308440, TaskId:A5D0C01V1-T024",
        "execution-hint": "die0.cluster01.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 37.29
          },
          {
            "kind": "memory_move",
            "duration_us": 11.865
          },
          {
            "kind": "wait",
            "duration_us": 4.52
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.825
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-2-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1004,
      "ts": 1000000.54,
      "dur": 74.4,
      "cat": "event",
      "args": {
        "taskId": "A5D0C02C-T019",
        "seqNo": 6,
        "wrapId": 2,
        "coreType": "AIC",
        "physicalCoreId": 2,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202030, callOpMagic:10012, leafHash:1231527610565308448, TaskId:A5D0C02C-T019",
        "execution-hint": "die0.cluster02.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 53.568
          },
          {
            "kind": "memory_move",
            "duration_us": 13.392
          },
          {
            "kind": "wait",
            "duration_us": 4.464
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.976
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-2-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1044,
      "ts": 1000009.54,
      "dur": 51.6,
      "cat": "event",
      "args": {
        "taskId": "A5D0C02V0-T023",
        "seqNo": 7,
        "wrapId": 2,
        "coreType": "AIV",
        "physicalCoreId": 22,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202030, callOpMagic:10022, leafHash:1231527610565308449, TaskId:A5D0C02V0-T023",
        "execution-hint": "die0.cluster02.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 31.992
          },
          {
            "kind": "memory_move",
            "duration_us": 12.384
          },
          {
            "kind": "wait",
            "duration_us": 4.644
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.58
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-2-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1046,
      "ts": 1000014.04,
      "dur": 59.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C02V1-T024",
        "seqNo": 8,
        "wrapId": 2,
        "coreType": "AIV",
        "physicalCoreId": 23,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202030, callOpMagic:10032, leafHash:1231527610565308450, TaskId:A5D0C02V1-T024",
        "execution-hint": "die0.cluster02.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 38.94
          },
          {
            "kind": "memory_move",
            "duration_us": 12.39
          },
          {
            "kind": "wait",
            "duration_us": 4.72
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.95
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-3-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1006,
      "ts": 1000000.81,
      "dur": 76.6,
      "cat": "event",
      "args": {
        "taskId": "A5D0C03C-T019",
        "seqNo": 9,
        "wrapId": 3,
        "coreType": "AIC",
        "physicalCoreId": 3,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202031, callOpMagic:10013, leafHash:1231527610565308458, TaskId:A5D0C03C-T019",
        "execution-hint": "die0.cluster03.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 55.152
          },
          {
            "kind": "memory_move",
            "duration_us": 13.788
          },
          {
            "kind": "wait",
            "duration_us": 4.596
          },
          {
            "kind": "unaccounted",
            "duration_us": 3.064
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-3-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1048,
      "ts": 1000009.81,
      "dur": 53.4,
      "cat": "event",
      "args": {
        "taskId": "A5D0C03V0-T023",
        "seqNo": 10,
        "wrapId": 3,
        "coreType": "AIV",
        "physicalCoreId": 24,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202031, callOpMagic:10023, leafHash:1231527610565308459, TaskId:A5D0C03V0-T023",
        "execution-hint": "die0.cluster03.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 33.108
          },
          {
            "kind": "memory_move",
            "duration_us": 12.816
          },
          {
            "kind": "wait",
            "duration_us": 4.806
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.67
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-3-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1050,
      "ts": 1000014.31,
      "dur": 54.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C03V1-T024",
        "seqNo": 11,
        "wrapId": 3,
        "coreType": "AIV",
        "physicalCoreId": 25,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202031, callOpMagic:10033, leafHash:1231527610565308460, TaskId:A5D0C03V1-T024",
        "execution-hint": "die0.cluster03.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 35.64
          },
          {
            "kind": "memory_move",
            "duration_us": 11.34
          },
          {
            "kind": "wait",
            "duration_us": 4.32
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.7
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-4-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1008,
      "ts": 1000001.08,
      "dur": 70.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C04C-T019",
        "seqNo": 12,
        "wrapId": 4,
        "coreType": "AIC",
        "physicalCoreId": 4,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202032, callOpMagic:10014, leafHash:1231527610565308468, TaskId:A5D0C04C-T019",
        "execution-hint": "die0.cluster04.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 50.4
          },
          {
            "kind": "memory_move",
            "duration_us": 12.6
          },
          {
            "kind": "wait",
            "duration_us": 4.2
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.8
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-4-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1052,
      "ts": 1000010.08,
      "dur": 55.2,
      "cat": "event",
      "args": {
        "taskId": "A5D0C04V0-T023",
        "seqNo": 13,
        "wrapId": 4,
        "coreType": "AIV",
        "physicalCoreId": 26,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202032, callOpMagic:10024, leafHash:1231527610565308469, TaskId:A5D0C04V0-T023",
        "execution-hint": "die0.cluster04.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 34.224
          },
          {
            "kind": "memory_move",
            "duration_us": 13.248
          },
          {
            "kind": "wait",
            "duration_us": 4.968
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.76
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-4-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1054,
      "ts": 1000014.58,
      "dur": 56.5,
      "cat": "event",
      "args": {
        "taskId": "A5D0C04V1-T024",
        "seqNo": 14,
        "wrapId": 4,
        "coreType": "AIV",
        "physicalCoreId": 27,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202032, callOpMagic:10034, leafHash:1231527610565308470, TaskId:A5D0C04V1-T024",
        "execution-hint": "die0.cluster04.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 37.29
          },
          {
            "kind": "memory_move",
            "duration_us": 11.865
          },
          {
            "kind": "wait",
            "duration_us": 4.52
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.825
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-5-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1010,
      "ts": 1000001.35,
      "dur": 72.2,
      "cat": "event",
      "args": {
        "taskId": "A5D0C05C-T019",
        "seqNo": 15,
        "wrapId": 5,
        "coreType": "AIC",
        "physicalCoreId": 5,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202033, callOpMagic:10015, leafHash:1231527610565308478, TaskId:A5D0C05C-T019",
        "execution-hint": "die0.cluster05.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 51.984
          },
          {
            "kind": "memory_move",
            "duration_us": 12.996
          },
          {
            "kind": "wait",
            "duration_us": 4.332
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.888
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-5-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1056,
      "ts": 1000010.35,
      "dur": 48.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C05V0-T023",
        "seqNo": 16,
        "wrapId": 5,
        "coreType": "AIV",
        "physicalCoreId": 28,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202033, callOpMagic:10025, leafHash:1231527610565308479, TaskId:A5D0C05V0-T023",
        "execution-hint": "die0.cluster05.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 29.76
          },
          {
            "kind": "memory_move",
            "duration_us": 11.52
          },
          {
            "kind": "wait",
            "duration_us": 4.32
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.4
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-5-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1058,
      "ts": 1000014.85,
      "dur": 59.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C05V1-T024",
        "seqNo": 17,
        "wrapId": 5,
        "coreType": "AIV",
        "physicalCoreId": 29,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202033, callOpMagic:10035, leafHash:1231527610565308480, TaskId:A5D0C05V1-T024",
        "execution-hint": "die0.cluster05.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 38.94
          },
          {
            "kind": "memory_move",
            "duration_us": 12.39
          },
          {
            "kind": "wait",
            "duration_us": 4.72
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.95
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-6-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1012,
      "ts": 1000001.62,
      "dur": 74.4,
      "cat": "event",
      "args": {
        "taskId": "A5D0C06C-T019",
        "seqNo": 18,
        "wrapId": 6,
        "coreType": "AIC",
        "physicalCoreId": 6,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202034, callOpMagic:10016, leafHash:1231527610565308488, TaskId:A5D0C06C-T019",
        "execution-hint": "die0.cluster06.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 53.568
          },
          {
            "kind": "memory_move",
            "duration_us": 13.392
          },
          {
            "kind": "wait",
            "duration_us": 4.464
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.976
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-6-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1060,
      "ts": 1000010.62,
      "dur": 49.8,
      "cat": "event",
      "args": {
        "taskId": "A5D0C06V0-T023",
        "seqNo": 19,
        "wrapId": 6,
        "coreType": "AIV",
        "physicalCoreId": 30,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202034, callOpMagic:10026, leafHash:1231527610565308489, TaskId:A5D0C06V0-T023",
        "execution-hint": "die0.cluster06.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 30.876
          },
          {
            "kind": "memory_move",
            "duration_us": 11.952
          },
          {
            "kind": "wait",
            "duration_us": 4.482
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.49
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-6-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1062,
      "ts": 1000015.12,
      "dur": 54.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C06V1-T024",
        "seqNo": 20,
        "wrapId": 6,
        "coreType": "AIV",
        "physicalCoreId": 31,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202034, callOpMagic:10036, leafHash:1231527610565308490, TaskId:A5D0C06V1-T024",
        "execution-hint": "die0.cluster06.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 35.64
          },
          {
            "kind": "memory_move",
            "duration_us": 11.34
          },
          {
            "kind": "wait",
            "duration_us": 4.32
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.7
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-7-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1014,
      "ts": 1000001.89,
      "dur": 96.4,
      "cat": "event",
      "args": {
        "taskId": "A5D0C07C-T019",
        "seqNo": 21,
        "wrapId": 7,
        "coreType": "AIC",
        "physicalCoreId": 7,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202035, callOpMagic:10017, leafHash:1231527610565308498, TaskId:A5D0C07C-T019",
        "execution-hint": "die0.cluster07.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 69.408
          },
          {
            "kind": "memory_move",
            "duration_us": 17.352
          },
          {
            "kind": "wait",
            "duration_us": 5.784
          },
          {
            "kind": "unaccounted",
            "duration_us": 3.856
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-7-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1064,
      "ts": 1000010.89,
      "dur": 142.8,
      "cat": "event",
      "args": {
        "taskId": "A5D0C07V0-T023",
        "seqNo": 22,
        "wrapId": 7,
        "coreType": "AIV",
        "physicalCoreId": 32,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202035, callOpMagic:10027, leafHash:1231527610565308499, TaskId:A5D0C07V0-T023",
        "execution-hint": "die0.cluster07.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 38.4,
            "ratio": 0.269
          },
          {
            "kind": "memory_move",
            "duration_us": 56.1,
            "ratio": 0.393
          },
          {
            "kind": "wait",
            "duration_us": 36.5,
            "ratio": 0.256
          },
          {
            "kind": "unaccounted",
            "duration_us": 11.8,
            "ratio": 0.083
          }
        ],
        "syncEvents": [
          {
            "time": 1000020.79,
            "type": "CV_SYNC_WAIT",
            "eventid": "sync-c07-aiv0-wait-aic",
            "peerTaskId": "A5D0C07C-T019"
          },
          {
            "time": 1000057.29,
            "type": "CV_SYNC_SET",
            "eventid": "sync-c07-aic-set-aiv0",
            "peerTaskId": "A5D0C07C-T019"
          }
        ],
        "diagnosisTags": [
          "top_abnormal",
          "memory_movement",
          "ub_pressure",
          "wait_chain"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-7-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1066,
      "ts": 1000015.39,
      "dur": 63.6,
      "cat": "event",
      "args": {
        "taskId": "A5D0C07V1-T024",
        "seqNo": 23,
        "wrapId": 7,
        "coreType": "AIV",
        "physicalCoreId": 33,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202035, callOpMagic:10037, leafHash:1231527610565308500, TaskId:A5D0C07V1-T024",
        "execution-hint": "die0.cluster07.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 41.976
          },
          {
            "kind": "memory_move",
            "duration_us": 13.356
          },
          {
            "kind": "wait",
            "duration_us": 5.088
          },
          {
            "kind": "unaccounted",
            "duration_us": 3.18
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-8-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1016,
      "ts": 1000002.16,
      "dur": 70.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C08C-T019",
        "seqNo": 24,
        "wrapId": 8,
        "coreType": "AIC",
        "physicalCoreId": 8,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202036, callOpMagic:10018, leafHash:1231527610565308508, TaskId:A5D0C08C-T019",
        "execution-hint": "die0.cluster08.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 50.4
          },
          {
            "kind": "memory_move",
            "duration_us": 12.6
          },
          {
            "kind": "wait",
            "duration_us": 4.2
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.8
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-8-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1068,
      "ts": 1000011.16,
      "dur": 53.4,
      "cat": "event",
      "args": {
        "taskId": "A5D0C08V0-T023",
        "seqNo": 25,
        "wrapId": 8,
        "coreType": "AIV",
        "physicalCoreId": 34,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202036, callOpMagic:10028, leafHash:1231527610565308509, TaskId:A5D0C08V0-T023",
        "execution-hint": "die0.cluster08.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 33.108
          },
          {
            "kind": "memory_move",
            "duration_us": 12.816
          },
          {
            "kind": "wait",
            "duration_us": 4.806
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.67
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-8-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1070,
      "ts": 1000015.66,
      "dur": 59.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C08V1-T024",
        "seqNo": 26,
        "wrapId": 8,
        "coreType": "AIV",
        "physicalCoreId": 35,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202036, callOpMagic:10038, leafHash:1231527610565308510, TaskId:A5D0C08V1-T024",
        "execution-hint": "die0.cluster08.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 38.94
          },
          {
            "kind": "memory_move",
            "duration_us": 12.39
          },
          {
            "kind": "wait",
            "duration_us": 4.72
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.95
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-9-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1018,
      "ts": 1000002.43,
      "dur": 72.2,
      "cat": "event",
      "args": {
        "taskId": "A5D0C09C-T019",
        "seqNo": 27,
        "wrapId": 9,
        "coreType": "AIC",
        "physicalCoreId": 9,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202037, callOpMagic:10019, leafHash:1231527610565308518, TaskId:A5D0C09C-T019",
        "execution-hint": "die0.cluster09.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 51.984
          },
          {
            "kind": "memory_move",
            "duration_us": 12.996
          },
          {
            "kind": "wait",
            "duration_us": 4.332
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.888
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-9-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1072,
      "ts": 1000011.43,
      "dur": 55.2,
      "cat": "event",
      "args": {
        "taskId": "A5D0C09V0-T023",
        "seqNo": 28,
        "wrapId": 9,
        "coreType": "AIV",
        "physicalCoreId": 36,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202037, callOpMagic:10029, leafHash:1231527610565308519, TaskId:A5D0C09V0-T023",
        "execution-hint": "die0.cluster09.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 34.224
          },
          {
            "kind": "memory_move",
            "duration_us": 13.248
          },
          {
            "kind": "wait",
            "duration_us": 4.968
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.76
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-9-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1074,
      "ts": 1000015.93,
      "dur": 54.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C09V1-T024",
        "seqNo": 29,
        "wrapId": 9,
        "coreType": "AIV",
        "physicalCoreId": 37,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202037, callOpMagic:10039, leafHash:1231527610565308520, TaskId:A5D0C09V1-T024",
        "execution-hint": "die0.cluster09.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 35.64
          },
          {
            "kind": "memory_move",
            "duration_us": 11.34
          },
          {
            "kind": "wait",
            "duration_us": 4.32
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.7
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-10-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1020,
      "ts": 1000002.7,
      "dur": 74.4,
      "cat": "event",
      "args": {
        "taskId": "A5D0C10C-T019",
        "seqNo": 30,
        "wrapId": 10,
        "coreType": "AIC",
        "physicalCoreId": 10,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202038, callOpMagic:10020, leafHash:1231527610565308528, TaskId:A5D0C10C-T019",
        "execution-hint": "die0.cluster10.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 53.568
          },
          {
            "kind": "memory_move",
            "duration_us": 13.392
          },
          {
            "kind": "wait",
            "duration_us": 4.464
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.976
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-10-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1076,
      "ts": 1000011.7,
      "dur": 48.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C10V0-T023",
        "seqNo": 31,
        "wrapId": 10,
        "coreType": "AIV",
        "physicalCoreId": 38,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202038, callOpMagic:10030, leafHash:1231527610565308529, TaskId:A5D0C10V0-T023",
        "execution-hint": "die0.cluster10.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 29.76
          },
          {
            "kind": "memory_move",
            "duration_us": 11.52
          },
          {
            "kind": "wait",
            "duration_us": 4.32
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.4
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-10-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1078,
      "ts": 1000016.2,
      "dur": 56.5,
      "cat": "event",
      "args": {
        "taskId": "A5D0C10V1-T024",
        "seqNo": 32,
        "wrapId": 10,
        "coreType": "AIV",
        "physicalCoreId": 39,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202038, callOpMagic:10040, leafHash:1231527610565308530, TaskId:A5D0C10V1-T024",
        "execution-hint": "die0.cluster10.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 37.29
          },
          {
            "kind": "memory_move",
            "duration_us": 11.865
          },
          {
            "kind": "wait",
            "duration_us": 4.52
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.825
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-11-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1022,
      "ts": 1000002.97,
      "dur": 76.6,
      "cat": "event",
      "args": {
        "taskId": "A5D0C11C-T019",
        "seqNo": 33,
        "wrapId": 11,
        "coreType": "AIC",
        "physicalCoreId": 11,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202039, callOpMagic:10021, leafHash:1231527610565308538, TaskId:A5D0C11C-T019",
        "execution-hint": "die0.cluster11.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 55.152
          },
          {
            "kind": "memory_move",
            "duration_us": 13.788
          },
          {
            "kind": "wait",
            "duration_us": 4.596
          },
          {
            "kind": "unaccounted",
            "duration_us": 3.064
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-11-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1080,
      "ts": 1000011.97,
      "dur": 49.8,
      "cat": "event",
      "args": {
        "taskId": "A5D0C11V0-T023",
        "seqNo": 34,
        "wrapId": 11,
        "coreType": "AIV",
        "physicalCoreId": 40,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202039, callOpMagic:10031, leafHash:1231527610565308539, TaskId:A5D0C11V0-T023",
        "execution-hint": "die0.cluster11.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 30.876
          },
          {
            "kind": "memory_move",
            "duration_us": 11.952
          },
          {
            "kind": "wait",
            "duration_us": 4.482
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.49
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-11-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1082,
      "ts": 1000016.47,
      "dur": 59.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C11V1-T024",
        "seqNo": 35,
        "wrapId": 11,
        "coreType": "AIV",
        "physicalCoreId": 41,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202039, callOpMagic:10041, leafHash:1231527610565308540, TaskId:A5D0C11V1-T024",
        "execution-hint": "die0.cluster11.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 38.94
          },
          {
            "kind": "memory_move",
            "duration_us": 12.39
          },
          {
            "kind": "wait",
            "duration_us": 4.72
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.95
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-12-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1024,
      "ts": 1000003.24,
      "dur": 70.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C12C-T019",
        "seqNo": 36,
        "wrapId": 12,
        "coreType": "AIC",
        "physicalCoreId": 12,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202040, callOpMagic:10022, leafHash:1231527610565308548, TaskId:A5D0C12C-T019",
        "execution-hint": "die0.cluster12.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 50.4
          },
          {
            "kind": "memory_move",
            "duration_us": 12.6
          },
          {
            "kind": "wait",
            "duration_us": 4.2
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.8
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-12-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1084,
      "ts": 1000012.24,
      "dur": 51.6,
      "cat": "event",
      "args": {
        "taskId": "A5D0C12V0-T023",
        "seqNo": 37,
        "wrapId": 12,
        "coreType": "AIV",
        "physicalCoreId": 42,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202040, callOpMagic:10032, leafHash:1231527610565308549, TaskId:A5D0C12V0-T023",
        "execution-hint": "die0.cluster12.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 31.992
          },
          {
            "kind": "memory_move",
            "duration_us": 12.384
          },
          {
            "kind": "wait",
            "duration_us": 4.644
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.58
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-12-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1086,
      "ts": 1000016.74,
      "dur": 54.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C12V1-T024",
        "seqNo": 38,
        "wrapId": 12,
        "coreType": "AIV",
        "physicalCoreId": 43,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202040, callOpMagic:10042, leafHash:1231527610565308550, TaskId:A5D0C12V1-T024",
        "execution-hint": "die0.cluster12.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 35.64
          },
          {
            "kind": "memory_move",
            "duration_us": 11.34
          },
          {
            "kind": "wait",
            "duration_us": 4.32
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.7
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-13-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1026,
      "ts": 1000003.51,
      "dur": 72.2,
      "cat": "event",
      "args": {
        "taskId": "A5D0C13C-T019",
        "seqNo": 39,
        "wrapId": 13,
        "coreType": "AIC",
        "physicalCoreId": 13,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202041, callOpMagic:10023, leafHash:1231527610565308558, TaskId:A5D0C13C-T019",
        "execution-hint": "die0.cluster13.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 51.984
          },
          {
            "kind": "memory_move",
            "duration_us": 12.996
          },
          {
            "kind": "wait",
            "duration_us": 4.332
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.888
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-13-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1088,
      "ts": 1000012.51,
      "dur": 53.4,
      "cat": "event",
      "args": {
        "taskId": "A5D0C13V0-T023",
        "seqNo": 40,
        "wrapId": 13,
        "coreType": "AIV",
        "physicalCoreId": 44,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202041, callOpMagic:10033, leafHash:1231527610565308559, TaskId:A5D0C13V0-T023",
        "execution-hint": "die0.cluster13.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 33.108
          },
          {
            "kind": "memory_move",
            "duration_us": 12.816
          },
          {
            "kind": "wait",
            "duration_us": 4.806
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.67
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-13-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1090,
      "ts": 1000017.01,
      "dur": 56.5,
      "cat": "event",
      "args": {
        "taskId": "A5D0C13V1-T024",
        "seqNo": 41,
        "wrapId": 13,
        "coreType": "AIV",
        "physicalCoreId": 45,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202041, callOpMagic:10043, leafHash:1231527610565308560, TaskId:A5D0C13V1-T024",
        "execution-hint": "die0.cluster13.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 37.29
          },
          {
            "kind": "memory_move",
            "duration_us": 11.865
          },
          {
            "kind": "wait",
            "duration_us": 4.52
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.825
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-14-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1028,
      "ts": 1000003.78,
      "dur": 74.4,
      "cat": "event",
      "args": {
        "taskId": "A5D0C14C-T019",
        "seqNo": 42,
        "wrapId": 14,
        "coreType": "AIC",
        "physicalCoreId": 14,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202042, callOpMagic:10024, leafHash:1231527610565308568, TaskId:A5D0C14C-T019",
        "execution-hint": "die0.cluster14.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 53.568
          },
          {
            "kind": "memory_move",
            "duration_us": 13.392
          },
          {
            "kind": "wait",
            "duration_us": 4.464
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.976
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-14-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1092,
      "ts": 1000012.78,
      "dur": 55.2,
      "cat": "event",
      "args": {
        "taskId": "A5D0C14V0-T023",
        "seqNo": 43,
        "wrapId": 14,
        "coreType": "AIV",
        "physicalCoreId": 46,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202042, callOpMagic:10034, leafHash:1231527610565308569, TaskId:A5D0C14V0-T023",
        "execution-hint": "die0.cluster14.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 34.224
          },
          {
            "kind": "memory_move",
            "duration_us": 13.248
          },
          {
            "kind": "wait",
            "duration_us": 4.968
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.76
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-14-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1094,
      "ts": 1000017.28,
      "dur": 59.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C14V1-T024",
        "seqNo": 44,
        "wrapId": 14,
        "coreType": "AIV",
        "physicalCoreId": 47,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202042, callOpMagic:10044, leafHash:1231527610565308570, TaskId:A5D0C14V1-T024",
        "execution-hint": "die0.cluster14.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 38.94
          },
          {
            "kind": "memory_move",
            "duration_us": 12.39
          },
          {
            "kind": "wait",
            "duration_us": 4.72
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.95
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-15-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1030,
      "ts": 1000004.05,
      "dur": 76.6,
      "cat": "event",
      "args": {
        "taskId": "A5D0C15C-T019",
        "seqNo": 45,
        "wrapId": 15,
        "coreType": "AIC",
        "physicalCoreId": 15,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202043, callOpMagic:10025, leafHash:1231527610565308578, TaskId:A5D0C15C-T019",
        "execution-hint": "die0.cluster15.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 55.152
          },
          {
            "kind": "memory_move",
            "duration_us": 13.788
          },
          {
            "kind": "wait",
            "duration_us": 4.596
          },
          {
            "kind": "unaccounted",
            "duration_us": 3.064
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-15-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1096,
      "ts": 1000013.05,
      "dur": 48.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C15V0-T023",
        "seqNo": 46,
        "wrapId": 15,
        "coreType": "AIV",
        "physicalCoreId": 48,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202043, callOpMagic:10035, leafHash:1231527610565308579, TaskId:A5D0C15V0-T023",
        "execution-hint": "die0.cluster15.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 29.76
          },
          {
            "kind": "memory_move",
            "duration_us": 11.52
          },
          {
            "kind": "wait",
            "duration_us": 4.32
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.4
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-15-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1098,
      "ts": 1000017.55,
      "dur": 54.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C15V1-T024",
        "seqNo": 47,
        "wrapId": 15,
        "coreType": "AIV",
        "physicalCoreId": 49,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202043, callOpMagic:10045, leafHash:1231527610565308580, TaskId:A5D0C15V1-T024",
        "execution-hint": "die0.cluster15.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 35.64
          },
          {
            "kind": "memory_move",
            "duration_us": 11.34
          },
          {
            "kind": "wait",
            "duration_us": 4.32
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.7
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-16-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1032,
      "ts": 1000004.32,
      "dur": 70.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C16C-T019",
        "seqNo": 48,
        "wrapId": 16,
        "coreType": "AIC",
        "physicalCoreId": 16,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202044, callOpMagic:10026, leafHash:1231527610565308588, TaskId:A5D0C16C-T019",
        "execution-hint": "die0.cluster16.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 50.4
          },
          {
            "kind": "memory_move",
            "duration_us": 12.6
          },
          {
            "kind": "wait",
            "duration_us": 4.2
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.8
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-16-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1100,
      "ts": 1000013.32,
      "dur": 49.8,
      "cat": "event",
      "args": {
        "taskId": "A5D0C16V0-T023",
        "seqNo": 49,
        "wrapId": 16,
        "coreType": "AIV",
        "physicalCoreId": 50,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202044, callOpMagic:10036, leafHash:1231527610565308589, TaskId:A5D0C16V0-T023",
        "execution-hint": "die0.cluster16.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 30.876
          },
          {
            "kind": "memory_move",
            "duration_us": 11.952
          },
          {
            "kind": "wait",
            "duration_us": 4.482
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.49
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-16-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1102,
      "ts": 1000017.82,
      "dur": 56.5,
      "cat": "event",
      "args": {
        "taskId": "A5D0C16V1-T024",
        "seqNo": 50,
        "wrapId": 16,
        "coreType": "AIV",
        "physicalCoreId": 51,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202044, callOpMagic:10046, leafHash:1231527610565308590, TaskId:A5D0C16V1-T024",
        "execution-hint": "die0.cluster16.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 37.29
          },
          {
            "kind": "memory_move",
            "duration_us": 11.865
          },
          {
            "kind": "wait",
            "duration_us": 4.52
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.825
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-17-19-42-0(qk_matmul)",
      "ph": "X",
      "pid": 1,
      "tid": 1034,
      "ts": 1000004.59,
      "dur": 72.2,
      "cat": "event",
      "args": {
        "taskId": "A5D0C17C-T019",
        "seqNo": 51,
        "wrapId": 17,
        "coreType": "AIC",
        "physicalCoreId": 17,
        "semantic_label": "qk_matmul",
        "event-hint": "rootHash:9928535964290202045, callOpMagic:10027, leafHash:1231527610565308598, TaskId:A5D0C17C-T019",
        "execution-hint": "die0.cluster17.AIC executes qk_matmul",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 51.984
          },
          {
            "kind": "memory_move",
            "duration_us": 12.996
          },
          {
            "kind": "wait",
            "duration_us": 4.332
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.888
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "cube_main_path"
        ],
        "color": "AIC"
      }
    },
    {
      "name": "0-17-23-42-0(interleave_rope)",
      "ph": "X",
      "pid": 1,
      "tid": 1104,
      "ts": 1000013.59,
      "dur": 51.6,
      "cat": "event",
      "args": {
        "taskId": "A5D0C17V0-T023",
        "seqNo": 52,
        "wrapId": 17,
        "coreType": "AIV",
        "physicalCoreId": 52,
        "semantic_label": "interleave_rope_split_kv",
        "event-hint": "rootHash:9928535964290202045, callOpMagic:10037, leafHash:1231527610565308599, TaskId:A5D0C17V0-T023",
        "execution-hint": "die0.cluster17.AIV0 executes interleave_rope_split_kv",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 31.992
          },
          {
            "kind": "memory_move",
            "duration_us": 12.384
          },
          {
            "kind": "wait",
            "duration_us": 4.644
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.58
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    },
    {
      "name": "0-17-24-42-0(softmax_acc)",
      "ph": "X",
      "pid": 1,
      "tid": 1106,
      "ts": 1000018.09,
      "dur": 59.0,
      "cat": "event",
      "args": {
        "taskId": "A5D0C17V1-T024",
        "seqNo": 53,
        "wrapId": 17,
        "coreType": "AIV",
        "physicalCoreId": 53,
        "semantic_label": "softmax_acc",
        "event-hint": "rootHash:9928535964290202045, callOpMagic:10047, leafHash:1231527610565308600, TaskId:A5D0C17V1-T024",
        "execution-hint": "die0.cluster17.AIV1 executes softmax_acc",
        "ioperand-hint": "q_tile,k_tile,v_tile,rope_sin_cos",
        "ooperand-hint": "rope_q,rope_k,attention_partial",
        "segments": [
          {
            "kind": "compute",
            "duration_us": 38.94
          },
          {
            "kind": "memory_move",
            "duration_us": 12.39
          },
          {
            "kind": "wait",
            "duration_us": 4.72
          },
          {
            "kind": "unaccounted",
            "duration_us": 2.95
          }
        ],
        "syncEvents": [],
        "diagnosisTags": [
          "vector_path"
        ],
        "color": "AIV"
      }
    }
  ],
  "pmuRows": [
    {
      "thread id": "19791",
      "task id": "A5D0C00C-T019",
      "stream id": "0",
      "core id": "0",
      "seqNo": "0",
      "sub task id": "65536",
      "total cycle": "82600",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "34692",
      "scalar_instr_busy": "18998",
      "mte1_instr_busy": "12390",
      "mte2_instr_busy": "19824",
      "mte3_instr_busy": "0",
      "icache_req": "1800",
      "icache_miss": "70",
      "pmu_fix_instr_busy": "14868"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C00V0-T023",
      "stream id": "0",
      "core id": "18",
      "seqNo": "1",
      "sub task id": "65537",
      "total cycle": "56640",
      "pmu_idc_aic_vec_busy_o": "23788",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "13027",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "6796",
      "mte3_instr_busy": "12460",
      "icache_req": "1926",
      "icache_miss": "88",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C00V1-T024",
      "stream id": "0",
      "core id": "19",
      "seqNo": "2",
      "sub task id": "65538",
      "total cycle": "63720",
      "pmu_idc_aic_vec_busy_o": "26762",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14655",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7646",
      "mte3_instr_busy": "14018",
      "icache_req": "1933",
      "icache_miss": "89",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C01C-T019",
      "stream id": "0",
      "core id": "1",
      "seqNo": "3",
      "sub task id": "65539",
      "total cycle": "85196",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "35782",
      "scalar_instr_busy": "19595",
      "mte1_instr_busy": "12779",
      "mte2_instr_busy": "20447",
      "mte3_instr_busy": "0",
      "icache_req": "1807",
      "icache_miss": "71",
      "pmu_fix_instr_busy": "15335"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C01V0-T023",
      "stream id": "0",
      "core id": "20",
      "seqNo": "4",
      "sub task id": "65540",
      "total cycle": "58764",
      "pmu_idc_aic_vec_busy_o": "24680",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "13515",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7051",
      "mte3_instr_busy": "12928",
      "icache_req": "1940",
      "icache_miss": "90",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C01V1-T024",
      "stream id": "0",
      "core id": "21",
      "seqNo": "5",
      "sub task id": "65541",
      "total cycle": "66670",
      "pmu_idc_aic_vec_busy_o": "28001",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "15334",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "8000",
      "mte3_instr_busy": "14667",
      "icache_req": "1947",
      "icache_miss": "91",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C02C-T019",
      "stream id": "0",
      "core id": "2",
      "seqNo": "6",
      "sub task id": "65542",
      "total cycle": "87792",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "36872",
      "scalar_instr_busy": "20192",
      "mte1_instr_busy": "13168",
      "mte2_instr_busy": "21070",
      "mte3_instr_busy": "0",
      "icache_req": "1814",
      "icache_miss": "72",
      "pmu_fix_instr_busy": "15802"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C02V0-T023",
      "stream id": "0",
      "core id": "22",
      "seqNo": "7",
      "sub task id": "65543",
      "total cycle": "60888",
      "pmu_idc_aic_vec_busy_o": "25572",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14004",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7306",
      "mte3_instr_busy": "13395",
      "icache_req": "1954",
      "icache_miss": "92",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C02V1-T024",
      "stream id": "0",
      "core id": "23",
      "seqNo": "8",
      "sub task id": "65544",
      "total cycle": "69620",
      "pmu_idc_aic_vec_busy_o": "29240",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "16012",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "8354",
      "mte3_instr_busy": "15316",
      "icache_req": "1961",
      "icache_miss": "70",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C03C-T019",
      "stream id": "0",
      "core id": "3",
      "seqNo": "9",
      "sub task id": "65545",
      "total cycle": "90388",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "37962",
      "scalar_instr_busy": "20789",
      "mte1_instr_busy": "13558",
      "mte2_instr_busy": "21693",
      "mte3_instr_busy": "0",
      "icache_req": "1821",
      "icache_miss": "73",
      "pmu_fix_instr_busy": "16269"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C03V0-T023",
      "stream id": "0",
      "core id": "24",
      "seqNo": "10",
      "sub task id": "65546",
      "total cycle": "63012",
      "pmu_idc_aic_vec_busy_o": "26465",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14492",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7561",
      "mte3_instr_busy": "13862",
      "icache_req": "1968",
      "icache_miss": "71",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C03V1-T024",
      "stream id": "0",
      "core id": "25",
      "seqNo": "11",
      "sub task id": "65547",
      "total cycle": "63720",
      "pmu_idc_aic_vec_busy_o": "26762",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14655",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7646",
      "mte3_instr_busy": "14018",
      "icache_req": "1975",
      "icache_miss": "72",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C04C-T019",
      "stream id": "0",
      "core id": "4",
      "seqNo": "12",
      "sub task id": "65548",
      "total cycle": "82600",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "34692",
      "scalar_instr_busy": "18998",
      "mte1_instr_busy": "12390",
      "mte2_instr_busy": "19824",
      "mte3_instr_busy": "0",
      "icache_req": "1828",
      "icache_miss": "74",
      "pmu_fix_instr_busy": "14868"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C04V0-T023",
      "stream id": "0",
      "core id": "26",
      "seqNo": "13",
      "sub task id": "65549",
      "total cycle": "65136",
      "pmu_idc_aic_vec_busy_o": "27357",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14981",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7816",
      "mte3_instr_busy": "14329",
      "icache_req": "1982",
      "icache_miss": "73",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C04V1-T024",
      "stream id": "0",
      "core id": "27",
      "seqNo": "14",
      "sub task id": "65550",
      "total cycle": "66670",
      "pmu_idc_aic_vec_busy_o": "28001",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "15334",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "8000",
      "mte3_instr_busy": "14667",
      "icache_req": "1989",
      "icache_miss": "74",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C05C-T019",
      "stream id": "0",
      "core id": "5",
      "seqNo": "15",
      "sub task id": "65551",
      "total cycle": "85196",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "35782",
      "scalar_instr_busy": "19595",
      "mte1_instr_busy": "12779",
      "mte2_instr_busy": "20447",
      "mte3_instr_busy": "0",
      "icache_req": "1835",
      "icache_miss": "75",
      "pmu_fix_instr_busy": "15335"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C05V0-T023",
      "stream id": "0",
      "core id": "28",
      "seqNo": "16",
      "sub task id": "65552",
      "total cycle": "56640",
      "pmu_idc_aic_vec_busy_o": "23788",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "13027",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "6796",
      "mte3_instr_busy": "12460",
      "icache_req": "1996",
      "icache_miss": "75",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C05V1-T024",
      "stream id": "0",
      "core id": "29",
      "seqNo": "17",
      "sub task id": "65553",
      "total cycle": "69620",
      "pmu_idc_aic_vec_busy_o": "29240",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "16012",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "8354",
      "mte3_instr_busy": "15316",
      "icache_req": "2003",
      "icache_miss": "76",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C06C-T019",
      "stream id": "0",
      "core id": "6",
      "seqNo": "18",
      "sub task id": "65554",
      "total cycle": "87792",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "36872",
      "scalar_instr_busy": "20192",
      "mte1_instr_busy": "13168",
      "mte2_instr_busy": "21070",
      "mte3_instr_busy": "0",
      "icache_req": "1842",
      "icache_miss": "76",
      "pmu_fix_instr_busy": "15802"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C06V0-T023",
      "stream id": "0",
      "core id": "30",
      "seqNo": "19",
      "sub task id": "65555",
      "total cycle": "58764",
      "pmu_idc_aic_vec_busy_o": "24680",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "13515",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7051",
      "mte3_instr_busy": "12928",
      "icache_req": "2010",
      "icache_miss": "77",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C06V1-T024",
      "stream id": "0",
      "core id": "31",
      "seqNo": "20",
      "sub task id": "65556",
      "total cycle": "63720",
      "pmu_idc_aic_vec_busy_o": "26762",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14655",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7646",
      "mte3_instr_busy": "14018",
      "icache_req": "2017",
      "icache_miss": "78",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C07C-T019",
      "stream id": "0",
      "core id": "7",
      "seqNo": "21",
      "sub task id": "65557",
      "total cycle": "113752",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "47775",
      "scalar_instr_busy": "26162",
      "mte1_instr_busy": "17062",
      "mte2_instr_busy": "27300",
      "mte3_instr_busy": "0",
      "icache_req": "1849",
      "icache_miss": "77",
      "pmu_fix_instr_busy": "20475"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C07V0-T023",
      "stream id": "0",
      "core id": "32",
      "seqNo": "22",
      "sub task id": "65558",
      "total cycle": "168504",
      "pmu_idc_aic_vec_busy_o": "47181",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "38755",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "60661",
      "mte3_instr_busy": "57291",
      "icache_req": "2024",
      "icache_miss": "79",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C07V1-T024",
      "stream id": "0",
      "core id": "33",
      "seqNo": "23",
      "sub task id": "65559",
      "total cycle": "75048",
      "pmu_idc_aic_vec_busy_o": "31520",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "17261",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "9005",
      "mte3_instr_busy": "16510",
      "icache_req": "2031",
      "icache_miss": "80",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C08C-T019",
      "stream id": "0",
      "core id": "8",
      "seqNo": "24",
      "sub task id": "65560",
      "total cycle": "82600",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "34692",
      "scalar_instr_busy": "18998",
      "mte1_instr_busy": "12390",
      "mte2_instr_busy": "19824",
      "mte3_instr_busy": "0",
      "icache_req": "1856",
      "icache_miss": "78",
      "pmu_fix_instr_busy": "14868"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C08V0-T023",
      "stream id": "0",
      "core id": "34",
      "seqNo": "25",
      "sub task id": "65561",
      "total cycle": "63012",
      "pmu_idc_aic_vec_busy_o": "26465",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14492",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7561",
      "mte3_instr_busy": "13862",
      "icache_req": "2038",
      "icache_miss": "81",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19792",
      "task id": "A5D0C08V1-T024",
      "stream id": "0",
      "core id": "35",
      "seqNo": "26",
      "sub task id": "65562",
      "total cycle": "69620",
      "pmu_idc_aic_vec_busy_o": "29240",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "16012",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "8354",
      "mte3_instr_busy": "15316",
      "icache_req": "2045",
      "icache_miss": "82",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C09C-T019",
      "stream id": "0",
      "core id": "9",
      "seqNo": "27",
      "sub task id": "65563",
      "total cycle": "85196",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "35782",
      "scalar_instr_busy": "19595",
      "mte1_instr_busy": "12779",
      "mte2_instr_busy": "20447",
      "mte3_instr_busy": "0",
      "icache_req": "1863",
      "icache_miss": "79",
      "pmu_fix_instr_busy": "15335"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C09V0-T023",
      "stream id": "0",
      "core id": "36",
      "seqNo": "28",
      "sub task id": "65564",
      "total cycle": "65136",
      "pmu_idc_aic_vec_busy_o": "27357",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14981",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7816",
      "mte3_instr_busy": "14329",
      "icache_req": "2052",
      "icache_miss": "83",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C09V1-T024",
      "stream id": "0",
      "core id": "37",
      "seqNo": "29",
      "sub task id": "65565",
      "total cycle": "63720",
      "pmu_idc_aic_vec_busy_o": "26762",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14655",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7646",
      "mte3_instr_busy": "14018",
      "icache_req": "2059",
      "icache_miss": "84",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C10C-T019",
      "stream id": "0",
      "core id": "10",
      "seqNo": "30",
      "sub task id": "65566",
      "total cycle": "87792",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "36872",
      "scalar_instr_busy": "20192",
      "mte1_instr_busy": "13168",
      "mte2_instr_busy": "21070",
      "mte3_instr_busy": "0",
      "icache_req": "1870",
      "icache_miss": "80",
      "pmu_fix_instr_busy": "15802"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C10V0-T023",
      "stream id": "0",
      "core id": "38",
      "seqNo": "31",
      "sub task id": "65567",
      "total cycle": "56640",
      "pmu_idc_aic_vec_busy_o": "23788",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "13027",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "6796",
      "mte3_instr_busy": "12460",
      "icache_req": "2066",
      "icache_miss": "85",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C10V1-T024",
      "stream id": "0",
      "core id": "39",
      "seqNo": "32",
      "sub task id": "65568",
      "total cycle": "66670",
      "pmu_idc_aic_vec_busy_o": "28001",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "15334",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "8000",
      "mte3_instr_busy": "14667",
      "icache_req": "2073",
      "icache_miss": "86",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C11C-T019",
      "stream id": "0",
      "core id": "11",
      "seqNo": "33",
      "sub task id": "65569",
      "total cycle": "90388",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "37962",
      "scalar_instr_busy": "20789",
      "mte1_instr_busy": "13558",
      "mte2_instr_busy": "21693",
      "mte3_instr_busy": "0",
      "icache_req": "1877",
      "icache_miss": "81",
      "pmu_fix_instr_busy": "16269"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C11V0-T023",
      "stream id": "0",
      "core id": "40",
      "seqNo": "34",
      "sub task id": "65570",
      "total cycle": "58764",
      "pmu_idc_aic_vec_busy_o": "24680",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "13515",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7051",
      "mte3_instr_busy": "12928",
      "icache_req": "2080",
      "icache_miss": "87",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C11V1-T024",
      "stream id": "0",
      "core id": "41",
      "seqNo": "35",
      "sub task id": "65571",
      "total cycle": "69620",
      "pmu_idc_aic_vec_busy_o": "29240",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "16012",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "8354",
      "mte3_instr_busy": "15316",
      "icache_req": "2087",
      "icache_miss": "88",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C12C-T019",
      "stream id": "0",
      "core id": "12",
      "seqNo": "36",
      "sub task id": "65572",
      "total cycle": "82600",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "34692",
      "scalar_instr_busy": "18998",
      "mte1_instr_busy": "12390",
      "mte2_instr_busy": "19824",
      "mte3_instr_busy": "0",
      "icache_req": "1884",
      "icache_miss": "82",
      "pmu_fix_instr_busy": "14868"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C12V0-T023",
      "stream id": "0",
      "core id": "42",
      "seqNo": "37",
      "sub task id": "65573",
      "total cycle": "60888",
      "pmu_idc_aic_vec_busy_o": "25572",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14004",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7306",
      "mte3_instr_busy": "13395",
      "icache_req": "2094",
      "icache_miss": "89",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C12V1-T024",
      "stream id": "0",
      "core id": "43",
      "seqNo": "38",
      "sub task id": "65574",
      "total cycle": "63720",
      "pmu_idc_aic_vec_busy_o": "26762",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14655",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7646",
      "mte3_instr_busy": "14018",
      "icache_req": "2101",
      "icache_miss": "90",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C13C-T019",
      "stream id": "0",
      "core id": "13",
      "seqNo": "39",
      "sub task id": "65575",
      "total cycle": "85196",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "35782",
      "scalar_instr_busy": "19595",
      "mte1_instr_busy": "12779",
      "mte2_instr_busy": "20447",
      "mte3_instr_busy": "0",
      "icache_req": "1891",
      "icache_miss": "83",
      "pmu_fix_instr_busy": "15335"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C13V0-T023",
      "stream id": "0",
      "core id": "44",
      "seqNo": "40",
      "sub task id": "65576",
      "total cycle": "63012",
      "pmu_idc_aic_vec_busy_o": "26465",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14492",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7561",
      "mte3_instr_busy": "13862",
      "icache_req": "2108",
      "icache_miss": "91",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C13V1-T024",
      "stream id": "0",
      "core id": "45",
      "seqNo": "41",
      "sub task id": "65577",
      "total cycle": "66670",
      "pmu_idc_aic_vec_busy_o": "28001",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "15334",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "8000",
      "mte3_instr_busy": "14667",
      "icache_req": "2115",
      "icache_miss": "92",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C14C-T019",
      "stream id": "0",
      "core id": "14",
      "seqNo": "42",
      "sub task id": "65578",
      "total cycle": "87792",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "36872",
      "scalar_instr_busy": "20192",
      "mte1_instr_busy": "13168",
      "mte2_instr_busy": "21070",
      "mte3_instr_busy": "0",
      "icache_req": "1898",
      "icache_miss": "84",
      "pmu_fix_instr_busy": "15802"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C14V0-T023",
      "stream id": "0",
      "core id": "46",
      "seqNo": "43",
      "sub task id": "65579",
      "total cycle": "65136",
      "pmu_idc_aic_vec_busy_o": "27357",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14981",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7816",
      "mte3_instr_busy": "14329",
      "icache_req": "2122",
      "icache_miss": "70",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C14V1-T024",
      "stream id": "0",
      "core id": "47",
      "seqNo": "44",
      "sub task id": "65580",
      "total cycle": "69620",
      "pmu_idc_aic_vec_busy_o": "29240",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "16012",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "8354",
      "mte3_instr_busy": "15316",
      "icache_req": "2129",
      "icache_miss": "71",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C15C-T019",
      "stream id": "0",
      "core id": "15",
      "seqNo": "45",
      "sub task id": "65581",
      "total cycle": "90388",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "37962",
      "scalar_instr_busy": "20789",
      "mte1_instr_busy": "13558",
      "mte2_instr_busy": "21693",
      "mte3_instr_busy": "0",
      "icache_req": "1905",
      "icache_miss": "85",
      "pmu_fix_instr_busy": "16269"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C15V0-T023",
      "stream id": "0",
      "core id": "48",
      "seqNo": "46",
      "sub task id": "65582",
      "total cycle": "56640",
      "pmu_idc_aic_vec_busy_o": "23788",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "13027",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "6796",
      "mte3_instr_busy": "12460",
      "icache_req": "2136",
      "icache_miss": "72",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C15V1-T024",
      "stream id": "0",
      "core id": "49",
      "seqNo": "47",
      "sub task id": "65583",
      "total cycle": "63720",
      "pmu_idc_aic_vec_busy_o": "26762",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14655",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7646",
      "mte3_instr_busy": "14018",
      "icache_req": "2143",
      "icache_miss": "73",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C16C-T019",
      "stream id": "0",
      "core id": "16",
      "seqNo": "48",
      "sub task id": "65584",
      "total cycle": "82600",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "34692",
      "scalar_instr_busy": "18998",
      "mte1_instr_busy": "12390",
      "mte2_instr_busy": "19824",
      "mte3_instr_busy": "0",
      "icache_req": "1912",
      "icache_miss": "86",
      "pmu_fix_instr_busy": "14868"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C16V0-T023",
      "stream id": "0",
      "core id": "50",
      "seqNo": "49",
      "sub task id": "65585",
      "total cycle": "58764",
      "pmu_idc_aic_vec_busy_o": "24680",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "13515",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7051",
      "mte3_instr_busy": "12928",
      "icache_req": "2150",
      "icache_miss": "74",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C16V1-T024",
      "stream id": "0",
      "core id": "51",
      "seqNo": "50",
      "sub task id": "65586",
      "total cycle": "66670",
      "pmu_idc_aic_vec_busy_o": "28001",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "15334",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "8000",
      "mte3_instr_busy": "14667",
      "icache_req": "2157",
      "icache_miss": "75",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19791",
      "task id": "A5D0C17C-T019",
      "stream id": "0",
      "core id": "17",
      "seqNo": "51",
      "sub task id": "65587",
      "total cycle": "85196",
      "pmu_idc_aic_vec_busy_o": "0",
      "cube_instr_busy": "35782",
      "scalar_instr_busy": "19595",
      "mte1_instr_busy": "12779",
      "mte2_instr_busy": "20447",
      "mte3_instr_busy": "0",
      "icache_req": "1919",
      "icache_miss": "87",
      "pmu_fix_instr_busy": "15335"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C17V0-T023",
      "stream id": "0",
      "core id": "52",
      "seqNo": "52",
      "sub task id": "65588",
      "total cycle": "60888",
      "pmu_idc_aic_vec_busy_o": "25572",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "14004",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "7306",
      "mte3_instr_busy": "13395",
      "icache_req": "2164",
      "icache_miss": "76",
      "pmu_fix_instr_busy": "0"
    },
    {
      "thread id": "19793",
      "task id": "A5D0C17V1-T024",
      "stream id": "0",
      "core id": "53",
      "seqNo": "53",
      "sub task id": "65589",
      "total cycle": "69620",
      "pmu_idc_aic_vec_busy_o": "29240",
      "cube_instr_busy": "0",
      "scalar_instr_busy": "16012",
      "mte1_instr_busy": "0",
      "mte2_instr_busy": "8354",
      "mte3_instr_busy": "15316",
      "icache_req": "2171",
      "icache_miss": "77",
      "pmu_fix_instr_busy": "0"
    }
  ],
  "dynTopoRows": [
    {
      "seqNo": 18,
      "taskId": "A5D0C06C-T019",
      "rootIndex": 6,
      "rootHash": 9928535964290202034,
      "opmagic": 10026,
      "leafIndex": 18,
      "leafHash": 1231527610565308489,
      "coreType": "AIC",
      "psgId": "mix-wrap-6",
      "successors": [
        19
      ]
    },
    {
      "seqNo": 19,
      "taskId": "A5D0C06V0-T023",
      "rootIndex": 6,
      "rootHash": 9928535964290202034,
      "opmagic": 10026,
      "leafIndex": 19,
      "leafHash": 1231527610565308489,
      "coreType": "AIV",
      "psgId": "mix-wrap-6",
      "successors": [
        20
      ]
    },
    {
      "seqNo": 20,
      "taskId": "A5D0C06V1-T024",
      "rootIndex": 6,
      "rootHash": 9928535964290202034,
      "opmagic": 10026,
      "leafIndex": 20,
      "leafHash": 1231527610565308489,
      "coreType": "AIV",
      "psgId": "mix-wrap-6",
      "successors": [
        21
      ]
    },
    {
      "seqNo": 21,
      "taskId": "A5D0C07C-T019",
      "rootIndex": 7,
      "rootHash": 9928535964290202035,
      "opmagic": 10027,
      "leafIndex": 21,
      "leafHash": 1231527610565308499,
      "coreType": "AIC",
      "psgId": "mix-wrap-7",
      "successors": [
        22
      ]
    },
    {
      "seqNo": 22,
      "taskId": "A5D0C07V0-T023",
      "rootIndex": 7,
      "rootHash": 9928535964290202035,
      "opmagic": 10027,
      "leafIndex": 22,
      "leafHash": 1231527610565308499,
      "coreType": "AIV",
      "psgId": "mix-wrap-7",
      "successors": [
        23
      ]
    },
    {
      "seqNo": 23,
      "taskId": "A5D0C07V1-T024",
      "rootIndex": 7,
      "rootHash": 9928535964290202035,
      "opmagic": 10027,
      "leafIndex": 23,
      "leafHash": 1231527610565308499,
      "coreType": "AIV",
      "psgId": "mix-wrap-7",
      "successors": [
        24
      ]
    },
    {
      "seqNo": 24,
      "taskId": "A5D0C08C-T019",
      "rootIndex": 8,
      "rootHash": 9928535964290202036,
      "opmagic": 10028,
      "leafIndex": 24,
      "leafHash": 1231527610565308509,
      "coreType": "AIC",
      "psgId": "mix-wrap-8",
      "successors": []
    },
    {
      "seqNo": 25,
      "taskId": "A5D0C08V0-T023",
      "rootIndex": 8,
      "rootHash": 9928535964290202036,
      "opmagic": 10028,
      "leafIndex": 25,
      "leafHash": 1231527610565308509,
      "coreType": "AIV",
      "psgId": "mix-wrap-8",
      "successors": []
    },
    {
      "seqNo": 26,
      "taskId": "A5D0C08V1-T024",
      "rootIndex": 8,
      "rootHash": 9928535964290202036,
      "opmagic": 10028,
      "leafIndex": 26,
      "leafHash": 1231527610565308509,
      "coreType": "AIV",
      "psgId": "mix-wrap-8",
      "successors": []
    }
  ],
  "memoryPressure": {
    "taskId": "A5D0C07V0-T023",
    "ubBudgetBytes": 262144,
    "ubBudgetMeaning": "L2 demo diagnosis threshold; not asserted as hardware UB capacity",
    "peakLiveBytes": 248320,
    "ubHeadroomBytes": 13824,
    "extraGmUbBytes": 393216,
    "topContributors": [
      {
        "name": "rope_cache_split.k_cache_tile",
        "bytes": 81920,
        "lifetime": [
          1000031.1,
          1000112.4
        ]
      },
      {
        "name": "rope_cache_split.v_cache_tile",
        "bytes": 73728,
        "lifetime": [
          1000033.6,
          1000118.9
        ]
      },
      {
        "name": "interleave_rope.tmp_sin_cos",
        "bytes": 49152,
        "lifetime": [
          1000025.4,
          1000099.8
        ]
      },
      {
        "name": "attention_score.partial_acc",
        "bytes": 28672,
        "lifetime": [
          1000064.0,
          1000126.3
        ]
      }
    ],
    "copyEdges": [
      {
        "edge": "GM->UB",
        "bytes": 262144,
        "reason": "reload k/v tile after live range overlap",
        "avoidability": "likely"
      },
      {
        "edge": "UB->GM",
        "bytes": 131072,
        "reason": "spill-like temporary output before softmax_acc",
        "avoidability": "partial"
      }
    ]
  },
  "waitChain": {
    "waitingTaskId": "A5D0C07V0-T023",
    "signalTaskId": "A5D0C07C-T019",
    "waitingLaneId": "die0.cluster07.AIV0",
    "signalLaneId": "die0.cluster07.AIC",
    "syncType": "CV_SYNC_WAIT",
    "waitDurationUs": 36.5,
    "note": "Sync is a control dependency; AIC/AIV data exchange should still be explained through GM/L2 or trace evidence."
  },
  "recommendations": [
    {
      "id": "R1",
      "action": "reduce K/V tile size for interleave_rope_split_kv",
      "expectedMetricMove": [
        "extraGmUbBytes down",
        "ubHeadroomBytes up",
        "task_time_us down"
      ]
    },
    {
      "id": "R2",
      "action": "review vec_nbuffer_setting to avoid over-merging AIV live ranges",
      "expectedMetricMove": [
        "memory_move ratio down",
        "wait ratio down"
      ]
    }
  ],
  "beforeAfter": {
    "before": {
      "taskTimeUs": 142.8,
      "extraGmUbBytes": 393216,
      "ubHeadroomBytes": 13824,
      "waitRatio": 0.256
    },
    "after": {
      "taskTimeUs": 101.6,
      "extraGmUbBytes": 163840,
      "ubHeadroomBytes": 59392,
      "waitRatio": 0.142
    },
    "validationStatement": "The synthetic after-run reduces memory movement and improves demo UB headroom, matching the recommended action path."
  }
};
