# Curated External Links | 外链验证日志

本文件是已处理外部链接的验证日志，不是平台索引镜像。

登记对象包括微信、知乎、博客、社区文章、专家解读、官方账号文章等。这里只保存短摘录、定位信息、摘要与验证结论，不保存大段原文。

## Platform Access Rules

- 知乎：WebSearch + `site:zhihu.com`，或站内搜索。
- 微信公众号：无官方公开搜索；走搜狗微信搜索 `https://weixin.sogou.com/`，或使用用户提供的具体文章 URL。
- CANN 开发者社区：WebSearch + `site:cann.csdn.net`，或使用用户提供的具体文章 URL。
- GitCode：使用用户提供的具体仓库 / 目录 URL；只做单点读取，不把整仓当 curated 镜像。
- 博客 / Medium：站内搜、RSS、WebSearch + `site:` 限定。
- 未列平台：先问用户期望的检索路径，再固化进本节。

## Topics 推荐枚举

推荐值：

- `pypto`
- `cann`
- `ascend-c`
- `runtime-design`
- `sample-data`
- `profiling`
- `visualization`
- `a5-950`
- `ascend-950`
- `cann-next`

允许扩展：未匹配时可新增 topic，但需要同步登记在本节。

## 条目模板

新增条目时 append 到文件末尾，使用下面的 markdown section 结构：

### `<Title>`

- URL:
- Platform: `zhihu` / `wechat` / `cann-developer-community` / `gitcode` / `medium` / `blog` / `other`
- Author / Account:
- Source authority: `official-account` / `official-community-material` / `expert-personal` / `community` / `personal-blog` / `unknown`
- Topics:
- Why useful:
- Cross-checked against primary: `yes` / `no` / `pending`
- Added date: `YYYY-MM-DD`
- Last verified date: `YYYY-MM-DD`
- Short excerpts / anchors:

Verified claims:

- `<claim 摘要>` -> primary: `<source-id>:<path-or-url>` (verified `YYYY-MM-DD`)

Conflicts:

- `<claim 摘要>` -> primary 表述: `<...>` (flagged `YYYY-MM-DD`)

Empirical notes:

- `<经验/窍门摘要>` (`unverifiable-empirical`)

## 已登记条目

### CANN NEXT系列干货：面向950的架构详解

- URL: `https://cann.csdn.net/69d8a96e54b52172bc684f2e.html`
- Platform: `cann-developer-community`
- Author / Account: `昇腾CANN`
- Source authority: `official-community-material`
- Topics: `cann`, `a5-950`, `ascend-950`, `cann-next`
- Why useful: A5 / Ascend 950 阶段性官方社区材料入口，适合发现 950PR / 950DT、CV 融合、NDDMA、BufferID、UnifiedBus、URMA、CCU 等公开能力线索。
- Cross-checked against primary: `pending`
- Added date: `2026-04-28`
- Last verified date: `2026-04-28`
- Short excerpts / anchors: 文章发布时间为 `2026-04-10`；重点锚点包括 `Ascend 950PR`、`Ascend 950DT`、`AICORE`、`NDDMA`、`BufferID`、`灵衢互联`、`URMA`。

Verified claims:

- 暂无；后续需要按 claim 回 `cann-docs-community-edition`、`pypto` 或其他 primary source 校验。

Conflicts:

- 暂无。

Empirical notes:

- 暂无。

### CANN community meetup slides 950

- URL: `https://gitcode.com/cann/community/tree/master/events/meetup/slides/950`
- Platform: `gitcode`
- Author / Account: `cann/community`
- Source authority: `official-community-material`
- Topics: `cann`, `a5-950`, `ascend-950`, `cann-next`
- Why useful: A5 / Ascend 950 meetup slides 目录，适合作为官方社区分享材料的附件入口和后续增量更新线索。
- Cross-checked against primary: `pending`
- Added date: `2026-04-28`
- Last verified date: `2026-04-28`
- Short excerpts / anchors: 目录锚点为 `events/meetup/slides/950`；只按用户问题单点读取相关 slide 文件，不把 `cann/community` 整仓当作当前检索对象。

Verified claims:

- 暂无；后续需要按 claim 回 `cann-docs-community-edition`、`pypto` 或其他 primary source 校验。

Conflicts:

- 暂无。

Empirical notes:

- 暂无。

## 维护规则

- 新条目 append 到本文件末尾。
- 单文件达到约 50 条或约 50KB 时，按 platform 或 topic 分拆。
- 老条目（`Last verified date` 超 12 个月）移到 archive 子目录。
- 写入归属：`09-references/` 对等共写；冲突避免规则见 `10-docs/01-conventions/dual-agent-collaboration.md`。
