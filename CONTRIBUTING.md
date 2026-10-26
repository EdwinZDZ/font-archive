# Contributing · 贡献指南

Thanks for taking the time to improve Font Archive. This project is bilingual: **English first,
Chinese after**, in code comments, UI copy and documentation alike.
感谢你为字体档案馆出力。本项目默认双语：**英文在前、中文在后**，代码注释、界面文案与文档保持一致。

## Before You Start / 开始之前

**EN** — Read [NOTICE.md](NOTICE.md). This repository never accepts font binaries, and it never
accepts a typeface whose license cannot be verified.

**中文** — 请先阅读 [NOTICE.md](NOTICE.md)。本仓库不接受字体文件，也不接受无法核实授权的字体。

## Ways to Contribute / 贡献方式

- **Suggest a typeface** — open an issue with the template below. · 推荐字体：按下方模板提交 Issue。
- **Fix a bug** — layout glitches, incorrect licenses, broken specimens. · 修 bug：版式错位、授权标注错误、字样无法加载。
- **Improve docs** — clarity, translations, screenshots. · 改进文档：表述、翻译、截图。
- **Add a scene preset** — new mockup layouts are welcome. · 增加场景预设：欢迎新增应用场景版式。

## Suggesting a Typeface / 推荐字体

Include all five items, otherwise the issue will be closed:
请务必附上以下五项，缺一将被关闭：

1. Typeface name (English and Chinese, if both exist) · 字体名称（如有中英文，请都给出）
2. Official source URL (foundry or Google Fonts page) · 官方来源链接（字库厂商或 Google Fonts 页面）
3. License (`OFL 1.1`, `Apache 2.0`, …) and a link to the license text · 授权方式及授权原文链接
4. One genre from the list in [docs/FONT-CATALOG.md](docs/FONT-CATALOG.md) · 所属类型（取自字体目录中的 22 类）
5. Two to four use cases · 2–4 个适用场景

## Adding a Typeface / 添加字体

Curated faces live in `src/data/fonts.ts`, grouped by category. One entry looks like this:
精选字体位于 `src/data/fonts.ts`，按类型分组。单个条目如下：

```ts
{
  name: 'Anton',                    // display name / 显示名
  en: 'Anton',                      // Latin name / 拉丁名
  family: 'Anton',                  // CSS font-family, quoted if it contains spaces / 含空格需加引号
  weight: '400',                    // weight used for the specimen / 字样使用的字重
  preview: 'ACTION',                // default specimen string / 默认字样
  cat: '压缩展示',                   // style descriptor / 风格描述
  scenes: ['动作片预告', '打斗场景'], // 2–4 use cases / 2–4 个场景
  license: 'OFL',                   // OFL or Apache only / 仅限 OFL 或 Apache
  desc: '超压缩粗体无衬线……',         // one-line note / 一句话说明
}
```

Rules / 规则：

- One face, one license. Do not mix families with different terms. · 一款字体对应一种授权，不得混用。
- `family` must match the name served by Google Fonts CSS2. · `family` 必须与 Google Fonts CSS2 提供的名称一致。
- Keep six faces per genre. If a genre is full, propose a swap — do not make it seven. · 每类保持 6 款；已满请提议替换，不要变成 7 款。
- Chinese copy follows English, never replaces it. · 中文文案跟在英文之后，不替代英文。

## Development Workflow / 开发流程

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc -b && vite build — must pass
```

- UI copy lives inline in components; keep the `English 中文` order. · 界面文案内联在组件中，保持「英文 中文」顺序。
- Reusable bilingual primitives are in `src/components/Bilingual.tsx`. · 双语排版原语见 `src/components/Bilingual.tsx`。
- Character-set panels are specimens, not coverage claims — do not add a percentage unless it comes
  from a real `cmap` read. · 字符集面板是示例，不是覆盖率结论；除非真的读取了 `cmap`，否则不要加百分比。
- Regenerate data and docs after touching a font folder: · 修改字体目录后请重建数据与文档：

```bash
FONT_DIR=/path/to/fonts npm run catalog
npm run docs:catalog
```

## Commit Messages / 提交信息

Conventional Commits, English subject, optional Chinese body:
采用 Conventional Commits，标题用英文，正文可用中文：

```
feat(library): add coverage bars per script
fix(drawer): keep preview text when switching faces

补充说明（可选）
```

## Pull Request Checklist / PR 检查清单

- [ ] `npm run build` passes / 构建通过
- [ ] New UI text is English-first, Chinese-second / 新增文案英文在前、中文在后
- [ ] Licenses verified and listed in the entry / 授权已核实并写入条目
- [ ] No font binaries, no `dist/`, no `node_modules/` / 未提交字体文件、`dist/`、`node_modules/`
- [ ] Screenshots updated if the layout changed / 版式变化时已更新截图
- [ ] English and Chinese describe the same thing / 中英文描述一致

## Licensing Rules / 授权规则

**EN** — Only submit faces you can prove are redistributable under an open license. Do not submit
fonts extracted from commercial software, streaming apps or video editors. If a font's terms are
unclear, it does not belong in the curated catalog.

**中文** — 只提交能证明可依开放授权再分发的字体。不要提交从商业软件、流媒体应用或剪辑软件中提取的
字体。授权不清晰的字体不应进入精选目录。

## Code of Conduct / 行为准则

Be direct, be decent. Critique the work, not the person. Harassment or license laundering ends the
conversation.
直接、体面。批评作品，不针对个人。骚扰或洗白授权行为会被直接终止讨论。
