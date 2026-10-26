# Notice / 声明

This repository is released under the MIT License **for its source code only**.
本仓库的 MIT 许可证**仅覆盖源代码**。

Everything below is third-party material with its own terms.
以下内容均为第三方素材，遵循各自的授权条款。

---

## 1. Fonts / 字体

### 1.1 Open-source faces (132) / 开源字体（132 款）

The curated catalog references typefaces distributed by [Google Fonts](https://fonts.google.com).
Each face keeps its original license — 130 are licensed under the SIL Open Font License 1.1,
2 under the Apache License 2.0. Font files are **not** committed to this repository; they are
loaded from Google Fonts (or its mirror) at runtime.
精选目录引用 [Google Fonts](https://fonts.google.com) 分发的字体，各自保留原授权：130 款为
SIL Open Font License 1.1，2 款为 Apache License 2.0。字体文件**不**包含在本仓库中，运行时从
Google Fonts（或其镜像）加载。

If you redistribute a font file, follow its license — keep the copyright notice, and do not sell
the font on its own.
如需再分发字体文件，请遵守其授权：保留版权声明，且不得单独售卖字体。

### 1.2 Local library index (892 entries) / 本地字库索引（892 条）

`src/data/localFonts.ts` is a generated **metadata index** (name, style, file size, declared license
fields) of the author's private font folder. **No font binaries are distributed.** Rights to those
typefaces remain with their foundries; the MIT License does not apply to them.
`src/data/localFonts.ts` 是作者本地字体目录的**元数据索引**（名称、风格、体积、字体内嵌授权字段），
**不包含任何字体文件**。这些字体的权利归各字库厂商所有，不适用本仓库的 MIT 许可证。

Commercial use requires a license from the respective foundry. Entries whose embedded license could
not be verified are marked `unverified` in the data and are never described as commercially usable.
商用需向对应厂商取得授权。无法从字体文件确认授权的条目在数据中标记为 `unverified`，项目不会将其
描述为「可商用」。

### 1.3 Trademarks / 商标

Typeface names are trademarks or registered trademarks of their respective owners.
字体名称归各自权利人所有，可能为商标或注册商标。

---

## 2. Photography / 摄影素材

Images in `public/imgs` come from the VALMAX portfolio template
(`qclay.design/lovable/valmax`) and are included **as design placeholders only**. They are not
covered by the MIT License. Replace them with properly licensed imagery before any commercial
deployment.
`public/imgs` 中的图片来自 VALMAX 作品集模板（`qclay.design/lovable/valmax`），**仅作版式占位**，
不在 MIT 许可范围内。任何商业使用前请替换为已获授权的图片。

Decorative background assets are loaded from the same template at runtime and are likewise not
covered by the MIT License.
装饰性背景素材在运行时从同一模板加载，同样不在 MIT 许可范围内。

---

## 3. Dependencies / 依赖

All npm dependencies keep their own licenses (React, Vite, Tailwind CSS, Motion, Lucide — mostly
MIT). See `package-lock.json` and each package's repository for details.
所有 npm 依赖保留各自授权（React、Vite、Tailwind CSS、Motion、Lucide 等，多为 MIT）。
详见 `package-lock.json` 及各依赖仓库。
