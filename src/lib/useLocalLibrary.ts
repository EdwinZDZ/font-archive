import { useEffect, useState } from 'react'
import { localFonts } from '@/data/localFonts'

export type LocalLibraryStatus = 'checking' | 'online' | 'offline'

/**
 * 探测本地字库是否接入：命中任意一款本地字体文件即视为在线。
 * 开源仓库默认不含字体文件，此时自动回落到 132 款开源字体。
 */
export function useLocalLibrary(): LocalLibraryStatus {
  const [status, setStatus] = useState<LocalLibraryStatus>('checking')

  useEffect(() => {
    const probes = localFonts.slice(0, 3).map(f => f.src).filter(Boolean)
    if (!probes.length) {
      setStatus('offline')
      return
    }

    let alive = true
    ;(async () => {
      for (const src of probes) {
        try {
          const res = await fetch(src, { method: 'HEAD', cache: 'no-store' })
          const type = res.headers.get('content-type') ?? ''
          if (res.ok && type.includes('font')) {
            if (alive) setStatus('online')
            return
          }
        } catch {
          // 继续探测下一款
        }
      }
      if (alive) setStatus('offline')
    })()

    return () => {
      alive = false
    }
  }, [])

  return status
}
