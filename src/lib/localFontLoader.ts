import { useEffect, useState } from 'react'
import { LAZY_THRESHOLD_KB, type LocalFont } from '@/data/localFonts'

/** 注入过的 font-family，避免重复注册 */
const injected = new Set<string>()

export const cssFamily = (f: { id: string }) => `jy-${f.id}`

export const subfamilyWeight = (s: string) => {
  const n = s.toLowerCase()
  if (/black|heavy/.test(n)) return 900
  if (/extrabold|ultrabold/.test(n)) return 800
  if (/bold/.test(n)) return 700
  if (/semibold|demibold/.test(n)) return 600
  if (/medium/.test(n)) return 500
  if (/light/.test(n)) return 300
  return 400
}

export function injectFace(f: LocalFont) {
  const fam = cssFamily(f)
  if (injected.has(fam)) return fam
  injected.add(fam)
  const style = document.createElement('style')
  style.dataset.font = fam
  const format = f.ext === 'otf' ? 'opentype' : 'truetype'
  style.textContent = `@font-face{font-family:"${fam}";src:url("${f.src}") format("${format}");font-weight:${subfamilyWeight(f.subfamily)};font-display:swap;}`
  document.head.appendChild(style)
  return fam
}

export const isHeavy = (f: { sizeKB: number }) => f.sizeKB > LAZY_THRESHOLD_KB

type State = 'idle' | 'loading' | 'ready' | 'error'

/**
 * 轻量字体自动加载；超过阈值的重字体只在 eager=true 时加载，
 * 否则停在 idle，由用户点击触发。
 */
export function useLocalFont(f: LocalFont, eager = false) {
  const [state, setState] = useState<State>('idle')

  useEffect(() => {
    if (isHeavy(f) && !eager) {
      setState('idle')
      return
    }
    const fam = injectFace(f)
    const spec = `${subfamilyWeight(f.subfamily)} 16px "${fam}"`
    if (document.fonts.check(spec)) {
      setState('ready')
      return
    }
    let alive = true
    setState('loading')
    document.fonts
      .load(spec)
      .then(faces => alive && setState(faces.length ? 'ready' : 'error'))
      .catch(() => alive && setState('error'))
    return () => {
      alive = false
    }
  }, [f, eager])

  return { state, family: cssFamily(f) }
}
