/**
 * 扫描 剪映字体提取/ 下全部 ttf/otf，读出字体内部名称与授权字段。
 * 用 Node 内置能力解析 name table，不引依赖。
 */
import { readdirSync, statSync, openSync, readSync, closeSync, writeFileSync, existsSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

/**
 * 扫描字体目录，输出 scripts/scan-result.json。
 * 用法：FONT_DIR=/path/to/fonts node scripts/scan-fonts.mjs
 * 未指定时依次尝试 ./fonts、./剪映字体提取（作者本地目录）。
 */
const ROOT = process.env.FONT_DIR || (existsSync('fonts') ? 'fonts' : '剪映字体提取')

if (!existsSync(ROOT)) {
  console.error(`font directory not found: ${ROOT}`)
  console.error('Set FONT_DIR to the folder that contains your .ttf/.otf files.')
  process.exit(1)
}

// name table 里我们关心的 nameID
const WANT = { 1: 'family', 2: 'subfamily', 4: 'full', 6: 'ps', 13: 'license', 14: 'licenseUrl' }

/** 端序误判会产生大量乱码字符（拉丁扩展/希腊/西里尔/Hangul 音节等），合法文本得分高 */
function score(s) {
  let good = 0
  let bad = 0
  for (const ch of s) {
    const c = ch.codePointAt(0)
    if (c === 0) bad += 2
    else if ((c >= 0x20 && c <= 0x7e) || (c >= 0x3400 && c <= 0x9fff) || c >= 0xac00 && c <= 0xd7af) good++
    else bad++
  }
  return good - bad
}

function readFontNames(path) {
  const fd = openSync(path, 'r')
  try {
    const size = statSync(path).size
    const head = Buffer.alloc(Math.min(size, 12))
    readSync(fd, head, 0, head.length, 0)

    let base = 0
    const tag = head.readUInt32BE(0)
    if (tag === 0x74746366) {
      // 'ttcf' — 取第一个字体
      const ttc = Buffer.alloc(16)
      readSync(fd, ttc, 0, 16, 0)
      base = ttc.readUInt32BE(12)
      readSync(fd, head, 0, 12, base)
    }

    const numTables = head.readUInt16BE(base === 0 ? 4 : 4)
    const dir = Buffer.alloc(numTables * 16)
    readSync(fd, dir, 0, dir.length, base + 12)

    let nameOff = 0
    let nameLen = 0
    for (let i = 0; i < numTables; i++) {
      const o = i * 16
      if (dir.toString('latin1', o, o + 4) === 'name') {
        nameOff = dir.readUInt32BE(o + 8)
        nameLen = dir.readUInt32BE(o + 12)
        break
      }
    }
    if (!nameOff) return null

    const tbl = Buffer.alloc(Math.min(nameLen, size - nameOff))
    readSync(fd, tbl, 0, tbl.length, nameOff)

    const count = tbl.readUInt16BE(2)
    const strOff = tbl.readUInt16BE(4)
    const out = {}

    for (let i = 0; i < count; i++) {
      const r = 6 + i * 12
      if (r + 12 > tbl.length) break
      const platform = tbl.readUInt16BE(r)
      const encoding = tbl.readUInt16BE(r + 2)
      const nameId = tbl.readUInt16BE(r + 6)
      const len = tbl.readUInt16BE(r + 8)
      const off = tbl.readUInt16BE(r + 10)
      const key = WANT[nameId]
      if (!key) continue
      const s = strOff + off
      if (s + len > tbl.length) continue
      const raw = tbl.subarray(s, s + len)
      // platform 3 (Windows) 与 platform 0 (Unicode) 用 UTF-16，
      // 但端序不统一：BE 与 LE 都解，选更像文本的那个
      const utf16 = platform === 3 || platform === 0
      let val
      if (utf16) {
        const be = raw.swap16().toString('utf16le')
        const le = raw.toString('utf16le')
        val = score(be) >= score(le) ? be : le
      } else {
        val = raw.toString('latin1')
      }
      val = val.replace(/\0/g, '').trim()
      if (!val) continue
      // 优先保留中文名（platform 3 encoding 1 且含 CJK）
      const isCJK = /[一-鿿]/.test(val)
      if (!out[key] || (isCJK && !/[一-鿿]/.test(out[key]))) out[key] = val
    }
    return out
  } catch {
    return null
  } finally {
    closeSync(fd)
  }
}

const rows = []
for (const dir of readdirSync(ROOT)) {
  const dirPath = join(ROOT, dir)
  if (!statSync(dirPath).isDirectory()) continue
  for (const f of readdirSync(dirPath)) {
    const ext = extname(f).toLowerCase()
    if (ext !== '.ttf' && ext !== '.otf') continue
    const p = join(dirPath, f)
    const names = readFontNames(p) || {}
    rows.push({
      file: f,
      dir,
      sizeKB: Math.round(statSync(p).size / 1024),
      family: names.family || '',
      subfamily: names.subfamily || '',
      full: names.full || '',
      license: (names.license || '').slice(0, 300),
      licenseUrl: names.licenseUrl || '',
      stem: basename(f, ext),
    })
  }
}

writeFileSync('scripts/scan-result.json', JSON.stringify(rows, null, 1))
console.log(`scanned ${rows.length} fonts`)
console.log(`with family name: ${rows.filter(r => r.family).length}`)
console.log(`with license text: ${rows.filter(r => r.license).length}`)
