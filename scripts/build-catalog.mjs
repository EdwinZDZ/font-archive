/**
 * 由 scan-result.json 生成 src/data/localFonts.ts
 *
 * 授权判定原则：以字体文件自己声明的信息为准（内嵌 license 字段、内部名称、厂商前缀），
 * 不做「大概免费」这类推断。判不出来的标为待核实，不标成可商用。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { extname } from 'node:path'

const rows = JSON.parse(readFileSync('scripts/scan-result.json', 'utf8'))
const gfFamilies = new Set(
  readFileSync('scripts/gf-families.csv', 'utf8')
    .split('\n')
    .map(l => l.split(',')[0].trim())
    .filter(Boolean),
)

/** 付费中文字库：商用需向厂商取得授权 */
const PAID_FOUNDRIES = [
  { re: /字由|hellofont|\bJY[a-z]/i, vendor: '字由 HelloFont', url: 'https://www.hellofont.cn' },
  { re: /仓耳|倉耳|tsanger/i, vendor: '仓耳字库', url: 'https://tsanger.cn' },
  { re: /文悦|wenyue/i, vendor: '文悦字库', url: '' },
  { re: /汉仪|hanyi/i, vendor: '汉仪字库', url: 'https://www.hanyi.com.cn' },
  { re: /方正|foundertype/i, vendor: '方正字库', url: 'https://www.foundertype.com' },
  { re: /造字工房/i, vendor: '造字工房', url: '' },
]

/** 明确免费可商用的字库 */
const FREE_FOUNDRIES = [
  { re: /站酷|zcool/i, vendor: '站酷', note: '站酷发布，免费商用' },
  { re: /思源|source han/i, vendor: '思源', note: 'SIL OFL 1.1，免费商用' },
  { re: /阿里巴巴普惠|alibaba puhui/i, vendor: '阿里巴巴', note: '阿里巴巴发布，免费商用' },
  { re: /得意黑|smiley\s*sans/i, vendor: '得意黑', note: 'SIL OFL 1.1，免费商用' },
  { re: /霞鹜|lxgw/i, vendor: '霞鹜文楷', note: 'SIL OFL 1.1，免费商用' },
  { re: /OPPOSans|HarmonyOS|庞门正道/i, vendor: '官方', note: '官方发布，免费商用' },
]

/** tier: free 可商用 | paid 商用需授权 | banned 禁止商用 | unverified 待核实 */
function classify(f) {
  const L = `${f.license} ${f.licenseUrl}`.toLowerCase()
  const blob = `${f.family} ${f.full} ${f.file}`

  if (/非商用|non-?commercial|not for commercial/i.test(blob))
    return { tier: 'banned', license: '非商用', vendor: '字体自述', note: '字体内部名称标注「非商用」，禁止商业使用' }

  if (/segoe|microsoft supplied font/i.test(blob) || /microsoft supplied/.test(L))
    return { tier: 'banned', license: '微软专有', vendor: '微软', note: '仅授权在微软软件内使用，不可再分发' }

  if (/须授权|需授权/i.test(blob)) {
    const m = PAID_FOUNDRIES.find(v => v.re.test(blob))
    return { tier: 'paid', license: '须授权', vendor: m?.vendor || '字体自述', note: '字体内部名称标注「须授权」，商用前需取得授权', url: m?.url }
  }

  const paid = PAID_FOUNDRIES.find(v => v.re.test(blob))
  if (paid)
    return { tier: 'paid', license: '商用需授权', vendor: paid.vendor, note: `个人可用，商用需向${paid.vendor}取得授权`, url: paid.url }

  const free = FREE_FOUNDRIES.find(v => v.re.test(blob))
  if (free) return { tier: 'free', license: 'OFL', vendor: free.vendor, note: free.note }

  if (/open font license|openfontlicense|scripts\.sil\.org\/ofl/.test(L))
    return { tier: 'free', license: 'OFL 1.1', vendor: 'SIL OFL', note: '免费可商用' }
  if (/apache/.test(L))
    return { tier: 'free', license: 'Apache 2.0', vendor: 'Apache', note: '免费可商用' }
  if (/ubuntu font licence/.test(L))
    return { tier: 'free', license: 'UFL', vendor: 'Ubuntu', note: '免费可商用' }
  if (/\bmit license/.test(L))
    return { tier: 'free', license: 'MIT', vendor: 'MIT', note: '免费可商用' }

  if (gfFamilies.has(f.family))
    return { tier: 'free', license: 'OFL 1.1', vendor: 'Google Fonts', note: 'Google Fonts 收录，免费可商用' }

  return { tier: 'unverified', license: '待核实', vendor: '未声明', note: '字体文件未内嵌授权信息，商用前请自行向来源核实' }
}

/** UTF-16 误解码残留检测 */
const garbled = s =>
  !s || /^未命名/.test(s) || (/[Ā-˿㄀-ㇿ]/.test(s) && !/[一-鿿]/.test(s))

function resolveName(f, style, seq) {
  if (!garbled(f.family)) return f.family
  if (!garbled(f.full)) return f.full
  return `${style} ${String(seq).padStart(3, '0')}`
}

function styleTag(f) {
  const n = `${f.family} ${f.full} ${f.subfamily} ${f.file}`.toLowerCase()
  if (/emoji|symbol/.test(n)) return '表情符号'
  if (/mono|code|courier|consol/.test(n)) return '等宽'
  if (/楷|kai/.test(n)) return '楷体'
  if (/宋|song|明朝|mincho|serif|garamond|bodoni|baskervill|playfair|times/.test(n)) return '衬线'
  if (/script|brush|hand|caveat|dancing|allura|vibes|birthstone|ballet|marker|手写|书法|毛笔/.test(n)) return '手写'
  if (/slab|clarendon/.test(n)) return '粗衬线'
  if (/condensed|narrow|compress|压缩|窄/.test(n)) return '压缩'
  if (/black|heavy|ultra|fat|extrabold|900|超粗|特粗/.test(n)) return '超粗'
  if (/light|thin|hairline/.test(n)) return '细体'
  if (/round|圆/.test(n)) return '圆体'
  if (/display|poster|title|headline|标题|展示/.test(n)) return '展示'
  if (/hei|黑体|gothic/.test(n)) return '黑体'
  return '无衬线'
}

const seen = new Map()
const out = []
let seq = 0

for (const f of rows) {
  const style = styleTag(f)
  const name = resolveName(f, style, ++seq)
  const key = `${name}|${f.subfamily}`
  const prev = seen.get(key)
  if (prev) {
    if (prev.sizeKB <= f.sizeKB) continue
    out.splice(out.indexOf(prev), 1)
  }

  const cls = classify(f)
  const rec = {
    id: '',
    name,
    family: garbled(f.family) ? name : f.family,
    subfamily: /^[A-Za-z ]+$/.test(f.subfamily) ? f.subfamily : 'Regular',
    // 指向 vite 静态映射的源目录，避免把 5.5 GB 复制进 public/
    src: `/jy/${encodeURIComponent(f.dir)}/${encodeURIComponent(f.file)}`,
    sizeKB: f.sizeKB,
    ext: extname(f.file).slice(1).toLowerCase(),
    style,
    tier: cls.tier,
    license: cls.license,
    vendor: cls.vendor,
    note: cls.note,
    ...(cls.url ? { vendorUrl: cls.url } : {}),
    source: f.dir.replace(/^\d+-/, ''),
  }
  seen.set(key, rec)
  out.push(rec)
}

out.sort((a, b) => a.name.localeCompare(b.name, 'zh'))
out.forEach((r, i) => (r.id = `f${i}`))

const ts = `// 由 scripts/build-catalog.mjs 生成，勿手改。重建：node scripts/build-catalog.mjs
export type Tier = 'free' | 'paid' | 'banned' | 'unverified'

export interface LocalFont {
  id: string
  name: string
  family: string
  subfamily: string
  src: string
  sizeKB: number
  ext: string
  style: string
  tier: Tier
  license: string
  vendor: string
  note: string
  vendorUrl?: string
  source: string
}

/** 超过此体积不预加载，改为点击详情时按需加载 */
export const LAZY_THRESHOLD_KB = 20480

export const TIER_LABEL: Record<Tier, string> = {
  free: '免费可商用',
  paid: '商用需授权',
  banned: '禁止商用',
  unverified: '授权待核实',
}

export const localFonts: LocalFont[] = ${JSON.stringify(out)}

export const localStyles = [...new Set(localFonts.map(f => f.style))].sort()
`
writeFileSync('src/data/localFonts.ts', ts)

const tally = k => out.reduce((m, o) => ((m[o[k]] = (m[o[k]] || 0) + 1), m), {})
console.log(`catalog: ${out.length} fonts (from ${rows.length} files)`)
console.log('tier:', tally('tier'))
console.log('vendor:', tally('vendor'))
console.log(`lazy (>8MB): ${out.filter(o => o.sizeKB > 8192).length}`)
console.log(`renamed by style: ${out.filter(o => /^\D+ \d{3}$/.test(o.name)).length}`)
