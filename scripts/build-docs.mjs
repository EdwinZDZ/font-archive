/**
 * 生成 docs/FONT-CATALOG.md —— 22 种类型、132 款开源字体的双语目录。
 * 运行：npm run docs:catalog
 */
import { mkdirSync, writeFileSync } from 'node:fs'

const { categories } = await import('../src/data/fonts.ts')

/** 类型英文导语（数据里只有中文 desc） */
const GENRE_EN = {
  action: 'Compressed blacks and ultra-heavy weights built for impact.',
  romance: 'High-contrast serifs and flowing scripts with room to breathe.',
  scifi: 'Geometric sans and terminal monospace for futures on screen.',
  horror: 'Gothic, dripping and distressed faces that unsettle before the cut.',
  comedy: 'Rounded, bouncy display types that land the joke.',
  mystery: 'Typewriter monospace and cold serifs for evidence and deduction.',
  wuxia: 'Brush-written Kai and running scripts with the bones of ink.',
  historical: 'Courtly serifs, seal scripts and period ornament.',
  documentary: 'Quiet grotesques and editorial serifs that stay out of the way.',
  animation: 'Playful rounded faces with cartoon energy.',
  war: 'Stencil, industrial and stamped letterforms under pressure.',
  crime: 'Forensic monospace and procedural sans for case files.',
  fantasy: 'Blackletter, runic and ornamental faces from other worlds.',
  youth: 'Handwritten markers and light sans for campus stories.',
  urban: 'Sharp geometric sans for glass towers and late-night offices.',
  republic: 'Letterpress serifs and vertical signage from the 1920s–40s.',
  disaster: 'Condensed, urgent type for countdowns and emergency bulletins.',
  musical: 'Expressive scripts and stage-poster display.',
  western: 'Slab serifs, woodtype and dust.',
  noir: 'High-contrast serifs and shadowed sans in black and white.',
  superhero: 'Chunky comic display with speed lines built in.',
  experimental: 'Deconstructed, variable and rule-breaking faces.',
}

/** 与 src/data/catalog.ts 的分组保持一致（「无衬线」必须先于「衬线」） */
const STYLE_MAP = [
  [/无衬线/, '无衬线'],
  [/衬线|宋|明朝|罗马/, '衬线'],
  [/手写|花体|书法|毛笔|行草|楷|马克笔|涂鸦/, '手写'],
  [/哥特/, '黑体'],
  [/圆体/, '圆体'],
  [/等宽|打字机|终端|像素|代码/, '等宽'],
  [/压缩/, '压缩'],
  [/超粗|粗黑/, '超粗'],
  [/黑体/, '黑体'],
  [/展示|未来|科技|装饰|电子|几何|复古/, '展示'],
  [/现代|人文/, '无衬线'],
]

const STYLE_EN = {
  黑体: 'SANS',
  无衬线: 'GROTESQUE',
  衬线: 'SERIF',
  粗衬线: 'SLAB',
  手写: 'SCRIPT',
  楷体: 'KAI',
  圆体: 'ROUND',
  压缩: 'CONDENSED',
  超粗: 'BLACK',
  细体: 'LIGHT',
  等宽: 'MONO',
  展示: 'DISPLAY',
  表情符号: 'EMOJI',
}

const bucket = cat => STYLE_MAP.find(([re]) => re.test(cat))?.[1] ?? '无衬线'
const styleCell = cat => `${STYLE_EN[bucket(cat)] ?? 'TYPE'} ${cat}`

const total = categories.reduce((n, c) => n + c.fonts.length, 0)
const pad = (n, len = 2) => String(n).padStart(len, '0')

const lines = []
lines.push('# Font Catalog / 字体目录')
lines.push('')
lines.push(
  `> ${total} open-source typefaces across ${categories.length} cinematic genres. Generated from \`src/data/fonts.ts\`.`,
)
lines.push(
  `> ${categories.length} 种影视类型，${total} 款开源字体。本文件由 \`src/data/fonts.ts\` 自动生成。`,
)
lines.push('')
lines.push(
  'Every face in this catalog is distributed by Google Fonts and keeps its original license — 130 under SIL OFL 1.1, 2 under Apache 2.0. Font binaries are not included in this repository.',
)
lines.push(
  '本目录中的字体均由 Google Fonts 分发并保留原授权：130 款为 SIL OFL 1.1，2 款为 Apache 2.0。仓库不包含字体文件。',
)
lines.push('')
lines.push('## Summary / 总览')
lines.push('')
lines.push('| Genre / 类型 | Faces / 数量 | Representative / 代表字体 |')
lines.push('| --- | ---: | --- |')
for (const c of categories) {
  lines.push(`| ${c.nameEn} ${c.name} | ${c.fonts.length} | ${c.fonts[0].en} |`)
}
lines.push(`| **Total 合计** | **${total}** | — |`)
lines.push('')
lines.push('---')
lines.push('')

categories.forEach((c, i) => {
  lines.push(`## ${pad(i + 1)} · ${c.nameEn} / ${c.name}`)
  lines.push('')
  lines.push(GENRE_EN[c.id] ?? '')
  lines.push(c.desc)
  lines.push('')
  lines.push('| # | Typeface / 字体 | Style / 风格 | License / 授权 | Best For / 适用场景 |')
  lines.push('| ---: | --- | --- | --- | --- |')
  c.fonts.forEach((f, j) => {
    const name = f.name === f.en ? f.en : `${f.en} ${f.name}`
    lines.push(
      `| ${pad(j + 1)} | ${name} | ${styleCell(f.cat)} | ${f.license} | ${f.scenes.join(' · ')} |`,
    )
  })
  lines.push('')
})

lines.push('---')
lines.push('')
lines.push('Font names are trademarks of their respective owners. See [NOTICE.md](../NOTICE.md) for details.')
lines.push('字体名称归各自权利人所有，详见 [NOTICE.md](../NOTICE.md)。')
lines.push('')

mkdirSync('docs', { recursive: true })
writeFileSync('docs/FONT-CATALOG.md', lines.join('\n'))
console.log(`docs/FONT-CATALOG.md: ${categories.length} genres, ${total} faces`)
