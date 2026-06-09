# 原型目标

基于 `02-knowledge/01-block-level-coding/block-graph.md` 生成一个可直接打开的 HTML demo，用来讲清 `Block Graph` 在 `PyPTO` 中的对象关系、调试跳转链和来源回溯链。

## 当前版本说明

- 原型文件：`05-prototypes/01-block-level-coding/experiments/html/block-graph-visual-demo.html`
- 展示重点：
  - `业务代码 -> Loop -> PATH -> Tensor Graph -> Tile Graph -> Execute Graph / Block Graph -> swimlane task`
  - `PATH1` 的真实互证链：`rootHash + callOpMagic + leafHash`
  - `CALL` 复用同一张 leaf 的 root / leaf 映射
  - `Block Graph` 本体的代表性 `opcode`
  - 容易混淆概念的对照解释

## 设计取向

- 这版 demo 不复刻 IDE 交互，而是做“知识讲解型单页可视化”。
- 重点是把 `block-graph.md` 中已经稳定的心智模型压缩成一页可浏览内容。
- 文案优先保持与知识文档一致，避免引入新的术语体系。

## 真实性边界

- 本页使用了 `block-graph.md` 已整理出的真实关系与真实文件名。
- `PATH1` 的 `rootHash / callOpMagic / leafHash` 链路按知识文档中已核对的 three-view 样例组织。
- 其他 `PATH` 卡片用于补足路径切换和概念对比，属于“基于真实结构整理的讲解性视图”，不是完整原始图文件逐节点还原。

## 适合怎么用

- 用于讲解 `Block Graph` 与 `Execute Graph`、`CALL`、`swimlane task` 的关系。
- 用于需求讨论、知识对齐和录屏演示。
- 如果后续要继续工程化，可把这页拆成 JSON 驱动的组件化原型，接入真实 `ROOT / LEAF / merged_swimlane.json` 数据。

## 关联资源

- `02-knowledge/01-block-level-coding/block-graph.md`
- `05-prototypes/01-block-level-coding/experiments/html/block-level-ide-demo.html`
- `04-uxdesign/01-block-level-coding/prd.md`
