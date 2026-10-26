import { FONT_CSS_BASE } from '@/data/fonts'

interface FontRef {
  family: string
  weight: string
}

const loaded = new Set<string>()

const familyParam = (f: FontRef) =>
  `family=${f.family.replace(/"/g, '').replace(/\s+/g, '+')}:wght@${f.weight}`

export function loadFonts(fonts: FontRef[]) {
  const key = fonts.map(f => `${f.family}:${f.weight}`).join('|')
  if (loaded.has(key)) return
  loaded.add(key)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `${FONT_CSS_BASE}?${fonts.map(familyParam).join('&')}&display=swap`
  document.head.appendChild(link)
}
