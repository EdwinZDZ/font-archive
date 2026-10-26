import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  opacity: number
  speed: number
  offset: number
  isRing?: boolean
  ringOffset?: number
  driftX: number
  driftY: number
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)

function pickRadius(light: [number, number], mid: [number, number], heavy: [number, number]) {
  const roll = Math.random()
  if (roll < 0.65) return rand(light[0], light[1])
  if (roll < 0.92) return rand(mid[0], mid[1])
  return rand(heavy[0], heavy[1])
}

interface StarFieldProps {
  count?: number
  ring?: boolean
  ringCount?: number
  ringRadiusFactor?: number
  ringBandWidth?: number
  className?: string
}

export function StarField({
  count = 600,
  ring = false,
  ringCount = 240,
  ringRadiusFactor = 0.36,
  ringBandWidth = 52,
  className = 'absolute inset-0 pointer-events-none',
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    const scale = isMobile ? 0.3 : 1
    let stars: Star[] = []
    let raf = 0
    let running = true

    const build = (w: number, h: number) => {
      stars = []
      const n = Math.round(count * scale)
      for (let i = 0; i < n; i++) {
        stars.push({
          x: rand(0, w),
          y: rand(0, h),
          r: pickRadius([0.25, 0.5], [0.5, 0.8], [0.8, 1.3]),
          opacity: rand(0.2, 0.95),
          speed: rand(0.4, 1.6),
          offset: rand(0, Math.PI * 2),
          driftX: rand(-0.08, 0.08),
          driftY: rand(-0.08, 0.08),
        })
      }
      if (ring) {
        const cx = w / 2
        const cy = h / 2
        const ringR = Math.min(w, h) * ringRadiusFactor
        const half = ringBandWidth / 2
        const nRing = Math.round(ringCount * scale)
        for (let i = 0; i < nRing * 2; i++) {
          const angle = rand(0, Math.PI * 2)
          // Box-Muller gaussian
          const u1 = Math.max(Math.random(), 1e-6)
          const u2 = Math.random()
          const gauss = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
          const offset = gauss * half * 0.65
          stars.push({
            x: cx + (ringR + offset) * Math.cos(angle),
            y: cy + (ringR + offset) * Math.sin(angle),
            r: pickRadius([0.15, 0.3], [0.3, 0.5], [0.5, 0.7]),
            opacity: rand(0.25, 0.8),
            speed: rand(0.3, 1.3),
            offset: rand(0, Math.PI * 2),
            isRing: true,
            ringOffset: offset,
            driftX: rand(-0.06, 0.06),
            driftY: rand(-0.06, 0.06),
          })
        }
      }
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const { width, height } = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build(width, height)
    }

    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)
    resize()

    const draw = (t: number) => {
      if (!running) return
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)
      const time = t / 1000

      if (ring) {
        const cx = width / 2
        const cy = height / 2
        const ringR = Math.min(width, height) * ringRadiusFactor
        const glow = ctx.createRadialGradient(cx, cy, ringR - ringBandWidth * 4, cx, cy, ringR + ringBandWidth * 4)
        glow.addColorStop(0, 'rgba(255,255,255,0.022)')
        glow.addColorStop(0.42, 'rgba(255,255,255,0.022)')
        glow.addColorStop(0.5, 'rgba(255,255,255,0.038)')
        glow.addColorStop(0.58, 'rgba(255,255,255,0.022)')
        glow.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, width, height)
      }

      for (const s of stars) {
        const dx = s.driftX * time
        const dy = s.driftY * time
        // 括号修正：0.55 + 0.45·(sin·0.5+0.5) ∈ [0.55, 1.0]，修复前少括号导致区间 [0.825, 1.275] 被截断在 1.0 而静止
        const twinkle = 0.55 + 0.45 * (Math.sin(time * s.speed + s.offset) * 0.5 + 0.5)
        let alpha = s.opacity * twinkle
        if (s.isRing) {
          alpha *= Math.max(0.15, 1 - Math.abs(s.ringOffset ?? 0) / (ringBandWidth * 0.65))
        }
        ctx.globalAlpha = alpha
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(s.x + dx, s.y + dy, s.r, 0, Math.PI * 2)
        ctx.fill()
        const glowThresh = s.isRing ? 1.0 : 1.1
        const glowMult = s.isRing ? 5 : 4
        if (s.r > glowThresh) {
          const gr = s.r * glowMult
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, gr)
          g.addColorStop(0, `rgba(255,255,255,${(alpha * (s.isRing ? 0.4 : 0.3)).toFixed(3)})`)
          g.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(s.x, s.y, gr, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1

      if (!reduced) raf = requestAnimationFrame(draw)
    }
    if (!reduced) raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [count, ring, ringCount, ringRadiusFactor, ringBandWidth])

  return <canvas ref={canvasRef} className={className} aria-hidden style={{ zIndex: 0 }} />
}
