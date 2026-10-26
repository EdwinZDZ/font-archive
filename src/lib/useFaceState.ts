import { useEffect, useMemo, useState } from 'react'
import type { Face } from '@/data/catalog'
import { loadFonts } from '@/lib/fontLoader'
import { useLocalFont } from '@/lib/localFontLoader'
import type { LocalFont } from '@/data/localFonts'

export type LoadState = 'idle' | 'loading' | 'ready' | 'error'

/** 统一字体加载状态：策展字体走线上 CSS，本地字体走 /jy/ 直链 */
export function useFaceState(face: Face, eager: boolean) {
  const local: LocalFont = useMemo(
    () => ({
      id: face.id,
      name: face.name,
      family: face.family,
      subfamily: face.subfamily,
      src: face.src ?? '',
      sizeKB: face.sizeKB,
      ext: face.ext,
      style: face.style,
      tier: 'unverified',
      license: '',
      vendor: '',
      note: '',
      source: '',
    }),
    [face],
  )
  const { state: localState, family: localFamily } = useLocalFont(local, eager)

  const [remoteState, setRemoteState] = useState<LoadState>('idle')
  useEffect(() => {
    if (!face.remote) return
    loadFonts([{ family: face.family, weight: face.weight }])
    const spec = `${face.weight} 16px "${face.family}"`
    if (document.fonts.check(spec)) {
      setRemoteState('ready')
      return
    }
    let alive = true
    setRemoteState('loading')
    document.fonts
      .load(spec)
      .then(fs => alive && setRemoteState(fs.length ? 'ready' : 'error'))
      .catch(() => alive && setRemoteState('error'))
    return () => {
      alive = false
    }
  }, [face])

  return face.remote
    ? { state: remoteState, family: face.family }
    : { state: localState, family: localFamily }
}
