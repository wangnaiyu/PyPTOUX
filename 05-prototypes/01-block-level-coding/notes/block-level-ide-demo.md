# 原型目标

基于 `04-uxdesign/01-block-level-coding/prd.md` 与 `02-knowledge/01-block-level-coding/overview.md`，生成一个可直接打开的 HTML demo，用来演示 PyPTO Block Level IDE 的核心交互闭环。

## 当前版本说明

- 原型文件：`05-prototypes/01-block-level-coding/experiments/html/block-level-ide-demo.html`
- 交互重点：
  - 代码编辑器与 Block / Execute 图双视图联动
  - 点击节点追溯源码行
  - 手动合图并自动生成 `sg_set_scope`
  - 参数调优后联动资源估算、约束校验和建议引擎
  - 底部 Profiling Swimlane 展示 AI Core / AI CPU 时间轴
  - 快照对比展示“合图前后”的边界变化与收益

## 已验证结论

- `vec_nbuffer_setting` 与手动 `sg_set_scope` 非常适合做“减少小 Vector Block”的 demo 主线。
- `cube_l1_reuse_setting` 与 `cube_nbuffer_setting` 组合，能自然带出“收益与资源风险并存”的讲解点。
- 用单文件 HTML 就能覆盖 PRD 中 Must Have 的大部分演示需求，适合作为需求评审和方向对齐材料。

## 待解决问题

- 当前图和泳道数据仍是“可解释的模拟数据”，还没有接入真实 LEAF / ROOT / Profiling 产物。
- 如果后续要进入高保真验证，建议把图节点、源码映射和泳道数据改成可从 JSON 驱动。
- 若要支持 10 万级节点的渲染能力验证，需要后续引入专门的图渲染方案，而不是继续停留在单文件 DOM demo。

## 下一步

- 增加“默认 / 加载 / 错误 / 空状态”的录屏脚本或截图素材。
- 把参数面板升级成更接近真实 IDE 的表单结构，并补充更多 Block 参数。
- 若要继续工程化，可在 `05-prototypes/01-block-level-coding/app/` 中把 demo 演进为前端子项目。

## 关联资源

- `04-uxdesign/01-block-level-coding/prd.md`
- `02-knowledge/01-block-level-coding/overview.md`
