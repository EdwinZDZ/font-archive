/** 风格中文名 → 英文标签，保证双语顺序固定为「英文 中文」 */
export const STYLE_EN: Record<string, string> = {
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

export const styleEn = (style: string) => STYLE_EN[style] ?? 'TYPE'
export const styleLabel = (style: string) => `${styleEn(style)} ${style}`
