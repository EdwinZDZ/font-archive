import { categories } from './fonts'
import { localFonts } from './localFonts'

export interface Face {
  id: string
  name: string
  family: string
  weight: string
  subfamily: string
  style: string
  vendor: string
  genres: string[]
  remote: boolean
  src?: string
  sizeKB: number
  ext: string
}

/** 策展字体的 cat 标签映射到通用风格分组 */
const STYLE_MAP: [RegExp, string][] = [
  // 「无衬线」必须先于「衬线」，否则会被后者的规则误吞
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

const toStyle = (cat: string) => STYLE_MAP.find(([re]) => re.test(cat))?.[1] ?? '无衬线'

const curated: Face[] = categories.flatMap(c =>
  c.fonts.map(f => ({
    id: `gf-${c.id}-${f.en}`,
    name: f.name,
    family: f.family.replace(/"/g, ''),
    weight: f.weight,
    style: toStyle(f.cat),
    genres: [c.id],
    remote: true,
    sizeKB: 0,
    ext: 'ttf',
    subfamily: 'Regular',
    vendor: 'Google Fonts',
  })),
)

const curatedNames = new Set(curated.map(f => f.name))

const local: Face[] = localFonts
  .filter(f => !curatedNames.has(f.name))
  .map(f => ({
    id: f.id,
    name: f.name,
    family: f.family,
    weight: '400',
    subfamily: f.subfamily,
    style: f.style,
    genres: [] as string[],
    vendor: f.vendor,
    remote: false,
    src: f.src,
    sizeKB: f.sizeKB,
    ext: f.ext,
  }))

export const faces: Face[] = [...curated, ...local]

export const genreOptions = categories.map(c => ({ id: c.id, name: c.name, nameEn: c.nameEn }))

export const styleOptions = [...new Set(faces.map(f => f.style))].sort((a, b) => a.localeCompare(b, 'zh'))

export const TOTAL = faces.length
