# GitHub Pages 短链接入口

`12-pages/` 用于存放面向 GitHub Pages 的稳定短链接入口。

发布 workflow 会把 `12-pages/` 的内容复制到 Pages 站点根目录，所以线上 URL 不包含 `12-pages` 这一层。

每个入口默认使用一个主题目录和 `index.html`：

```text
12-pages/<slug>/index.html
```

入口页只做轻量跳转，不承载原型源码。真实原型、说明、prompt 和验证记录仍按内容路由规则保留在 `05-prototypes/`、`04-uxdesign/` 等对应目录中。

线上 URL 约定为：

```text
https://wangnaiyu.github.io/PyPTOUX/<slug>/
```

## 当前入口

- `mix-sync-swimlane/` -> `05-prototypes/02-swimlane-profiler/experiments/html/mix-sync-swimlane.html`
