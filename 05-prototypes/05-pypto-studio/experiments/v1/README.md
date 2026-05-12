# PyPTO Studio · v1

Compile / Runtime 双模式统一工作台原型。

## 启动

任意静态 server 都行；推荐 python：

```bash
cd 05-prototypes/05-pypto-studio/experiments/v1
python3 -m http.server 8766
# 浏览器打开 http://127.0.0.1:8766/
```

> 因为 ES 旧式 `<script src>` 分文件加载，不能直接用 `file://` 打开（部分浏览器会拒绝跨文件资源）。

建议宽度 **1280px+**。

## 演示路径

1. 进入页面 → 自动弹 **Symptom Fingerprint** 模态，3 个候选 Playbook 按匹配度排序。
2. 点 **开始走** → 进入 Runtime 模式，Step 1。
3. 每一步在中间区呈现"看到 X / 怀疑 Y / 试 Z"三段卡片；右侧 msprof 泳道图自动展开相应组 + 高亮蒙版叠加。
4. Step 3 → 改 `mix_mode=parallel` 重跑 → Step 4 假设证伪。
5. Step 5 触发 **跨模式跳转**，进入 Compile · Pass Tracer 看 AxisFusion。
6. Step 6 在 Compile 模式里应用 `axis_fusion=on + stitch_mode=concat`。
7. Step 7 验收 → 弹 **Contribute Back** 沉淀回路。

键盘 `←` / `→` 可手动切换步骤；`?` 打开演示路径帮助。

## 目录

```
v1/
├── index.html
├── styles/
│   ├── tokens.css      colors / typography (复用 V4)
│   ├── layout.css      topbar / 4-zone grid / bottombar / modals
│   ├── runtime.css     left outline + center step viewer
│   ├── swimlane.css    右侧泳道图
│   └── compile.css     Compile 模式 stub
└── scripts/
    ├── data/           kernel · swimlane · playbook · fingerprint (all L3)
    ├── render/         topbar · swimlane · playbook · knobs · modals · compile-stub
    └── main.js
```

## 数据等级

`L3` — 剧本驱动的构造数据，仅供 UX 方向校准。详见 `../../notes/sample-data.md`。
