# Mix Sync Events Schema Notes

本文记录 `PTO-TestData/mix/` 中 Mix 转换规则、`wrapId`、`syncEvents` 和 fake testcase 数据等级。

## 1. 定位

`mix/convert.py` 将 `merged_swimlane.json` 转换为 Perfetto 可识别格式，保留原始 events，并新增 `mixMode` process。

## 2. 输入输出

| 项 | 说明 |
| --- | --- |
| 输入 | `merged_swimlane.json` 或其他 Perfetto traceEvents 格式 JSON |
| 输出 | `convert_<input_filename>` |
| 输出格式 | Perfetto traceEvents 格式 |

## 3. 核心字段

Mix 转换关注 `args` 中的：

- `wrapId`
- `syncEvents`
- `syncEvents[*].time`
- `syncEvents[*].type`
- `syncEvents[*].eventid`

常见 sync type：

- `CV_SYNC_SET`
- `CV_SYNC_WAIT`

## 4. 转换规则

- 只处理 `pid = "Machine View"` 的 events。
- 只处理 `wrapId != -1` 的 events。
- 无 `syncEvents` 时不切分。
- SET 在前时按 SET 时间点切分。
- WAIT 在前时丢弃 WAIT -> SET 区间，从 SET 时间开始新 subevent。
- flow 使用 `ph = "s"` / `ph = "f"` 连接 SET 和 WAIT。

## 5. fake testcase 数据等级

`mix/fake_testcase/` 中的 `complex_case*.json` 和转换结果是构造测试用例。它们真实来自 `pypto-testdata` source，但内容角色应标为 `synthetic-testcase`，默认数据等级 L2。

使用边界：

- 可用于验证转换规则和边界条件。
- 不写成真实业务运行结果。
- 如进入 share-safe demo，应披露它是按 Mix schema 构造的 L2 测试数据。
