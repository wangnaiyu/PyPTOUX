# A5 / Ascend 950 术语表

| 术语 | 说明 | 备注 |
| --- | --- | --- |
| `A5` | 项目内对 Ascend 950 代际主题的简称。 | 对外 UI 建议写 `A5 / Ascend 950`。 |
| `Ascend 950` | 新一代昇腾 NPU 架构。 | 当前主题的主对象。 |
| `950PR` | 面向 Prefill / Recommendation 的 950 产品形态。 | 只作为产品标签，不直接代表当前 Mix demo 的运行目标。 |
| `950DT` | 面向 Decode / Training 的 950 产品形态。 | 只作为产品标签，不直接代表当前 Mix demo 的运行目标。 |
| `AIC` / `Cube Core` | 分离架构下的矩阵计算侧。 | Mix 中 MatMul 类任务主要映射到这里。 |
| `AIV` / `Vector Core` | 分离架构下的向量计算侧。 | Mix 中 dequant、RoPE、softmax、cast 类任务主要映射到这里。 |
| `Unified Buffer` | AI Core 内部本地存储，Vector 路径的输入输出存储。 | 可缩写为 `UB`，但要避免和 `UnifiedBus` 混淆。 |
| `UnifiedBus` | 950 公开材料中的 IO / 互联能力。 | UI 中写全名，不缩写成 `UB`。 |
| `NDDMA` | 950 公开材料中提到的新 DMA 能力。 | Demo 可用于解释数据搬运增强。 |
| `BufferID` | 950 公开材料中提到的同步依赖描述模型。 | 当前 PyPTO trace 尚未确认直接暴露该字段。 |
| `URMA` | 950 公开材料中的通信 / 内存访问能力。 | 对象可展示；和 PyPTO 异步路径的绑定需标 claim。 |
| `CCU` | 950 公开材料中的集合通信硬化 / 卸载能力。 | 不强行绑定当前单卡 Mix demo。 |
| `data flow` | 数据在 `GM/L2`、本地 buffer、计算单元、搬运单元之间移动的路径。 | Demo 中使用粗线高亮。 |
| `instruction flow` | Scalar、MTE、Cube、Vector、FixPipe、sync 等指令 / 控制关系。 | Demo 中使用细线或虚线高亮。 |
